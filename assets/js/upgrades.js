var Upgrades = function() {
	var excelia = 0;

	var upgradeList = [];
	upgradeList.push({name: "Time Warp 1",
		id: "timewarp1",
		exceliaCost: 100,
		required: "",
		shown: false,
		purchased: false,
		description:"Is idle mode too slow? Make it go at twice the speed!"});

	upgradeList.push({name: "Aetheric Attunement 1",
		id: "aetheric1",
		exceliaCost: 100,
		required: "",
		shown: false,
		purchased: false,
		description:"Tap into the mana around you. Recover +1 MP per second while exploring."});

	upgradeList.push({name: "Blessings 1",
		id: "blessings1",
		exceliaCost: 500,
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

	upgradeList.push({name: "Time Warp 2",
		id: "timewarp2",
		exceliaCost: 1000,
		required: "timewarp1",
		shown: false,
		purchased: false,
		description:"Change to the next gear! With this, idle mode is five times faster!"});

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

	upgradeList.push({name: "Blessings 2",
		id: "blessings2",
		exceliaCost: 5000,
		required: "blessings1",
		shown: false,
		purchased: false,
		description:"With this, you'll be able to keep 20% of your excelia upon death!"})

	upgradeList.push({name: "Time Warp 3",
		id: "timewarp3",
		exceliaCost: 10000,
		required: "timewarp2",
		shown: false,
		purchased: false,
		description:"Makes idle mode ten times faster! You'll barely see what's happening"});

	upgradeList.push({name: "Aetheric Attunement 2",
		id: "aetheric2",
		exceliaCost: 10000,
		required: "aetheric1",
		shown: false,
		purchased: false,
		description:"Deepen the bond between you and the flow of mana. Get +2 MP per second while exploring."});

	upgradeList.push({name: "Blessings 3",
		id: "blessings3",
		exceliaCost: 50000,
		required:"blessings2",
		shown: false,
		purchased: false,
		description:"Keep 30% of your excelia upon death."});

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
			else if (upgradeList[i].id == "timewarp2" && upgradeList[i].purchased === true) {
				document.getElementById("speed10").innerHTML = '<button class="btn btn-primary" onClick="system.gameSpeed(100)">x10</button>';
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
		if (upgrade.id == "timewarp1" || upgrade.id == "timewarp2" || upgrade.id == "timewarp3") {
			self.loadTimeUpgrades();
		}
		else if (upgrade.id == "aetheric1" || upgrade.id == "aetheric2") {
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
		else if (upgrade.id == "blessings1" || upgrade.id == "blessings2" || upgrade.id == "blessings3") {
			buffs.setExceliaSavedOnDeath(buffs.getExceliaSavedOnDeath() + 10);
		}
		else if (upgrade.id == "autoshoot") {
			buffs.setCastFireballInBattle(true);
		}
	};
};

var upgrades = new Upgrades();