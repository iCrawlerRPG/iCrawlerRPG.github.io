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
	self.updateInventory = function() {
		document.getElementById("inventory").innerHTML = "";
		for (var i = 0; i < bag.length; i++) {
			if (bag[i].type == "chest") {
				printChest(bag[i]);
			}
		}
	};

	var printChest = function(chest) {
		document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.openChest(' + chest + ')"><span class="badge">Open</span> ' + chest.name + '</button>';
	};

	self.findChest = function(rarity) {
		var chest = {type:"chest", name:"", rarity: rarity};
		chest.name = nameChest(rarity) + " Chest";
		bag.push(chest);
		self.updateInventory();
	};

	self.clearBag = function() {
		bag = [];
		self.updateInventory();
	};

	var nameChest = function(rarity) {
		var name = "";
		name += extraRarity();
		if (rarity < 5) {
			name += "Useless";
		}
		else if (rarity < 10) {
			name += "Dusty";
		}
		else if (rarity < 25) {
			name += "Rusty";
		}
		else if (rarity < 50) {
			name += "Shabby";
		}
		else if (rarity < 100) {
			name += "Common";
		}
		else if (rarity < 250) {
			name += "Odd";
		}
		return name;
	};

	var extraRarity = function(chest) {
		var rarity = Math.floor(Math.random() * 100);
		if (rarity < 50) {
			return "Poor ";
		}
		else if (rarity < 75) {
			return "Regular ";
		}
		else if (rarity < 90) {
			return "Shiny ";
		}
		else if (rarity < 100) {
			return "Aetherial ";
		}
		else if (rarity == 100) {
			return "Heavenly ";
		}
		chest.rarity += Math.floor(rarity/10);
	};
};

var inventory = new Inventory();