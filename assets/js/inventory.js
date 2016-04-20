var Inventory = function() {
	var gold = 0;
	var bag = [];

	var self = this;
	//Save Method
	self.save = function() {
		var inventorySave = {
			savedGold: gold,
			savedBag: bag
		};
		localStorage.setItem("inventorySave",JSON.stringify(inventorySave));
	};

	//Load Method
	self.load = function() {
		var inventorySave = JSON.parse(localStorage.getItem("inventorySave"));
		if (inventorySave) {
			if (inventorySave.savedGold !== undefined) {
				gold = inventorySave.savedGold;
			}
			if (inventorySave.savedBag !== undefined) {
				loadBag(inventorySave.savedBag);
			}
		}
	};

	var loadBag = function(savedBag) {
		for (var i = 0; i < savedBag.length; i++) {
			bag.push(savedBag[i]);
		}
	};

	//Getters
	self.getGold = function() {
		return gold;
	};

	//Setters
	self.setGold = function(newGold) {
		gold = newGold;
	};

	//Other Methods
	self.getChest = function(rarity) {
		var chest = {type:"chest", name:"", rarity: rarity};
		chest.name = nameChest(rarity) + " Chest";
		bag.push(chest);
	};

	var nameChest = function(rarity) {
		var name = "";
		if (rarity === 0) {
			name += "Useless";
		}
		else {
			name += "Not Useless";
		}
		return name;
	};
};

var inventory = new Inventory();