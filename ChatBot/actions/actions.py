# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
import datetime
import calendar
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import json
import time

def readMenu():
    return json.load(open('data/menu.json'))["items"]

def reaadOpeningHours():
    return json.load(open('data/opening_hours.json'))

class IsRestaurantOpen(Action):

    def name(self) -> Text:
        return "is_restaurant_open"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:


        day = next(tracker.get_latest_entity_values("days"), None)
        hour = next(tracker.get_latest_entity_values("hours"), None)

        if day == "Now":
            day = datetime.datetime.today()
            day = calendar.day_name[day.weekday()]

            hour = datetime.datetime.now().hour

        day = day[0].upper() + day[1:]

        data = reaadOpeningHours()

        openHour = data["items"][day]["open"]
        closeHour = data["items"][day]["close"]

        if closeHour > int(hour) > openHour:
            result = "yes, we are open"
        else:
            result = "no, we are closed"

        dispatcher.utter_message(text=result)

        return []

class ListMenu(Action):

    def name(self) -> Text:
        return "list_menu"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        menu = readMenu()
        result="Menu: \n"

        for item in menu:
            result += item["name"]+" "+str(item["price"])+" "+str(item["preparation_time"])+"\n"


        dispatcher.utter_message(text=result)

        return []


class Order(Action):

    def name(self) -> Text:
        return "order"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        meal = next(tracker.get_latest_entity_values("meals"), None)
        additional_request = next(tracker.get_latest_entity_values("additional_request"), None)

        if  meal is None:
            return []
        meal = meal[0].upper() + meal[1:]
        menu = readMenu()

        temp = None
        for i in menu:
            if i["name"] == meal:
                temp = i
                break
        if temp is None:
            dispatcher.utter_message(text='We don\'t have '+meal)
            return []

        additional = ''
        if not (additional_request is None):
            additional = additional_request

        result = "You ordered: "+temp["name"]+" "+additional+"\n you have to pay "+str(temp["price"])
        dispatcher.utter_message(text=result)

        return []

class TimeWait(Action):
    def name(self) -> Text:
        return "time"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        a = [x['timestamp'] for x in tracker.events if x['event'] == "bot" and x['text'].startswith("You ordered:")]

        if len(a) == 0 :
            dispatcher.utter_message(text="You didn't order anything")
            return []

        a = time.time() - a[-1]
        a = a/3600
        meal = tracker.get_slot("meals")

        if meal is None:
            return []
        meal = meal[0].upper() + meal[1:]
        menu = readMenu()

        temp = None
        for i in menu:
            if i["name"] == meal:
                temp = i
                break
        if temp is None:
            return []

        result = temp["preparation_time"]-a
        if result < 0:
            result = "You're order is ready"
        else:
            result = "You have to wait "+str("{0:0.2f}".format(result))
        dispatcher.utter_message(text=result)

        return []