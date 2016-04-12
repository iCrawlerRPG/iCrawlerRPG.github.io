var Upgrades = function() {
	var excelia = 0;

	var upgradeList = [];
	upgradeList.push({name: "Time Warp",
		id: "timewarp1",
		exceliaCost: 10,
		required: "",
		shown: false,
		purchased: false,
		description:"Is progress too slow? Make everything go at twice the speed!"});

	upgradeList.push({name: "Aetheric Attunement",
		id: "aetheric",
		exceliaCost: 100,
		required: "",
		shown: false,
		purchased: false,
		description:"Tap into the mana around you. Recover +1 MP per second while exploring."});

	upgradeList.push({name: "Time Warp 2",
		id: "timewarp2",
		exceliaCost: 100,
		required: "timewarp1",
		shown: false,
		purchased: false,
		description:"Change to the next gear! With this, everything is five times faster!"});

	upgradeList.push({name: "Blessings",
		id: "blessings",
		exceliaCost: 100,
		required: "",
		shown:false,
		purchased: false,
		description:"Keep 10% of your excelia upon death."});

	upgradeList.push({name: "Auto-Shooting",
		id: "autoshoot",
		exceliaCost: 500,
		required: "",
		shown: false,
		purchased: false,
		description:"Shoot a fireball at the start of every battle without losing a turn!"});

	upgradeList.push({name: "Excelia x2",
		id: "doubleexcelia",
		exceliaCost: 2000,
		required: "",
		shown: false,
		purchased: false,
		description:"Double the amount of Excelia you gain per monster."});

	upgradeList.push({name: "Adept Mage",
		id: "adeptmage",
		exceliaCost: 5000,
		required: "",
		shown: false,
		purchased: false,
		description:"Master spells twice as fast. Blow yourself up twice as much."});

	upgradeList.push({name: "Battle Healing",
		id: "battlehealing",
		exceliaCost: 5000,
		required: "",
		shown: false,
		purchased: false,
		description:"Cast Cure whenever you get under 50% HP during battle."});

	var self = this;
	//Save Method
	self.save = function() {
		var upgradesSave = {
      savedExcelia: excelia,
      savedUpgradeList: upgradeList
		};
		localStorage.setItem("upgradesSave",JSON.stringify(upgradesSave));
	};

	//Load Method
	self.load = function() {
		var upgradesSave = JSON.parse(localStorage.getItem("upgradesSave"));
		if (upgradesSave) {
			if (upgradesSave.savedExcelia !== undefined) {
				excelia = upgradesSave.savedExcelia;
			}
			if (upgradesSave.savedUpgradeList !== undefined) {
				loadUpgradeList(upgradesSave.savedUpgradeList);
			}
		}
	};

	var loadUpgradeList = function(savedUpgradeList) {
		for (var i = 0; i < savedUpgradeList.length; i++) {
			if (i == upgradeList.length) {
				break;
			}
			if (savedUpgradeList[i].shown !== undefined) {
				upgradeList[i].shown = savedUpgradeList[i].shown;
			}
			if (savedUpgradeList[i].purchased !== undefined) {
				upgradeList[i].purchased = savedUpgradeList[i].purchased;
			}
		}
	};

	//Getters
	self.getExcelia = function() {
		return excelia;
	};

	//Setters

	//Other Methods
	self.loadExcelia = function() {
		document.getElementById("excelia").innerHTML = Math.round(100*excelia)/100;
	};

	self.loadTimeUpgrades = function() {
		for (var i = 0; i < upgradeList.length; i++) {
			if (upgradeList[i].id == "timewarp1" && upgradeList[i].purchased === true) {
				document.getElementById("speed2").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(500)">x2</button>';
			}
			else if (upgradeList[i].id == "timewarp2" && upgradeList[i].purchased === true) {
				document.getElementById("speed5").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(200)">x5</button>';
			}
		}
	};

	self.gainExcelia = function(monster) {
		var gain = buffs.getExceliaMultiplier() * (monster.strength + monster.constitution + monster.dexterity)/15;
		self.updateExcelia(gain);
		self.updateUpgrades();
	};

	self.updateExcelia = function(moreExcelia) {
		excelia += moreExcelia;
		self.loadExcelia();
	};

	self.updateUpgrades = function() {
		document.getElementById("upgrades").innerHTML = '';
		for (var i = 0; i < upgradeList.length; i++) {
			if ((excelia >= upgradeList[i].exceliaCost || upgradeList[i].shown === true) && upgradeList[i].purchased === false && self.isUpgradePurchased(upgradeList[i].required)) {
				upgradeList[i].shown = true;
				document.getElementById("upgrades").innerHTML += '<div class="row"><div class="col-xs-7"><button class="btn btn-primary btn-block" data-toggle="tooltip" data-placement="top" title="' + upgradeList[i].description + '" onClick="upgrades.buyUpgrade(\'' + upgradeList[i].id + '\')">' + upgradeList[i].name + '</button></div><div class="col-xs-5"><p>(Cost: ' + upgradeList[i].exceliaCost + ')</p></div></div><div class="row" style="height: 5px;"></div>';
			}
		}
		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	};

	self.isUpgradePurchased = function(upgradeId) {
		if (upgradeId === "") {
			return true;
		}
		else {
			for (var i = 0; i < upgradeList.length; i++) {
				if (upgradeList[i].id == upgradeId) {
					if (upgradeList[i].purchased) {
						return true;
					}
					else {
						return false;
					}
				}
			}
			return false;
		}
	};

	self.buyUpgrade = function(upgradeId) {
		for (var i = 0; i < upgradeList.length; i++) {
			if (upgradeList[i].id == upgradeId) {
				break;
			}
		}
		if (excelia >= upgradeList[i].exceliaCost) {
			self.updateExcelia(-upgradeList[i].exceliaCost);
			upgradeList[i].purchased = true;
			activateUpgrade(upgradeList[i]);
			self.updateUpgrades();
		}
		buffs.updatePermanentBuffs();
		buffs.updateToggleableBuffs();
	};

	var activateUpgrade = function(upgrade) {
		if (upgrade.id == "timewarp1") {
			document.getElementById("speed2").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(500)">x2</button>';
		}
		else if (upgrade.id == "timewarp2") {
			document.getElementById("speed5").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(200)">x5</button>';
		}
		else if (upgrade.id == "aetheric") {
			buffs.setManaPerSecond(buffs.getManaPerSecond() + 1);
		}
		else if (upgrade.id == "battleHealing") {
			buffs.setCastCureInBattle(true);
		}
		else if (upgrade.id == "doubleexcelia") {
			buffs.setExceliaMultiplier(buffs.getExceliaMultiplier() * 2);
		}
		else if (upgrade.id == "adeptmage") {
			buffs.setSpellLevelingMultiplier(buffs.getSpellLevelingMultiplier() * 2);
		}
		else if (upgrade.id == "blessings") {
			buffs.setExceliaSavedOnDeath(buffs.getExceliaSavedOnDeath() + 10);
		}
		else if (upgrade.id == "autoshoot") {
			buffs.setCastFireballInBattle(true);
		}
	};
};

var upgrades = new Upgrades();