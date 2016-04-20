var Inventory = function() {
	var gold = 0;
	var keys = 0;
	var bag = [];

	var self = this;
	//Save Method
	self.save = function() {
		var inventorySave = {
			savedGold: gold,
			savedBag: bag,
			savedKeys: keys
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
			if (inventorySave.savedKeys !== undefined) {
				keys = inventorySave.savedKeys;
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

	self.getKeys = function() {
		return keys;
	};

	//Setters
	self.setGold = function(newGold) {
		gold = newGold;
	};

	self.setKeys = function(newKeys) {
		keys = newKeys;
	};

	//Other Methods
	self.updateInventory = function() {
		document.getElementById("inventory").innerHTML = "";
		for (var i = 0; i < bag.length; i++) {
			if (bag[i].type == "chest") {
				printChest(bag[i], i);
			}
			else if (bag[i].type == "weapon") {
				printWeapon(bag[i], i);
			}
		}
	};

	var printChest = function(chest, number) {
		document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.openChest(' + number + ')"><span class="badge">Open</span> ' + chest.name + '</button>';
	};

	var printWeapon = function(weapon, number) {
		document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item"><span class="badge">Equip</span>' + weapon.name + '</button>';
	};

	self.openChest = function(chest) {
		if (keys > 0) {
			var type = Math.floor(Math.random()*0);
			if (type === 0) {
				bag.push(createWeapon(bag[chest].rarity));
			}
			else if (type === 1) {
				createArmor(bag[chest].rarity);
			}
			else if (type == 2) {
				createAcessory(bag[chest].rarity);
			}
			else if (type == 3) {
				createEnhancingStone(bag[chest].rarity)
			}
			bag.splice(chest, 1);
			self.updateInventory();
		}
	};

	var createWeapon = function(points) {
		var weapon = {type: "weapon", name: "", damage: 0, speed: 0, defense: 0, magic: 0};
		var roll;
		while (points !== 0) {
			roll = Math.floor(Math.random()*4);
			if (roll === 0) {
				weapon.damage += 0.1;
			}
			else if (roll == 1) {
				weapon.speed += 0.1;
			}
			else if (roll == 2) {
				weapon.defense += 0.1;
			}
			else if (roll == 3) {
				weapon.magic += 0.1;
			}
			else if (roll == 4) {

			}
			points--;
		}
		weapon.name = nameWeapon(weapon);
		return weapon;
	};

	var nameWeapon = function(weapon) {
		var name = "";
		name += nameDamageAttribute(weapon.damage);
		name += nameSpeedAttribute(weapon.speed);
		name += nameDefenseAttribute(weapon.defense);
		name += nameMagicAttribute(weapon.magic);
		name += nameWeaponType(weapon);
		return name;
	};

	var nameDamageAttribute = function(damage) {
		if (damage === 0) {
			return "Broken ";
		}
		else if (damage < 2) {
			return "Useless ";
		}
		else if (damage < 5) {
			return "Blunt ";
		}
		else if (damage < 10) {
			return "Weak ";
		}
	};

	var nameSpeedAttribute = function(speed) {
		if (speed === 0) {
			return "Stagnant ";
		}
		else if (speed < 2) {
			return "Lethargic ";
		}
		else if (speed < 5) {
			return "Heavy ";
		}
		else if (speed < 10) {
			return "Slow ";
		}
	};

	var nameDefenseAttribute = function(defense) {
		if (defense === 0) {
			return "Feeble ";
		}
		else if (defense < 2) {
			return "Decrepit ";
		}
		else if (defense < 5) {
			return "Shabby ";
		}
		else if (defense < 10) {
			return "Delicate ";
		}
	};

	var nameMagicAttribute = function(magic) {
		if (magic === 0) {
			return "Plain ";
		}
		else if (magic < 2) {
			return "Regular ";
		}
		else if (magic < 5) {
			return "Unusual ";
		}
		else if (magic < 10) {
			return "Eerie ";
		}
	};

	var nameWeaponType = function(weapon) {
		var highest = Math.max(weapon.damage, weapon.speed, weapon.defense, weapon.magic);
		if (highest == weapon.damage) {
			return "Sword";
		}
		else if (highest == weapon.speed) {
			return "Daggers";
		}
		else if (highest == weapon.defense) {
			return "Shield";
		}
		else if (highest == weapon.magic) {
			return "Staff";
		}
	}

	self.findChest = function(rarity) {
		var chest = {type: "chest", name: "", rarity: rarity};
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