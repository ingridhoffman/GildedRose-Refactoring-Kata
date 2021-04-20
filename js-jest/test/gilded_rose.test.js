/** @format */

const { Shop, Item } = require("../src/gilded_rose");

// per instructions, Item and Items property are not modifiable
// tests here for these objects will pass on current code

// tests for 'Item'
describe("ThingOne", function () {
	it("should create an item with 'name', 'sellIn', and 'quality' properties", function () {
		const thingOne = new Item("foo", 0, 0);
		expect(thingOne.name).toBe("foo");
		expect(thingOne.sellIn).toBe(0);
		expect(thingOne.quality).toBe(0);
	});
	// future testing should verify that each item property is provided, each is the correct type, the sell by date is not negative, and the quality is not more than 50
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

	describe("typical item quality update method", function () {
		it("should return items", function () {
			const gildedRose = new Shop([new Item("foo", 0, 0)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].name).toBe("foo");
		});

		// decrease amount for typical items is not specified in instructions and one is inferred from code
		it("for default items, quality should decrease by one if more than zero and sell by date is not passed", function () {
			const gildedRose = new Shop([new Item("foo", 1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(4);
		});

		// decrease amount for typical items is specified to "degrade twice as fast" past the sell by date
		it("for default items, quality should decrease by two if more than zero and sell by date is passed", function () {
			const gildedRose = new Shop([new Item("foo", -1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(3);
		});

		it("quality should never decrease to less than zero", function () {
			const gildedRose = new Shop([new Item("foo", 1, 0)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(0);
		});
	});

	describe("'Aged Brie' quality update method", function () {
		// increase amount for 'Aged Brie' is not specified in instructions and one is inferred from code
		it("'Aged Brie' quality should increase by one if less than 50 and sell by date is not passed", function () {
			const gildedRose = new Shop([new Item("Aged Brie", 1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(6);
		});

		// increase amount for 'Aged Brie' after sell date is not specified in instructions and two is inferred from code and statement that items degrade twice as fast after sell by date
		it("'Aged Brie' quality should increase by two if less than 50 and sell by date is passed", function () {
			const gildedRose = new Shop([new Item("Aged Brie", -1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(7);
		});

		it("quality should never increase to more than 50", function () {
			const gildedRose = new Shop([new Item("Aged Brie", 1, 50)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(50);
		});
	});

	describe("'Sulfuras' quality update method", function () {
		it("'Sulfuras, Hand of Ragnaros' quality should not change if sell by date is not passed", function () {
			const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(5);
		});

		it("'Sulfuras, Hand of Ragnaros' quality should not change if sell by date is passed", function () {
			const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", -1, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(5);
		});
	});

	describe("'Backstage passes' quality update method", function () {
		// increase amount for 'Backstage passes' more than ten days away is not specified in instructions and one is inferred from code
		it("'Backstage passes to a TAFKAL80ETC concert' quality should increase by one if less than 50 and more than 10 days before event", function () {
			const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(6);
		});

		it("'Backstage passes to a TAFKAL80ETC concert' quality should increase by two if less than 50 and 10-6 days before event", function () {
			const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(7);
		});

		it("'Backstage passes to a TAFKAL80ETC concert' quality should increase by three if less than 50 and 5 days or less before event", function () {
			const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(8);
		});

		it("'Backstage passes to a TAFKAL80ETC concert' quality should drop to zero after the event", function () {
			const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 5)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(0);
		});

		it("quality should never increase to more than 50", function () {
			const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 50)]);
			const items = gildedRose.updateQuality();
			expect(gildedRose.items[0].quality).toBe(50);
		});
	});
});
