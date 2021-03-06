#!/bin/bash

BOARD=("_" "_" "_" "_" "_" "_" "_" "_" "_")
POSITION="0"
USER="X"
ISEND="FALSE"
RESULT="OK"
ONEPLAYERMODE="NULL"
DRAW="0"
FILE="save.txt"

print () {
	clear
	for i in {0..2}
	do
		echo ${BOARD[@]:$((3*i)):3}
	done
}
read_saved () {
	ITER="0"
	readarray -t BOARD < $FILE
	USER=${BOARD[10]}
	ONEPLAYERMODE=${BOARD[11]}
}
save () {
	touch $FILE
	truncate -s 0 $FILE
	for i in {0..9}
	do
		echo ${BOARD[$i]} >> $FILE
	done
	echo ${USER} >> $FILE
	echo ${ONEPLAYERMODE} >> $FILE
}

move () {
	if [ $POSITION -ge "0" ]  && [ $POSITION -lt "9" ] && [ ${BOARD[$POSITION]} = "_" ]
	then
		RESULT="OK"
		BOARD[$POSITION]="$USER"
		DRAW=$(($DRAW+1))
	elif [ $POSITION = "S" ]
	then
		save
		RESULT="SAVE"
	else
		RESULT="WRONG"
	fi
}

change_user () {
	if [ $USER = "O" ]
	then
		USER="X"
	else
		USER="O"
	fi
}

win () {
	print
	if [ "$1" = "DRAW" ]
	then
		echo "draw"
	else
		echo "win " "$1"
	fi
	ISEND="TRUE"
}

check_win () {
	for i in {0..2}
	do
		if [ ${BOARD[$((i*3))]} = ${BOARD[$((i*3+1))]} ] && [ ${BOARD[$((i*3+1))]} = ${BOARD[$((i*3+2))]} ] && [ ${BOARD[$((i*3))]} != "_" ]
		then
			win ${BOARD[$((i*3))]}
		elif [ ${BOARD[$((0+i))]} = ${BOARD[$((3+i))]} ] && [ ${BOARD[$((3+i))]} = ${BOARD[$((6+i))]} ] && [ ${BOARD[$((i))]} != "_" ]
		then
			win ${BOARD[$i]}
		fi
	done
	if [ ${BOARD[0]} = ${BOARD[4]} ] && [ ${BOARD[4]} = ${BOARD[8]} ] && [ ${BOARD[0]} != "_" ]
	then
		win ${BOARD[0]}
	elif [ ${BOARD[2]} = ${BOARD[4]} ] && [ ${BOARD[4]} = ${BOARD[6]} ] && [ ${BOARD[2]} != "_" ]
	then
		win ${BOARD[2]}
	fi
	if [ $DRAW -eq "9" ]
	then
		win "DRAW"
	fi
}

read_position () {
	echo "turn " $USER
	if [ "$1" = "PLAYER" ]
	then
		read POSITION
	else
		POSITION=$(($RANDOM%9))
	fi
	move
}

get_response () {
	print
	read_position "$1"
	while [ $RESULT = "WRONG" ] || [ $RESULT = "SAVE" ]
	do
		print
		if [ $RESULT = "WRONG" ]
		then
			echo "Wrong input"
		else
			echo "Saved"
		fi

		read_position "$1"
	done
	check_win
	change_user
}

while [ $ONEPLAYERMODE = "NULL" ]
do
	echo "To save game write: S"
	echo "To continue saved game write: R"
	echo "Do you want to play with computer? Y/N"
	read ONEPLAYERMODE
	if [ $ONEPLAYERMODE != "Y" ] && [ $ONEPLAYERMODE != "N" ] && [ $ONEPLAYERMODE != "R" ]
	then
		ONEPLAYERMODE="NULL"
	fi
done

if [ $ONEPLAYERMODE = "R" ]
then
	if test -f "$FILE"; then
		read_saved
	fi
fi

while [ $ISEND = "FALSE" ]
do
	get_response "PLAYER"
	if [ $ONEPLAYERMODE = "Y" ] && [ $ISEND = "FALSE" ]
	then
		get_response "COMPUTER"
	fi
done
