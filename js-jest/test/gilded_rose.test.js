/** @format */

const { Shop, Item } = require("../src/gilded_rose");

// per instructions, Item and Items property are not modifiable
// so I am only writing tests for these objects that will pass on current code

// tests for 'Item'
describe("ThingOne", function () {
	it("should create an item with 'name', 'sellIn', and 'quality' properties", function () {
		const thingOne = new Item("foo", 0, 0);
		expect(thingOne.name).toBe("foo");
		expect(thingOne.sellIn).toBe(0);
		expect(thingOne.quality).toBe(0);
	});
});

// tests for 'Shop'
describe("Gilded Rose", function () {
	describe("initialization", function () {
		it("should create a shop with an array of items that have 'name', 'sellIn', and 'quality' properties", function () {
			const gildedRose = new Shop([new Item("foo", 0, 0)]);
			expect(gildedRose.items[0].name).toBe("foo");
			expect(gildedRose.items[0].sellIn).toBe(0);
			expect(gildedRose.items[0].quality).toBe(0);
		});

		// shop may be empty so allowing for not providing items in initializing
		it("should create an empty shop if no items provided", function () {
			const gildedRose = new Shop();
			expect(gildedRose.items.length).toBe(0);
		});
	});
});
