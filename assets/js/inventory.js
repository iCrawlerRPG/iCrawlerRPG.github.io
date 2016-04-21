var Inventory = function() {
	var gold = 0;
	var keys = 0;
	var bag = [];
	var keyPrice = 10;
	var equippedWeapon;
	var equippedArmor;
	var equippedAccessory;
	var sellMode = false;

	var self = this;
	//Save Method
	self.save = function() {
		var inventorySave = {
			savedGold: gold,
			savedBag: bag,
			savedKeys: keys,
			savedEquippedWeapon: equippedWeapon,
			savedEquippedArmor: equippedArmor,
			savedEquippedAccessory: equippedAccessory,
			savedKeyPrice: keyPrice
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
			if (inventorySave.savedEquippedWeapon !== undefined) {
				equippedWeapon = inventorySave.savedEquippedWeapon;
			}
			if (inventorySave.savedEquippedArmor !== undefined) {
				equippedArmor = inventorySave.savedEquippedArmor;
			}
			if (inventorySave.savedEquippedAccessory !== undefined) {
				equippedAccessory = inventorySave.savedEquippedAccessory;
			}
			if (inventorySave.savedKeyPrice !== undefined) {
				keyPrice = inventorySave.savedKeyPrice;
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

	self.getBag = function() {
		return bag;
	};

	//Setters
	self.setGold = function(newGold) {
		gold = newGold;
		self.updateInventoryHTML();
	};

	self.setKeys = function(newKeys) {
		keys = newKeys;
		self.updateInventoryHTML();
	};

	//Other Methods
	self.updateInventoryHTML = function() {
		document.getElementById("gold").innerHTML = gold;
		document.getElementById("keys").innerHTML = keys;
	};

	self.updateInventory = function(boolean) {
		self.updateShop(boolean);
		document.getElementById("inventory").innerHTML = "";
		for (var i = 0; i < bag.length; i++) {
			if (bag[i].type == "chest") {
				printChest(bag[i], i, sellMode);
			}
			else if (bag[i].type == "weapon") {
				printWeapon(bag[i], i, sellMode);
			}
			else if (bag[i].type == "armor") {
				printArmor(bag[i], i, sellMode);
			}
		}
	};

	self.updateShop = function(boolean) {
		sellMode = boolean;
		if (sellMode) {
			document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(false)">Exit Sell Mode</button>'
		}
		else {
			document.getElementById("sellbutton").innerHTML = '<button class="btn btn-block btn-success" onClick="inventory.updateInventory(true)">Enter Sell Mode</button>'
		}
		document.getElementById("keyprice").innerHTML = keyPrice;
	};

	var printChest = function(chest, number, sellMode) {
		if (!sellMode) {
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.openChest(' + number + ')"><span class="badge">Open</span> ' + chest.name + '</button>';
		}
		else {
			var price = chest.rarity;
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span> ' + chest.name + '</button>';
		}
	};

	var printWeapon = function(weapon, number, sellMode) {
		if (!sellMode) {
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.equipWeapon(' + number + ')"><span class="badge">Weapon</span>' + weapon.name + '</button>';
		}
		else {
			var price = Math.round((weapon.damage + weapon.speed + weapon.defense + weapon.magic) * 5 * weapon.rarity);
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span>' + weapon.name + '</button>';
		}
	};

	var printArmor = function(armor, number, sellMode) {
		if (!sellMode) {
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.equipArmor(' + number + ')"><span class="badge">Armor</span>' + armor.name + '</button>';
		}
		else {
			var price = Math.round((armor.defense + armor.movement + armor.magic) * 10 * armor.rarity);
			document.getElementById("inventory").innerHTML += '<button type="button" class="list-group-item list-group-item-success" onClick="inventory.sell(' + number + ',' + price + ')"><span class="badge">' + price + '</span>' + armor.name + '</button>';
		}
	};


	self.updateEquipment = function() {
		document.getElementById("equipment").innerHTML = '';
		if (equippedWeapon !== undefined) {
			printEquippedWeapon();
		}
		if (equippedArmor !== undefined) {
			printEquippedArmor();
		}
	}

	var printEquippedWeapon = function() {
		document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.unequipWeapon()"><span class="badge">Equipped</span>' + equippedWeapon.name + '</button>';
	};

	var printEquippedArmor = function() {
		document.getElementById("equipment").innerHTML += '<button type="button" class="list-group-item" onClick="inventory.unequipArmor()"><span class="badge">Equipped</span>' + equippedArmor.name + '</button>';
	};

	self.openChest = function(chest) {
		if (keys > 0) {
			var type = Math.floor(Math.random()*2);
			if (type === 0) {
				bag.push(createWeapon(bag[chest].rarity));
			}
			else if (type === 1) {
				bag.push(createArmor(bag[chest].rarity));
			}
			else if (type == 2) {
				createAcessory(bag[chest].rarity);
			}
			else if (type == 3) {
				createEnhancingStone(bag[chest].rarity)
			}
			bag.splice(chest, 1);
			self.updateInventory(sellMode);
			self.setKeys(keys - 1);
		}
	};

	var createWeapon = function(points) {
		var weapon = {type: "weapon", name: "", damage: 0, speed: 0, defense: 0, magic: 0, rarity: 0};
		var roll;
		while (points > 0) {
			roll = Math.floor(Math.random()*4);
			if (roll === 0) {
				weapon.damage += 0.1 * Math.round(points/2);
			}
			else if (roll == 1) {
				weapon.speed += 0.1 * Math.round(points/2);
			}
			else if (roll == 2) {
				weapon.defense += 0.1 * Math.round(points/2);
			}
			else if (roll == 3) {
				weapon.magic += 0.1 * Math.round(points/2);
			}
			points -= Math.round(points/2);
		}
		weapon.rarity = equipmentRarity();
		weapon.name = nameWeapon(weapon);
		return weapon;
	};

	var createArmor = function(points) {
		var armor = {type: "armor", name: "", defense: 0, movement: 0, magic: 0, rarity: 0};
		var roll;
		while (points > 0) {
			roll = Math.floor(Math.random()*3);
			if (roll === 0) {
				armor.defense += 0.1 * Math.round(points/2);
			}
			else if (roll == 1) {
				armor.movement += 0.1 * Math.round(points/2);
			}
			else if (roll == 2) {
				armor.movement += 0.1 * Math.round(points/2);
			}
			points -= Math.round(points/2);
		}
		armor.rarity = equipmentRarity();
		armor.name = nameArmor(armor);
		return armor;
	};

	var nameWeapon = function(weapon) {
		var name = "";
		name += nameRarity(weapon);
		name += nameDamageAttribute(weapon.damage);
		name += nameSpeedAttribute(weapon.speed);
		name += nameDefenseAttribute(weapon.defense);
		name += nameMagicAttribute(weapon.magic);
		name += nameWeaponType(weapon);
		return name;
	};

	var nameArmor = function(armor) {
		var name = "";
		name += nameRarity(armor);
		name += nameDefenseAttribute(armor.defense);
		name += nameSpeedAttribute(armor.movement);
		name += nameMagicAttribute(armor.magic);
		name += nameArmorType(armor);
		return name;
	}

	var equipmentRarity = function() {
		var rarity = Math.floor(Math.random()*101);
		return rarity;
	};

	var nameRarity = function(equipment) {
		if (equipment.rarity < 50) {
			equipment.rarity = 1;
			return "";
		}
		else if (equipment.rarity < 75) {
			equipment.rarity = 1.25;
			return "Uncommon ";
		}
		else if (equipment.rarity < 90) {
			equipment.rarity = 1.5;
			return "Rare ";
		}
		else if (equipment.rarity < 100) {
			equipment.rarity = 2.0;
			return "Epic ";
		}
		else if (equipment.rarity == 100) {
			equipment.rarity = 2.5;
			return "Legendary ";
		}
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
		else if (damage < 20) {
			return "Average ";
		}
		else {
			return "Sharp ";
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
		else if (speed < 20) {
			return "Flowy ";
		}
		else {
			return "Light ";
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
		else if (defense < 20) {
			return "Thick ";
		}
		else {
			return "Sturdy ";
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
		else if (magic < 20) {
			return "Odd ";
		}
		else {
			return "Magical ";
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

	var nameArmorType = function(armor) {
		var highest = Math.max(armor.defense, armor.movement, armor.magic);
		if (highest == armor.defense) {
			return "Plate Armor";
		}
		else if (highest == armor.movement) {
			return "Leather Vest";
		}
		else if (highest == armor.movement) {
			return "Cloth Robe";
		}
	}

	self.findChest = function(rarity) {
		var chest = {type: "chest", name: "", rarity: rarity};
		chest.name = nameChest(rarity) + " Chest";
		bag.push(chest);
		self.updateInventory(sellMode);
	};

	self.clearBag = function() {
		bag = [];
		self.updateInventory(sellMode);
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
		var rarity = Math.floor(Math.random() * 101);
		chest.rarity += Math.floor(rarity/10);
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
	};

	self.equipWeapon = function(number) {
		var weapon = bag[number];
		if (equippedWeapon !== undefined) {
			self.unequipWeapon();
		}
		equippedWeapon = weapon;
		player.setStrengthBonus(player.getStrengthBonus() + weapon.damage * weapon.rarity);
		player.setDexterityBonus(player.getDexterityBonus() + weapon.speed * weapon.rarity);
		player.setConstitutionBonus(player.getConstitutionBonus() + weapon.defense * weapon.rarity);
		player.setMagicBonus(player.getMagicBonus() + weapon.magic * weapon.rarity);
		bag.splice(number, 1);
		self.updateInventory(sellMode);
		self.updateEquipment();
	};

	self.equipArmor = function(number) {
		var armor = bag[number];
		if (equippedArmor !== undefined) {
			self.unequipArmor();
		}
		equippedArmor = armor;
		player.setConstitutionBonus(player.getConstitutionBonus() + armor.defense * armor.rarity);
		player.setSpeedBonus(player.getSpeedBonus() + armor.movement * armor.rarity);
		player.setMagicBonus(player.getMagicBonus() + armor.magic * armor.rarity);
		bag.splice(number, 1);
		self.updateInventory(sellMode);
		self.updateEquipment();
	};

	self.unequipWeapon = function() {
		bag.push(equippedWeapon);
		player.setStrengthBonus(player.getStrengthBonus() - equippedWeapon.damage * equippedWeapon.rarity);
		player.setDexterityBonus(player.getDexterityBonus() - equippedWeapon.speed * equippedWeapon.rarity);
		player.setConstitutionBonus(player.getConstitutionBonus() - equippedWeapon.defense * equippedWeapon.rarity);
		player.setMagicBonus(player.getMagicBonus() - equippedWeapon.magic * equippedWeapon.rarity);
		player.setHealthCurrentValue(player.getHealthCurrentValue());
		player.setManaCurrentValue(player.getManaCurrentValue());
		equippedWeapon = undefined;
		self.updateEquipment();
		self.updateInventory(sellMode);
	};

	self.unequipArmor = function() {
		bag.push(equippedArmor);
		player.setConstitutionBonus(player.getConstitutionBonus() - equippedArmor.defense * equippedArmor.rarity);
		player.setSpeedBonus(player.getSpeedBonus() - equippedArmor.movement * equippedArmor.rarity);
		player.setMagicBonus(player.getMagicBonus() - equippedArmor.magic * equippedArmor.rarity);
		player.setHealthCurrentValue(player.getHealthCurrentValue());
		player.setManaCurrentValue(player.getManaCurrentValue());
		equippedArmor = undefined;
		self.updateEquipment();
		self.updateInventory(sellMode);
	};

	self.buyKey = function() {
		if (gold >= keyPrice) {
			self.setGold(self.getGold() - keyPrice);
			self.setKeys(self.getKeys() + 1);
			keyPrice += 10;
			self.updateInventory(sellMode);
		}
	};

	self.sell = function(number, price) {
		self.setGold(self.getGold() + price);
		bag.splice(number, 1);
		self.updateInventory(sellMode);
	};
};

var inventory = new Inventory();