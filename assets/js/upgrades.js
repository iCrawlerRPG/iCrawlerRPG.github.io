var Upgrades = function() {
	var excelia = 0;

	var upgradeList = [];
	upgradeList.push({name: "Aetheric Attunement 1",
		id: "aetheric1",
		exceliaCost: 10,
		required: "",
		shown: true,
		purchased: false,
		description:"Tap into the mana around you. Recover +1 MP per second while exploring."});

	upgradeList.push({name: "Time Warp 1",
		id: "timewarp1",
		exceliaCost: 10,
		required: "",
		shown: true,
		purchased: false,
		description:"Is idle mode too slow? Make it go at twice the speed!"});

	upgradeList.push({name: "Blessings 1",
		id: "blessings1",
		exceliaCost: 100,
		required: "",
		shown: true,
		purchased: false,
		description:"Keep 10% of your excelia upon death."});

	upgradeList.push({name: "Faster Resting 1",
		id: "fastresting1",
		exceliaCost: 100,
		required: "",
		shown: true,
		purchased: false,
		description:"Recover at twice the normal speed."});

	upgradeList.push({name: "Auto-Shooting",
		id: "autoshoot",
		exceliaCost: 250,
		required: "",
		shown: true,
		purchased: false,
		description:"Shoot a fireball at the start of every battle without losing a turn!"});	

	upgradeList.push({name: "Battle Healing",
		id: "battlehealing",
		exceliaCost: 250,
		required: "",
		shown: true,
		purchased: false,
		description:"Cast Cure whenever you get under 50% HP during battle."});

	upgradeList.push({name: "Aetheric Attunement 2",
		id: "aetheric2",
		exceliaCost: 350,
		required: "aetheric1",
		shown: false,
		purchased: false,
		description:"Deepen the bond between you and the flow of mana. Get +2 MP per second while exploring."});

	upgradeList.push({name: "Faster Resting 2",
		id: "fastresting2",
		exceliaCost: 500,
		required: "fastresting1",
		shown: false,
		purchased: false,
		description:"Recover at four times the normal speed."});

	upgradeList.push({name: "Time Warp 2",
		id: "timewarp2",
		exceliaCost: 500,
		required: "timewarp1",
		shown: false,
		purchased: false,
		description:"Change to the next gear! With this, idle mode is five times faster!"});

	upgradeList.push({name: "Faster Exploration 1",
		id: "fasterexploration1",
		exceliaCost: 1000,
		required: "",
		shown: true,
		purchased: false,
		description:"Double the speed of floor exploration."});

	upgradeList.push({name: "Muscle Memory 1",
		id: "musclememory1",
		exceliaCost: 1000,
		required: "",
		shown: true,
		purchased: false,
		description:"Lose 1% less stats when dying."});

	upgradeList.push({name: "Barrier Casting",
		id: "barriercast",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"Cast Barrier whenever it is down. You need the Barrier spell for it to have any effect."});

	upgradeList.push({name: "Blessings 2",
		id: "blessings2",
		exceliaCost: 2000,
		required: "blessings1",
		shown: false,
		purchased: false,
		description:"With this, you'll be able to keep 20% of your excelia upon death!"})

	upgradeList.push({name: "Double Excelia 1",
		id: "doubleexcelia1",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"Double the amount of Excelia you gain per monster."});

	upgradeList.push({name: "Faster Leveling 1",
		id: "fasterleveling1",
		exceliaCost: 2000,
		required: "",
		shown: true,
		purchased: false,
		description:"Double the speed your stats gain experience."});

	upgradeList.push({name: "Time Warp 3",
		id: "timewarp3",
		exceliaCost: 2000,
		required: "timewarp2",
		shown: false,
		purchased: false,
		description:"Makes idle mode ten times faster! You'll barely see what's happening"});

	upgradeList.push({name: "Faster Resting 3",
		id: "fastresting3",
		exceliaCost: 2500,
		required: "fastresting2",
		shown: false,
		purchased: false,
		description:"Recover at eight times the normal speed."});

	upgradeList.push({name: "Adept Mage",
		id: "adeptmage",
		exceliaCost: 5000,
		required: "",
		shown: true,
		purchased: false,
		description:"Master spells twice as fast."});

	upgradeList.push({name: "Blessings 3",
		id: "blessings3",
		exceliaCost: 5000,
		required: "blessings2",
		shown: false,
		purchased: false,
		description:"Keep 30% of your excelia upon death."});

	upgradeList.push({name: "Faster Exploration 1",
		id: "fasterexploration2",
		exceliaCost: 5000,
		required: "fasterexploration1",
		shown: false,
		purchased: false,
		description:"Double the speed of floor exploration."});

	upgradeList.push({name: "Muscle Memory 2",
		id: "musclememory2",
		exceliaCost: 5000,
		required: "musclememory1",
		shown: false,
		purchased: false,
		description:"Lose 1% less stats when dying."});

	upgradeList.push({name: "Double Excelia 2",
		id: "doubleexcelia2",
		exceliaCost: 10000,
		required: "doubleexcelia1",
		shown: false,
		purchased: false,
		description:"Double the amount of Excelia you gain per monster."});

	upgradeList.push({name: "Faster Leveling 2",
		id: "fasterleveling2",
		exceliaCost: 15000,
		required: "fasterleveling1",
		shown: false,
		purchased: false,
		description:"Double the speed your stats gain experience."});

	upgradeList.push({name: "Faster Exploration 1",
		id: "fasterexploration3",
		exceliaCost: 20000,
		required: "fasterexploration2",
		shown: false,
		purchased: false,
		description:"Double the speed of floor exploration."});

	upgradeList.push({name: "Faster Leveling 3",
		id: "fasterleveling3",
		exceliaCost: 50000,
		required: "fasterleveling2",
		shown: false,
		purchased: false,
		description:"Double the speed your stats gain experience."});

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
		var success = false;
		for (var i = 0; i < savedUpgradeList.length; i++) {
			if (i == upgradeList.length) {
				break;
			}
			for (var j = 0; j < upgradeList.length; j++) {
				if (upgradeList[j].id == savedUpgradeList[i].id) {
					success = true;
					break;
				}
			}
			if (success) {
				if (savedUpgradeList[i].shown !== undefined) {
					upgradeList[j].shown = savedUpgradeList[i].shown;
				}
				if (savedUpgradeList[i].purchased !== undefined) {
					upgradeList[j].purchased = savedUpgradeList[i].purchased;
				}
			}
			success=false;
		}
	};

	//Getters
	self.getExcelia = function() {
		return excelia;
	};

	//Setters
	self.setExcelia = function(number) {
		excelia = number;
		self.loadExcelia();
	};

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
			else if (upgradeList[i].id == "timewarp3" && upgradeList[i].purchased === true) {
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
			if (!upgradeList[i].purchased && self.isUpgradePurchased(upgradeList[i].required)) {
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
		else if (upgrade.id == "doubleexcelia1" || upgrade.id == "doubleexcelia2") {
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
		else if (upgrade.id == "fastresting1" || upgrade.id == "fastresting2" || upgrade.id == "fastresting3") {
			buffs.setRestingMultiplier(buffs.getRestingMultiplier() * 2);
		}
		else if (upgrade.id == "musclememory1" || upgrade.id == "musclememory2") {
			buffs.setDeathPenaltyReduction(buffs.getDeathPenaltyReduction() + 1);
		}
		else if (upgrade.id == "barriercast") {
			buffs.setAutoBarrierCast(true);
		}
		else if (upgrade.id == "fasterleveling1" || upgrade.id == "fasterleveling2" || upgrade.id == "fasterleveling3") {
			buffs.setLevelingSpeedMultiplier(buffs.getLevelingSpeedMultiplier() * 2);
		}
		else if (upgrade.id == "fasterexploration1" || upgrade.id == "fasterexploration2" || upgrade.id == "fasterexploration3") {
			buffs.setExplorationSpeedMultiplier(buffs.getExplorationSpeedMultiplier() * 2);
		}
	};
};

var upgrades = new Upgrades();