local lapis = require "lapis"
local app = lapis.Application()

local products = {}
local id = 0
local categories = {}
local idC = 0

app:enable("etlua")

--http://localhost:8080/add?category=1&product=jabłko
app:post("add_product","/add", function(self)
	products[id] = { name = self.params.product, category = self.params.category }
	id = id + 1
	return { json = products[id-1], status = 200 }
end)

--http://localhost:8080/addC?category=owoce
app:post("add_category","/addC", function(self)
	categories[id] = { name = self.params.category}
	idC = idC + 1
	return { json = categories[idC-1], status = 200 }
end)

--http://localhost:8080/remove?product=0
app:delete("remove_product","/remove", function(self)
	products[tonumber(self.params.product)] = nil;
	return { json = products[tonumber(self.params.product)] , status = 200 }
end)

--http://localhost:8080/edit?product=0&new=gruszka
app:put("edit_product","/edit", function(self)
	products[tonumber(self.params.product)] = self.params.new
	return { json = products[tonumber(self.params.product)] , status = 200 }
end)

--http://localhost:8080/getall
app:get("get_all_product","/getall", function(self)
	return { json = products, status = 200 }
end)

--http://localhost:8080/getallC
app:get("get_all_categories","/getallC", function(self)
	return { json = categories, status = 200 }
end)

--http://localhost:8080/get/0
app:get("get_by_id","/get/:id", function(self)
	return { json = products[tonumber(self.params.id)], status = 200 }
end)

return app