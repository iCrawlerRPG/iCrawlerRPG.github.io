var System = function() {
	var ticks = 0;
	var refreshSpeed = 1000;

	var init = false;
	var idleMode = false;

	var theGame;
	var idleHealthSlider;

	var self = this;
	//Save Method
	var save = function() {
		var systemSave = {
			savedTicks: ticks
		};
		localStorage.setItem("systemSave",JSON.stringify(systemSave));
	};

	var saveAll = function() {
		save();
		player.save();
		spells.save();
		upgrades.save();
		buffs.save();
		monsters.save();
		tower.save();
	};

	//Load Method
	var load = function() {
		var systemSave = JSON.parse(localStorage.getItem("systemSave"));
		if (systemSave) {
			if (systemSave.savedTicks !== undefined) {
				ticks = systemSave.savedTicks;
			}
		}
	};

	var loadAll = function() {
		load();
		player.load();
		spells.load();
		upgrades.load();
		buffs.load();
		monsters.load();
		tower.load();
	};

	//Getters
	self.getIdleMode = function() {
		return idleMode;
	};

	//Setters

	//Other Methods
	var loadIdleHealthSlider = function() {
		idleHealthSlider = new Slider("#idleRest", {
			ticks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
			ticks_snap_bounds: 10,
			value: 100
		});
	};

	self.runGame = function() {
		theGame = window.setInterval(main, refreshSpeed);
	};

	self.gameSpeed = function(number) {
		if (idleMode) {
			refreshSpeed = number;
			theGame = window.clearInterval(theGame);
			self.runGame();
			document.getElementById("speed").innerHTML = 1000/number;
		}
	};

	self.hardReset = function() {
		theGame = window.clearInterval(theGame);
		if (confirm("Are you sure you want to wipe all your progress?")) {
			localStorage.clear();
			location.reload();
		}
		else {
			runGame();
		}
	};

	var updateTime = function(number) {
		document.getElementById("seconds").innerHTML = number % 60;
		number = Math.floor(number / 60);
		document.getElementById("minutes").innerHTML = number % 60;
		number = Math.floor(number / 60);
		document.getElementById("hours").innerHTML = number % 24;
		number = Math.floor(number / 24);
		document.getElementById("days").innerHTML = number;
	};

	var main = function() {
		if (!init) {
			startTheEngine();
		}
		ticks++;
		if (player.getResting()) {
			player.rest();
		}
		if (idleMode) {
			if (!player.getInBattle()) {
				if ((100*(player.getHealthCurrentValue()/player.getHealthMaximumValue()) >= idleHealthSlider.getValue()) && !player.getResting()) {
					tower.exploreFloor();
				}
				else if (!player.getResting() || player.isFullyRested()) {
					player.toggleRest();
				}
			}
			else {
				monsters.attackMelee();
			}
		}
		buffs.updateTemporaryBuffs(true);
		updateTime(ticks);
		saveAll();
	};

	self.toggleIdle = function() {
		if (player.getCurrentFloor() === 0) {
			return false;
		}
		if (idleMode) {
			self.gameSpeed(1000);
			idleMode = false;
			loadIdleButton();
		}
		else {
			idleMode = true;
			loadIdleButton();
		}
	};

	var startTheEngine = function() {
		loadAll();
		loadIdleHealthSlider();
		loadIdleButton();
		player.loadPlayerScreen();
		player.loadExploreButton();
		player.loadRestButton();
		spells.updateSpellbook();
		upgrades.loadExcelia();
		upgrades.updateUpgrades();
		upgrades.loadTimeUpgrades();
		buffs.updateTemporaryBuffs(false);
		buffs.updateToggleableBuffs();
		buffs.updatePermanentBuffs();
		if (player.getInBattle()) {
			monsters.loadMonsterInfo(monsters.getInstancedMonster());
		}
		tower.loadTowerScreen();
		self.gameSpeed(1000);
		init = true;
	};

	var loadIdleButton = function() {
		if (idleMode) {
			document.getElementById("idleSwitch").innerHTML = '<button class="btn btn-success" onClick="system.toggleIdle()">Idle ON</button>';
		}
		else {
			document.getElementById("idleSwitch").innerHTML = '<button class="btn btn-danger" onClick="system.toggleIdle()">Idle OFF</button>';
		}
	};
};

var Player = function() {
	var name = "Crawler";

	var health = {currentValue: 100, maximumValue: 100};
	var mana = {currentValue: 50, maximumValue: 50};
	var strength = {level: 5, experience: 0, nextLevel: 100};
	var dexterity = {level: 5, experience: 0, nextLevel: 100};
	var constitution = {level: 5, experience: 0, nextLevel: 100};
	var speed = {level: 5, experience: 0, nextLevel: 100};
	var magic = {level: 5, experience: 0, nextLevel: 100};

	var currentFloor = 0;

	var inBattle = false;
	var resting = false;

	var self = this;
	//Save Method
	self.save = function() {
		var playerSave = {
			savedName: name,
			savedHealth: health,
			savedMana: mana,
			savedStrength: strength,
			savedDexterity: dexterity,
			savedConstitution: constitution,
			savedSpeed: speed,
			savedMagic: magic,
			savedCurrentFloor: currentFloor,
			savedInBattle: inBattle
		};
		localStorage.setItem("playerSave",JSON.stringify(playerSave));
	};

	//Load Method
	self.load = function() {
		var playerSave = JSON.parse(localStorage.getItem("playerSave"));
		if (playerSave) {
			if (playerSave.savedName !== undefined) {
				name = playerSave.savedName;
			}
			else {
				name = prompt("Please, enter your name:", "Crawler");
			}
			if (playerSave.savedHealth !== undefined) {
				loadHealth(playerSave.savedHealth);
			}
			if (playerSave.savedMana !== undefined) {
				loadMana(playerSave.savedMana);
			}
			if (playerSave.savedStrength !== undefined) {
				loadStrength(playerSave.savedStrength);
			}
			if (playerSave.savedDexterity !== undefined) {
				loadDexterity(playerSave.savedDexterity);
			}
			if (playerSave.savedConstitution !== undefined) {
				loadConstitution(playerSave.savedConstitution);
			}
			if (playerSave.savedSpeed !== undefined) {
				loadSpeed(playerSave.savedSpeed);
			}
			if (playerSave.savedMagic !== undefined) {
				loadMagic(playerSave.savedMagic);
			}
			if (playerSave.savedCurrentFloor !== undefined) {
				currentFloor = playerSave.savedCurrentFloor;
			}
			if (playerSave.savedInBattle !== undefined) {
				inBattle = playerSave.savedInBattle;
			}
		}
		else {
			name = prompt("Please, enter your name:", "Crawler");
		}
	};

	var loadHealth = function(savedHealth) {
		if (savedHealth.currentValue !== undefined) {
			health.currentValue = savedHealth.currentValue;
		}
		if (savedHealth.maximumValue !== undefined) {
			health.maximumValue = savedHealth.maximumValue;
		}
	};

	var loadMana = function(savedMana) {
		if (savedMana.currentValue !== undefined) {
			mana.currentValue = savedMana.currentValue;
		}
		if (savedMana.maximumValue !== undefined) {
			mana.maximumValue = savedMana.maximumValue;
		}
	};

	var loadStrength = function(savedStrength) {
		if (savedStrength.level !== undefined) {
			strength.level = savedStrength.level;
		}
		if (savedStrength.experience !== undefined) {
			strength.experience = savedStrength.experience;
		}
		if (savedStrength.nextLevel !== undefined) {
			strength.nextLevel = savedStrength.nextLevel;
		}
	};

	var loadDexterity = function(savedDexterity) {
		if (savedDexterity.level !== undefined) {
			dexterity.level = savedDexterity.level;
		}
		if (savedDexterity.experience !== undefined) {
			dexterity.experience = savedDexterity.experience;
		}
		if (savedDexterity.nextLevel !== undefined) {
			dexterity.nextLevel = savedDexterity.nextLevel;
		}
	};

	var loadConstitution = function(savedConstitution) {
		if (savedConstitution.level !== undefined) {
			constitution.level = savedConstitution.level;
		}
		if (savedConstitution.experience !== undefined) {
			constitution.experience = savedConstitution.experience;
		}
		if (savedConstitution.nextLevel !== undefined) {
			constitution.nextLevel = savedConstitution.nextLevel;
		}
	};

	var loadSpeed = function(savedSpeed) {
		if (savedSpeed.level !== undefined) {
			speed.level = savedSpeed.level;
		}
		if (savedSpeed.experience !== undefined) {
			speed.experience = savedSpeed.experience;
		}
		if (savedSpeed.nextLevel !== undefined) {
			speed.nextLevel = savedSpeed.nextLevel;
		}
	};

	var loadMagic = function(savedMagic) {
		if (savedMagic.level !== undefined) {
			magic.level = savedMagic.level;
		}
		if (savedMagic.experience !== undefined) {
			magic.experience = savedMagic.experience;
		}
		if (savedMagic.nextLevel !== undefined) {
			magic.nextLevel = savedMagic.nextLevel;
		}
	};

	//Getters
	self.getName = function() {
		return name;
	};

	self.getInBattle = function() {
		return inBattle;
	};

	self.getResting = function() {
		return resting;
	};

	self.getCurrentFloor = function() {
		return currentFloor;
	};

	self.getHealthCurrentValue = function() {
		return health.currentValue;
	};

	self.getHealthMaximumValue = function() {
		return health.maximumValue;
	};

	self.getManaCurrentValue = function() {
		return mana.currentValue;
	};

	self.getManaMaximumValue = function() {
		return mana.maximumValue;
	};

	self.getStrengthLevel = function() {
		return strength.level;
	};

	self.getDexterityLevel = function() {
		return dexterity.level;
	};

	self.getConstitutionLevel = function() {
		return constitution.level;
	};

	self.getSpeedLevel = function() {
		return speed.level;
	};

	self.getMagicLevel = function() {
		return magic.level;
	};

	self.getStrenthExperience = function() {
		return strength.experience;
	};

	self.getDexterityExperience = function() {
		return dexterity.experience;
	};

	self.getConstitutionExperience = function() {
		return constitution.experience;
	};

	self.getSpeedExperience = function() {
		return speed.experience;
	};

	self.getMagicExperience = function() {
		return magic.experience;
	};

	//Setters
	self.setInBattle = function(boolean) {
		inBattle = boolean;
	};

	self.setCurrentFloor = function(newFloor) {
		currentFloor = newFloor;
	};

	self.setHealthCurrentValue = function(newHealth) {
		if (newHealth > health.maximumValue) {
			newHealth = health.maximumValue;
		}
		health.currentValue = newHealth;
		loadConditionScreen("hp", health);
	};

	self.setHealthMaximumValue = function(newHealth) {
		health.maximumValue = newHealth;
		loadConditionScreen("hp", health);
	};

	self.setManaCurrentValue = function(newMana) {
		if (newMana > mana.maximumValue) {
			newMana = mana.maximumValue;
		}
		mana.currentValue = newMana;
		loadConditionScreen("mp", mana);
	};

	self.setManaMaximumValue = function(newMana) {
		mana.maximumValue = newMana;
		loadConditionScreen("mp", mana);
	};

	self.setStrengthExperience = function(experience) {
		strength.experience = experience;
		while (strength.experience >= strength.nextLevel) {
			strength.experience -= strength.nextLevel;
			setStrengthLevel(strength.level+1);
		}
		loadStatScreen("str", strength);
	};

	self.setDexterityExperience = function(experience) {
		dexterity.experience = experience;
		while (dexterity.experience >= dexterity.nextLevel) {
			dexterity.experience -= dexterity.nextLevel;
			setDexterityLevel(dexterity.level+1);
		}
		loadStatScreen("dex", dexterity);
	};

	self.setConstitutionExperience = function(experience) {
		constitution.experience = experience;
		while (constitution.experience >= constitution.nextLevel) {
			constitution.experience -= constitution.nextLevel;
			setConstitutionLevel(constitution.level+1);
		}
		loadStatScreen("con", constitution);
	};

	self.setSpeedExperience = function(experience) {
		speed.experience = experience;
		while (speed.experience >= speed.nextLevel) {
			speed.experience -= speed.nextLevel;
			setSpeedLevel(speed.level+1);
		}
		loadStatScreen("spd", speed);
	};

	self.setMagicExperience = function(experience) {
		magic.experience = experience;
		while (magic.experience >= magic.nextLevel) {
			magic.experience -= magic.nextLevel;
			setMagicLevel(magic.level+1);
		}
		loadStatScreen("mgc", magic);
	};

	var setStrengthLevel = function(newLevel) {
		strength.level = newLevel;
		strength.nextLevel = neededExperience(strength.level + 1);
		loadStatScreen("str", strength);
	};

	var setDexterityLevel = function(newLevel) {
		dexterity.level = newLevel;
		dexterity.nextLevel = neededExperience(dexterity.level + 1);
		loadStatScreen("dex", dexterity);
	};

	var setConstitutionLevel = function(newLevel) {
		constitution.level = newLevel;
		constitution.nextLevel = neededExperience(constitution.level + 1);
		self.setHealthMaximumValue(Math.pow(constitution.level,2) * 4);
		loadStatScreen("con", constitution);
	};

	var setSpeedLevel = function(newLevel) {
		speed.level = newLevel;
		speed.nextLevel = neededExperience(speed.level + 1);
		loadStatScreen("spd", speed);
	};

	var setMagicLevel = function(newLevel) {
		magic.level = newLevel;
		magic.nextLevel = neededExperience(magic.level + 1);
		spells.updateSpellbook();
		self.setManaMaximumValue(Math.pow(magic.level,2) * 2);
		loadStatScreen("mgc", magic);
	};

	//Other Methods
	self.loadPlayerScreen = function() {
		document.getElementById("name").innerHTML = name;
		loadStatScreen("str", strength);
		loadStatScreen("dex", dexterity);
		loadStatScreen("con", constitution);
		loadStatScreen("spd", speed);
		loadStatScreen("mgc", magic);
		loadConditionScreen("hp", health);
		loadConditionScreen("mp", mana);
	};

	var loadStatScreen = function(statId, statName) {
		document.getElementById(statId).innerHTML = statName.level;
		document.getElementById(statId + "per").innerHTML = Math.round(100*(100*(statName.experience/statName.nextLevel)))/100 + "%";
		document.getElementById(statId + "prog").style.width = 100*(statName.experience/statName.nextLevel) + "%";
	};

	var loadConditionScreen = function(conditionId, conditionName) {
		document.getElementById(conditionId).innerHTML = Math.round(conditionName.currentValue);
		document.getElementById(conditionId + "max").innerHTML = Math.round(conditionName.maximumValue);
		document.getElementById(conditionId + "bar").style.width = 100*(conditionName.currentValue/conditionName.maximumValue) + "%";
	};

	var neededExperience = function(level) {
		return ((Math.pow(level, 2) + level) * 3);
	};

	self.rest = function() {
		if (resting) {
			self.setHealthCurrentValue(health.currentValue + constitution.level);
			self.setManaCurrentValue(mana.currentValue + magic.level);
			if (self.isFullyRested()) {
				self.toggleRest();
			}
		}
	};

	self.isFullyRested = function() {
		if (health.currentValue == health.maximumValue && mana.currentValue == mana.maximumValue) {
			return true;
		}
		return false;
	};

	self.loadExploreButton = function() {
		if (currentFloor !== 0) {
			if (inBattle || resting) {
				if (tower.floorExplorationComplete(currentFloor)) {
					document.getElementById("exploreButton").innerHTML = '<button class="btn btn-danger btn-block" disabled="disabled">Find Monster</button>';
				}
				else {
					document.getElementById("exploreButton").innerHTML = '<button class="btn btn-danger btn-block" disabled="disabled">Explore</button>';
				}
			}
			else {
				if (tower.floorExplorationComplete(currentFloor)) {
					document.getElementById("exploreButton").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.exploreFloor()">Find Monster</button>';
				}
				else {
					document.getElementById("exploreButton").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.exploreFloor()">Explore</button>';
				}
			}
		}
		else {
			document.getElementById("exploreButton").innerHTML = '';
		}
	};

	self.loadRestButton = function() {
		if (currentFloor !== 0) {
			if (inBattle) {
				document.getElementById("restButton").innerHTML = '<button class="btn btn-danger btn-block" disabled="disabled">Rest</button>';
			}
			else if (resting) {
				document.getElementById("restButton").innerHTML = '<button class="btn btn-success btn-block" onClick="player.toggleRest()">Stop Resting</button>';
			}
			else {
				document.getElementById("restButton").innerHTML = '<button class="btn btn-default btn-block" onClick="player.toggleRest()">Rest</button>';
			}
		}
		else {
			document.getElementById("restButton").innerHTML = '';
		}
	};

	self.gainExperience = function(monster) {
		self.setStrengthExperience(strength.experience + (monster.strength/strength.level));
		self.setDexterityExperience(dexterity.experience + (monster.dexterity/dexterity.level));
		self.setConstitutionExperience(constitution.experience + (monster.constitution/constitution.level));
	};

	self.death = function(monster) {
		inBattle = false;
		document.getElementById("combatlog").innerHTML += "You have been defeated by the " + monster.name + "!";
		if (system.getIdleMode()) {
			system.toggleIdle();
		}
		tower.changeFloor(-currentFloor);
		upgrades.updateExcelia(-((100 - buffs.getExceliaSavedOnDeath()) * upgrades.getExcelia())/100);
		loseStats(10);
		loseAllExperience();
		monsters.loadMonsterInfo();
		spells.updateSpellbook();
		player.toggleRest();
	};

	var loseStats = function(percentage) {
		setStrengthLevel(strength.level - Math.floor(strength.level/percentage));
		setDexterityLevel(dexterity.level - Math.floor(dexterity.level/percentage));
		setConstitutionLevel(constitution.level - Math.floor(constitution.level/percentage));
		setSpeedLevel(speed.level - Math.floor(speed.level/percentage));
		setMagicLevel(magic.level - Math.floor(magic.level/percentage));
	};

	var loseAllExperience = function() {
		self.setStrengthExperience(0);
		self.setDexterityExperience(0);
		self.setConstitutionExperience(0);
		self.setSpeedExperience(0);
		self.setMagicExperience(0);
	};

	self.toggleRest = function() {
		resting = !resting;
		self.loadRestButton();
		self.loadExploreButton();
	};
};

var Spells = function() {
	var arcania = 0;

	var spellbook = [];
	spellbook.push({name: "Cure",
		id: "cure",
		type: 0,
		requiredMagic: 5,
		learned: true,
		baseMana: 15,
		experience: 0,
		nextLevel: 150,
		baseNextLevel: 150,
		level: 0,
		description:""});

	spellbook.push({name: "Fireball",
		id: "fireball",
		type: 1,
		requiredMagic: 5,
		learned: true,
		baseMana: 10,
		experience: 0,
		nextLevel: 100,
		baseNextLevel: 100,
		level: 0,
		description:""});

	spellbook.push({name: "Barrier",
		id: "barrier",
		type: 0,
		requiredMagic: 10,
		learned: false,
		baseMana: 100,
		experience: 0,
		nextLevel: 1000,
		baseNextLevel: 1000,
		level: 0,
		description: ""});

	spellbook.push({name: "Slow",
		id: "slow",
		type: 2,
		requiredMagic: 20,
		learned: false,
		baseMana: 400,
		experience: 0,
		next: 4000,
		baseNextLevel: 4000,
		level: 0,
		description: ""});

	spellbook.push({name: "Rage",
		id: "rage",
		type: 1,
		requiredMagic: 25,
		learned: false,
		baseMana: 1250,
		experience: 0,
		next: 12500,
		baseNextLevel: 12500,
		level: 0,
		description: ""});

	spellbook.push({name: "Aegis",
		id: "aegis",
		type: 0,
		requiredMagic: 50,
		learned: false,
		baseMana: 5000,
		experience: 0,
		next: 50000,
		baseNextLevel: 50000,
		level: 0,
		description: ""});

	var self = this;
  	//Save Method
	self.save = function() {
		var spellsSave = {
			savedArcania: arcania,
			savedSpellbook: spellbook
		};
		localStorage.setItem("spellsSave",JSON.stringify(spellsSave));
	};

	//Load Method
	self.load = function() {
		var spellsSave = JSON.parse(localStorage.getItem("spellsSave"));
		if (spellsSave) {
			if (spellsSave.savedArcania !== undefined) {
				arcania = spellsSave.savedArcania;
			}
			if (spellsSave.savedSpellbook !== undefined) {
				loadSpellbook(spellsSave.savedSpellbook);
			}
		}
	};

	var loadSpellbook = function(savedSpellbook) {
		for(var i = 0; i < savedSpellbook.length; i++) {
			if (i == spellbook.length) {
				break;
			}
			if (savedSpellbook[i].learned !== undefined) {
				spellbook[i].learned = savedSpellbook[i].learned;
			}
			if (savedSpellbook[i].experience !== undefined) {
				spellbook[i].experience = savedSpellbook[i].experience;
			}
			if (savedSpellbook[i].nextLevel !== undefined) {
				spellbook[i].nextLevel = savedSpellbook[i].nextLevel;
			}
			if (savedSpellbook[i].level !== undefined) {
				spellbook[i].level = savedSpellbook[i].level;
			}
		}
	};

	//Getters

	//Setters

	//Other Methods
	var updateSpellDescriptions = function() {
		for (var i = 0; i < spellbook.length; i++) {
			if (spellbook[i].id == "cure") {
			spellbook[i].description = "Heal " + curePotency(spellbook[i]) + " HP";
			}
			else if (spellbook[i].id == "fireball") {
				spellbook[i].description = "Deal " + fireballPotency(spellbook[i]) + " fire damage.";
			}
			else if (spellbook[i].id == "barrier") {
				spellbook[i].description = "Put up a barrier that will protect you from " + barrierPotency(spellbook[i]) + " damage.";
			}
			else if (spellbook[i].id == "aegis") {
				spellbook[i].description = "Take no damage for " + aegisPotency(spellbook[i]) + " seconds.";
			}
			else if (spellbook[i].id == "slow") {
				spellbook[i].description = "Halve an enemy's DEX.";
			}
			else if (spellbook[i].id == "rage") {
				spellbook[i].description = "Fill yourself with rage for " + ragePotency(spellbook[i]) + " seconds. You deal 5x damage, however, you take 2x damage and cannot cast other spells.";
			}
		}
	};

	var spellType = function(type) {
		if (type === 0) {
			return "btn-info";
		}
		else if (type == 1) {
			return "btn-danger";
		}
		else if (type == 2) {
			return "btn-warning";
		}
		else if (type == 3) {
			return "btn-success";
		}
	};

	var findSpell = function(spellId) {
		for (var i = 0; i < spellbook.length; i++) {
			if (spellbook[i].id == spellId) {
				return i;
			}
		}
	};

	var spellCost = function(spell) {
    var i;
		var cost = spell.baseMana;
		if (spell.type == 2) {
			for (i = 0; i < spell.level; i++) {
				cost -= 0.1 * cost;
			}
			if (cost <= 10) {
				cost = 10;
			}
		}
		else {
			for (i = 0; i < spell.level; i++) {
				cost += 0.1 * cost;
			}
		}
		return Math.round(cost);
	};

	var levelSpell = function(spell, experience) {
		spell.experience += experience;
		while (spell.experience >= spell.nextLevel) {
			spell.level++;
			spell.experience -= spell.nextLevel;
			spell.nextLevel = Math.pow(2, spell.level) * spell.baseNextLevel;
			self.updateSpellbook();
		}
		updateSpellHtml(spell);
	};

	self.updateSpellbook = function() {
		document.getElementById("spellbook").innerHTML = '';
		for (var i = 0; i <= 3; i++) {
			document.getElementById("spellbook" + i).innerHTML = '';
		}
		updateSpellDescriptions();
		for (i = 0; i < spellbook.length; i++) {
			if (player.getMagicLevel() >= spellbook[i].requiredMagic) {
				var spellColor = spellType(spellbook[i].type);

				document.getElementById("spellbook").innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xpall" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%;"><span id="' + spellbook[i].id + 'progall">' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'levelall">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'costall">0</span></p></div></div>';
				document.getElementById("spellbook" + spellbook[i].type).innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xp" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%;"><span id="' + spellbook[i].id + 'prog">' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'level">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'cost">0</span></p></div></div>';
				spellbook[i].learned = true;
				updateSpellHtml(spellbook[i]);
			}
		}

		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	};

	var updateSpellHtml = function(spell) {
		document.getElementById(spell.id + "costall").innerHTML = Math.floor(spell.baseMana + Math.pow(spell.level, 2));
		document.getElementById(spell.id + "cost").innerHTML = Math.floor(spell.baseMana + Math.pow(spell.level, 2));
		document.getElementById(spell.id + "xpall").style.width = 100*(spell.experience/spell.nextLevel) + "%";
		document.getElementById(spell.id + "progall").innerHTML = Math.round(100 * (100 * (spell.experience/spell.nextLevel)))/100 + "%";
		document.getElementById(spell.id + "levelall").innerHTML = spell.level;
		document.getElementById(spell.id + "xp").style.width = 100*(spell.experience/spell.nextLevel) + "%";
		document.getElementById(spell.id + "prog").innerHTML = Math.round(100 * (100 * (spell.experience/spell.nextLevel)))/100 + "%";
		document.getElementById(spell.id + "level").innerHTML = spell.level;
	};

	self.castSpell = function(spellId) {
		var spell = findSpell(spellId);
		var manaCost = spellCost(spellbook[spell]);

		if (player.getManaCurrentValue() >= manaCost && buffs.getRageTimeLeft() === 0 && !player.getResting()) {
			var castSuccessful;
			if (spellbook[spell].id == "cure") {
				castSuccessful = castCure(spellbook[spell]);
			}
			else if (spellbook[spell].id == "fireball") {
				castSuccessful = castFireball(spellbook[spell]);
			}
			else if (spellbook[spell].id == "barrier") {
				castSuccessful = castBarrier(spellbook[spell]);
			}
			else if (spellbook[spell].id == "slow") {
				castSuccessful = castSlow(spellbook[spell]);
			}
			else if (spellbook[spell].id == "aegis") {
				castSuccessful = castAegis(spellbook[spell]);
			}
			else if (spellbook[spell].id == "rage") {
				castSuccessful = castRage(spellbook[spell]);
			}

			if (castSuccessful) {
				player.setManaCurrentValue(player.getManaCurrentValue() - manaCost);
				levelSpell(spellbook[spell], buffs.getSpellLevelingMultiplier() * manaCost);
				player.setMagicExperience(player.getMagicExperience() + spellbook[spell].level + 1 + manaCost/10);
				return true;
			}
		}

		return false;
	};

	var castCure = function(cure) {
    var currentHealth = player.getHealthCurrentValue();
		var maximumHealth = player.getHealthMaximumValue();
		if (currentHealth == maximumHealth) {
			return false;
		}
		else {
			var cureValue = curePotency(cure);
			if (maximumHealth - currentHealth < cureValue) {
				cureValue = maximumHealth - currentHealth;
			}
			player.setHealthCurrentValue(currentHealth + cureValue);
			if (player.getInBattle()) {
				document.getElementById("combatlog").innerHTML = '';
				document.getElementById("combatlog").innerHTML += "You healed yourself for " + Math.round(cureValue) + " HP with Cure.<br>";
				monsters.battle(monsters.getInstancedMonster(), true);
			}
			return true;
		}
	};

	var curePotency = function(cure) {
		var cureBasePotency = 25;
		var cureLevelPotency = Math.pow(1.5, cure.level);
		var cureMagicPotency = Math.pow(1.1, player.getMagicLevel() - 5) - 1;
		return Math.floor(cureBasePotency * cureLevelPotency + cureMagicPotency);
	};

	var castFireball = function(fireball) {
		if (!player.getInBattle()) {
			return false;
		}
		else {
			var monster = monsters.getInstancedMonster();
			var fireballDamage = fireballPotency(fireball);
			if (monster.currentHealth <= fireballDamage) {
				fireballDamage = monster.currentHealth;
			}
			document.getElementById("combatlog").innerHTML = '';
			document.getElementById("combatlog").innerHTML += "Your fireball hit the " + monster.name + " for " + Math.floor(fireballDamage) + " damage.<br>";
			if (!monsters.monsterTakeDamage(monsters.getInstancedMonster(), fireballDamage)) {
				monsters.battle(monsters.getInstancedMonster(), true);
			}
			return true;
		}
	};

	var fireballPotency = function(fireball) {
		var fireballBasePotency = 15;
		var fireballLevelPotency = Math.pow(1.5, fireball.level);
		var fireballMagicPotency = Math.pow(1.1, player.getMagicLevel() - 5) - 1;
		return Math.floor(fireballBasePotency * fireballLevelPotency + fireballMagicPotency);
	};

	var castBarrier = function(barrier) {
		var barrierValue = barrierPotency(barrier);
		if (buffs.getBarrierLeft() == barrierValue) {
			return false;
		}
		else {
			buffs.setBarrierLeft(barrierValue);
			buffs.updateTemporaryBuffs(false);
			if (player.getInBattle()) {
				document.getElementById("combatlog").innerHTML = '';
				document.getElementById("combatlog").innerHTML += "You created a magical barrier.<br>";
				monsters.battle(monsters.getInstancedMonster(), true);
			}
			return true;
		}
	};

	var barrierPotency = function(barrier) {
		var barrierBasePotency = 50;
		var barrierLevelPotency = 50 * barrier.level;
		var barrierMagicPotency = (10 * (player.getMagicLevel() - 10));
		return Math.floor(barrierBasePotency + barrierLevelPotency + barrierMagicPotency);
	};

	var castAegis = function(aegis) {
		if (buffs.getAegisTimeLeft !== 0) {
			return false;
		}
		else {
			buffs.setAegisTimeLeft(aegisPotency(aegis));
			buffs.updateTemporaryBuffs(false);
			if (player.getInBattle()) {
				document.getElementById("combatlog").innerHTML = '';
				document.getElementById("combatlog").innerHTML += "You summon the heavenly shield, Aegis.<br>";
				monsters.battle(monsters.getInstancedMonster(), true);
			}
			return true;
		}
	};

	var aegisPotency = function(aegis) {
		var aegisBasePotency = 5;
		var aegisLevelPotency = 5 * aegis.level;
		var aegisMagicPotency = player.getMagicLevel() - 50;
		return Math.floor(aegisBasePotency + aegisLevelPotency + aegisMagicPotency);
	};

	var castSlow = function(slow) {
		var monster = monsters.getInstancedMonster();
		if (!player.getInBattle() && monster.status !== 0) {
			return false;
		}
		else {
			monster.status = 1;
			monster.dexterity = monster.dexterity/2;
			document.getElementById("monsterdex").innerHTML = monster.dexterity;
			document.getElementById("combatlog").innerHTML = '';
			document.getElementById("combatlog").innerHTML += "You have cast slow on the " + monster.name + ". Its DEX has been halved.<br>";
			monsters.setInstancedMonster(monster);
			monsters.battle(monsters.getInstancedMonster(), true);
			return true;
		}
	};

	var castRage = function(rage) {
		if (!player.getInBattle()) {
			return false;
		}
		else {
			buffs.setRageTimeLeft(ragePotency(rage));
			buffs.updateTemporaryBuffs(false);
			document.getElementById("combatlog").innerHTML = '';
			document.getElementById("combatlog").innerHTML += "You have entered a state of frenzy!<br>";
			monsters.battle(monsters.getInstancedMonster(), true);
			return true;
		}
	};

	var ragePotency = function(rage) {
		var rageBasePotency = 5;
		var rageLevelPotency = rage.level;
		var rageMagicPotency = (0.2 * (player.getMagicLevel() - 25));
		return Math.floor(rageBasePotency + rageLevelPotency + rageMagicPotency);
	};
};

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

var Buffs = function() {
	//Multipliers
	var exceliaMultiplier = 1;
	var spellLevelingMultiplier = 1;

	//Adders
	var manaPerSecond = 0;

	//Percenters
	var exceliaSavedOnDeath = 0;

	//Toggleables
	var castCureInBattle = false;
	var castFireballInBattle = false;

	//Timed Buffs
	var aegisTimeLeft = 0;
	var rageTimeLeft = 0;

	//Non-timed Temporary Buffs
	var barrierLeft = 0;

	var self = this;
	//Save Method
	self.save = function() {
		var buffsSave = {
			savedExceliaMultiplier: exceliaMultiplier,
			savedSpellLevelingMultiplier: spellLevelingMultiplier,
			savedManaPerSecond: manaPerSecond,
			savedExceliaSavedOnDeath: exceliaSavedOnDeath,
			savedCastCureInBattle: castCureInBattle,
			savedCastFireballInBattle: castFireballInBattle,
			savedAegisTimeLeft: aegisTimeLeft,
			savedRageTimeLeft: rageTimeLeft,
			savedBarrierLeft: barrierLeft
		};
		localStorage.setItem("buffsSave",JSON.stringify(buffsSave));
	};

	//Load Method
	self.load = function() {
		var buffsSave = JSON.parse(localStorage.getItem("buffsSave"));
		if (buffsSave) {
			loadMultiplierBuffs(buffsSave);
			loadAdderBuffs(buffsSave);
			loadPercenterBuffs(buffsSave);
			loadToggleableBuffs(buffsSave);
			loadTimedBuffs(buffsSave);
			loadTemporaryBuffs(buffsSave);
		}
	};

	var loadMultiplierBuffs = function(buffsSave) {
		if (buffsSave.savedExceliaMultiplier !== undefined) {
			exceliaMultiplier = buffsSave.savedExceliaMultiplier;
		}
		if (buffsSave.savedSpellLevelingMultiplier !== undefined) {
			spellLevelingMultiplier = buffsSave.savedSpellLevelingMultiplier;
		}
	};

	var loadAdderBuffs = function(buffsSave) {
		if (buffsSave.savedManaPerSecond !== undefined) {
			manaPerSecond = buffsSave.savedManaPerSecond;
		}
	};

	var loadPercenterBuffs = function(buffsSave) {
		if (buffsSave.savedExceliaSavedOnDeath !== undefined) {
			exceliaSavedOnDeath = buffsSave.savedExceliaSavedOnDeath;
		}
	};

	var loadToggleableBuffs = function(buffsSave) {
		if (buffsSave.savedCastCureInBattle !== undefined) {
			castCureInBattle = buffsSave.savedCastCureInBattle;
		}
		if (buffsSave.savedCastFireballInBattle !== undefined) {
			castFireballInBattle = buffsSave.savedCastFireballInBattle;
		}
	};

	var loadTimedBuffs = function(buffsSave) {
		if (buffsSave.savedAegisTimeLeft !== undefined) {
			aegisTimeLeft = buffsSave.savedAegisTimeLeft;
		}
		if (buffsSave.savedRageTimeLeft !== undefined) {
			rageTimeLeft = buffsSave.savedRageTimeLeft;
		}
	};

	var loadTemporaryBuffs = function(buffsSave) {
		if (buffsSave.savedBarrierLeft !== undefined) {
			barrierLeft = buffsSave.savedBarrierLeft;
		}
	};

	//Getters
	self.getCastFireballInBattle = function() {
		return castFireballInBattle;
	};

	self.getRageTimeLeft = function() {
		return rageTimeLeft;
	};

	self.getSpellLevelingMultiplier = function() {
		return spellLevelingMultiplier;
	};

	self.getBarrierLeft = function() {
		return barrierLeft;
	};

	self.getAegisTimeLeft = function() {
		return aegisTimeLeft;
	};

	self.getCastCureInBattle = function() {
		return castCureInBattle;
	};

	self.getExceliaMultiplier = function() {
		return exceliaMultiplier;
	};

	self.getManaPerSecond = function() {
		return manaPerSecond;
	};

	self.getExceliaSavedOnDeath = function() {
		return exceliaSavedOnDeath;
	};

	//Setters
	self.setBarrierLeft = function(barrierValue) {
		barrierLeft = barrierValue;
	};

	self.setAegisTimeLeft = function(aegisTime) {
		aegisTimeLeft = aegisTime;
	};

	self.setRageTimeLeft = function(rageTime) {
		rageTimeLeft = rageTime;
	};

	self.setManaPerSecond = function(newManaPerSecond) {
		manaPerSecond = newManaPerSecond;
	};

	self.setCastCureInBattle = function(boolean) {
		castCureInBattle = boolean;
	};

	self.setExceliaMultiplier = function(newMultiplier) {
		exceliaMultiplier = newMultiplier;
	};

	self.setSpellLevelingMultiplier = function(newMultiplier) {
		spellLevelingMultiplier = newMultiplier;
	};

	self.setExceliaSavedOnDeath = function(newPercentage) {
		exceliaSavedOnDeath = newPercentage;
	};

	self.setCastFireballInBattle = function(boolean) {
		castFireballInBattle = boolean;
	};

	//Other Methods
	self.updateTemporaryBuffs = function(decrease) {
		document.getElementById("temporary").innerHTML = '';

		if (aegisTimeLeft !== 0) {
			if (decrease) {
				aegisTimeLeft--;
			}
			document.getElementById("temporary").innerHTML += '<li class="list-group-item list-group-item-info"><span class="badge">' + Math.round(aegisTimeLeft) + '</span>Aegis</li>';
		}

		if (barrierLeft !== 0) {
			document.getElementById("temporary").innerHTML += '<li class="list-group-item list-group-item-info"><span class="badge">' + Math.round(barrierLeft) + '</span>Barrier</li>';
		}

		if (rageTimeLeft !== 0) {
			if (decrease) {
				rageTimeLeft--;
			}
			document.getElementById("temporary").innerHTML += '<li class="list-group-item list-group-item-info"><span class="badge">' + Math.round(rageTimeLeft) + '</span>Rage</li>';
		}
	};

	self.updateToggleableBuffs = function() {
		document.getElementById("toggleable").innerHTML = '';
		var toggleStatusText;

		if (castFireballInBattle || upgrades.isUpgradePurchased("autoshoot")) {
			if (castFireballInBattle) {
				toggleStatusText = "ON";
			}
			else {
				toggleStatusText = "OFF";
			}
			document.getElementById("toggleable").innerHTML += '<button type="button" class="list-group-item" onClick="buffs.toggleBuff(\'castFireballInBattle\')"><span class="badge">' + toggleStatusText + '</span>Auto-Shooting</button>';
		}

		if (castCureInBattle || upgrades.isUpgradePurchased("battlehealing")) {
			if (castCureInBattle) {
				toggleStatusText = "ON";
			}
			else {
				toggleStatusText = "OFF";
			}
			document.getElementById("toggleable").innerHTML += '<button type="button" class="list-group-item" onClick="buffs.toggleBuff(\'castCureInBattle\')"><span class="badge">' + toggleStatusText + '</span>Battle Healing</button>';
		}
	};

	self.updatePermanentBuffs = function() {
		document.getElementById("permanent").innerHTML = '';
		if (exceliaMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + exceliaMultiplier + '</span>Excelia Gain</li>';
		}
		if (exceliaSavedOnDeath !== 0) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">' + exceliaSavedOnDeath + '%</span>Excelia Saved Upon Death</li>';
		}
		if (manaPerSecond !== 0) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">+' + manaPerSecond + '</span>Exploration Mana per Second</li>';
		}
		if (spellLevelingMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + spellLevelingMultiplier + '</span>Spell Level Gain</li>';
		}
	};

	self.toggleBuff = function(buffId) {
		if (buffId == "castCureInBattle") {
			castCureInBattle = !castCureInBattle;
		}
		else if (buffId == "castFireballInBattle") {
			castFireballInBattle = !castFireballInBattle;
		}
		self.updateToggleableBuffs();
	};
};

var Monsters = function() {
	var monsterList = [
		//First Tier
		{name:"Rat", killed:0},
		{name:"Bat", killed:0},
		{name:"Slime", killed:0},
		{name:"Kobold", killed:0},
		{name:"Wolf", killed:0},
		{name:"Lizard", killed:0},
		{name:"Goblin", killed:0},
		{name:"Bandit", killed:0},
		{name:"Spider", killed:0},
		{name:"Eagle", killed:0},

		//Second Tier
		{name:"Bear", killed:0},
		{name:"Snake", killed:0},
		{name:"Troll", killed:0},
		{name:"Kobold Warrior", killed:0},
		{name:"Giant Wolf", killed:0},
		{name:"Ghoul", killed:0},
		{name:"Alligator", killed:0},
		{name:"Giant Lizard", killed:0},
		{name:"Giant Rat", killed: 0},
		{name:"Orc Child", killed:0}
	];

	var instancedMonster = {
		name: "",
		currentHealth: 0,
		maximumHealth: 0,
		strength: 0,
		dexterity: 0,
		constitution: 0,
		status: 0
	};

	var self = this;
	//Save Method
	self.save = function() {
		var monstersSave = {
			savedMonsterList: monsterList,
			savedInstancedMonster: instancedMonster
		};
		localStorage.setItem("monstersSave",JSON.stringify(monstersSave));
	};

	//Load Method
	self.load = function() {
		var monstersSave = JSON.parse(localStorage.getItem("monstersSave"));
		if (monstersSave) {
			if (monstersSave.savedMonsterList !== undefined) {
				loadMonsterList(monstersSave.savedMonsterList);
			}
			if (monstersSave.savedInstancedMonster !== undefined) {
				loadInstancedMonster(monstersSave.savedInstancedMonster);
			}
		}
	};

	var loadMonsterList = function(savedMonsterList) {
		for (var i = 0; i < savedMonsterList.length; i++) {
			if (i == monsterList.length) {
				break;
			}
			if (savedMonsterList[i].killed !== undefined) {
				monsterList[i].killed = savedMonsterList[i].killed;
			}
		}
	};

	var loadInstancedMonster = function(savedInstancedMonster) {
		if (savedInstancedMonster.name !== undefined) {
			instancedMonster.name = savedInstancedMonster.name;
		}
		if (savedInstancedMonster.currentHealth !== undefined) {
			instancedMonster.currentHealth = savedInstancedMonster.currentHealth;
		}
		if (savedInstancedMonster.maximumHealth !== undefined) {
			instancedMonster.maximumHealth = savedInstancedMonster.maximumHealth;
		}
		if (savedInstancedMonster.strength !== undefined) {
			instancedMonster.strength = savedInstancedMonster.strength;
		}
		if (savedInstancedMonster.dexterity !== undefined) {
			instancedMonster.dexterity = savedInstancedMonster.dexterity;
		}
		if (savedInstancedMonster.constitution !== undefined) {
			instancedMonster.constitution = savedInstancedMonster.constitution;
		}
		if (savedInstancedMonster.status !== undefined) {
			instancedMonster.status = savedInstancedMonster.status;
		}
	};

	//Getters
	self.getMonsterList = function() {
		return monsterList;
	};

	self.getInstancedMonster = function() {
		return instancedMonster;
	};

	//Setters
	self.setInstancedMonster = function(updatedMonster) {
		instancedMonster = updatedMonster;
	};

	//Other Methods
	self.attackMelee = function() {
		if(player.getInBattle()) {
			self.battle(instancedMonster, false);
		}
	};

	self.loadMonsterInfo = function(monster) {
		if (monster !== undefined) {
			document.getElementById("monstername").innerHTML = monster.name;
			document.getElementById("monsterhp").innerHTML = Math.round(monster.currentHealth);
			document.getElementById("monsterstr").innerHTML = monster.strength;
			document.getElementById("monsterdex").innerHTML = monster.dexterity;
			document.getElementById("monstercon").innerHTML = monster.constitution;
			document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
			document.getElementById("combatlog").innerHTML = "You are attacked by a " + monster.name + "!<br>";
			player.setInBattle(true);
		}
		else {
			document.getElementById("monstername").innerHTML = "None";
			document.getElementById("monsterhp").innerHTML = "0";
			document.getElementById("monsterstr").innerHTML = "0";
			document.getElementById("monsterdex").innerHTML = "0";
			document.getElementById("monstercon").innerHTML = "0";
			document.getElementById("monsterbar").style.width = "0%";
		}
	};

	self.battle = function(monster, spellCast) {
		if(!player.getInBattle()) {
			player.setInBattle(true);
			player.loadRestButton();
			player.loadExploreButton();
			self.loadMonsterInfo(monster);
			if (buffs.getCastFireballInBattle()) {
				spells.castSpell("fireball");
			}
		}
		else {
			var isDead = false;
			if (!spellCast) {
				document.getElementById("combatlog").innerHTML = '';
				if (buffs.getCastCureInBattle() && player.getHealthCurrentValue() <= player.getHealthMaximumValue()/2) {
					if (!spells.castSpell("cure")) {
						isDead = playerAttacks(monster);
					}
					else {
						return true;
					}
				}
				else {
					isDead = playerAttacks(monster);
				}
			}
			if (!isDead) {
				isDead = monsterAttacks(monster);
				if (!isDead) {
					player.gainExperience(monster);
				}
			}
		}
	};

	var playerAttacks = function(monster) {
		var damage = damageFormula(player.getStrengthLevel(), player.getDexterityLevel(), monster.constitution, monster.currentHealth);
		if (buffs.getRageTimeLeft() !== 0) {
			damage *= 5;
		}
		if (damage >= monster.currentHealth) {
			damage = monster.currentHealth;
		}
		document.getElementById("combatlog").innerHTML += "You dealt " + Math.round(damage) + " damage to the " + monster.name + ".<br>";
		return self.monsterTakeDamage(monster, damage);
	};

	self.monsterTakeDamage = function(monster, damage) {
		monster.currentHealth -= damage;
		document.getElementById("monsterhp").innerHTML = Math.floor(monster.currentHealth);
		document.getElementById("monsterbar").style.width = 100*(monster.currentHealth/monster.maximumHealth) + "%";
		if (monster.currentHealth <= 0) {
			monsterDeath(monster);
			return true;
		}
		return false;
	};

	var monsterDeath = function(monster) {
		player.setInBattle(false);
		document.getElementById("combatlog").innerHTML += "You have defeated the " + monster.name + "!";
		updateMonsterKilled(monster.name);
		upgrades.gainExcelia(monster);
		player.loadRestButton();
		player.loadExploreButton();
		self.loadMonsterInfo();
	};

	var updateMonsterKilled = function(name) {
		for (var i = 0; i < monsterList.length; i++) {
			if (monsterList[i].name == name) {
				monsterList[i].killed++;
			}
		}
	};

	var damageFormula = function(attackerStrength, attackerDexterity, defenderConstitution, defenderHealth) {
		var strengthWeigth = 2;
		var dexterityWeigth = 0.1;
		var constitutionWeigth = 0.5;
		var damage = ((attackerStrength * strengthWeigth) - (defenderConstitution * constitutionWeigth)) * (attackerDexterity * dexterityWeigth);

		if (damage < 0) {
			damage = 0;
		}
		else if (damage > defenderHealth) {
			damage = defenderHealth;
		}
		return damage;
	};

	var monsterAttacks = function(monster) {
		var damage = damageFormula(monster.strength, monster.dexterity, player.getConstitutionLevel(), player.getHealthCurrentValue());
		if (buffs.getAegisTimeLeft() === 0) {
			var barrier = buffs.getBarrierLeft();
			if (barrier > 0) {
				if (barrier >= damage) {
					buffs.setBarrierLeft(barrier - damage);
					document.getElementById("combatlog").innerHTML += "Your barrier absorbed " + Math.round(damage) + " damage from " + monster.name + "'s attack.<br>";
					buffs.updateTemporaryBuffs(false);
					return false;
				}
				else {
					document.getElementById("combatlog").innerHTML += "Your barrier absorbed " + Math.round(barrier) + " damage from " + monster.name + "'s attack.<br>";
					document.getElementById("combatlog").innerHTML += "Your barrier has shattered.<br>";
					damage -= barrier;
					buffs.setBarrierLeft(0);
					buffs.updateTemporaryBuffs(false);
				}
			}
			player.setHealthCurrentValue(player.getHealthCurrentValue() - damage);
			document.getElementById("combatlog").innerHTML += "You took " + Math.round(damage) + " damage from the " + monster.name + "'s attack.<br>";
			if (player.getHealthCurrentValue() === 0) {
				player.death(monster);
				return true;
			}
		}
		else {
			document.getElementById("combatlog").innerHTML += "Aegis absorbed " + Math.round(damage) + " damage from " + monster.name + "'s attack.<br>";
		}
		return false;
	};

	self.battleChance = function(boolean) {
		if (boolean) {
			rollMonster();
			return true;
		}
		else {
			var check = Math.random()*100;
			if (check <= tower.getFloorMonsterDensity(player.getCurrentFloor())) {
				rollMonster();
				return true;
			}
			return false;
		}
	};

	var rollMonster = function() {
		var tier = Math.floor((player.getCurrentFloor()-1)/10);
		var monster = Math.floor(Math.random()*10);
		while(monster == 10) {
			monster = Math.floor(Math.random()*10);
		}
		instancedMonster = createMonster((tier*10) + monster);
		self.battle(instancedMonster, false);
	};

	var createMonster = function(number) {
		var tempMonster = {name: "", currentHealth: 0, maximumHealth:0 , strength: 0, dexterity: 0, constitution: 0, status: 0};
		var statPool = Math.round((player.getCurrentFloor() * 15) + Math.pow(1.1, player.getCurrentFloor() - 1) - 1);
		tempMonster.name = monsterList[number].name;
		tempMonster.strength++;
		tempMonster.dexterity++;
		tempMonster.constitution++;
		statPool -= 3;
		distributeStats(tempMonster, statPool);
		tempMonster.maximumHealth = calculateHealth(tempMonster.constitution);
		tempMonster.currentHealth = tempMonster.maximumHealth;
		return tempMonster;
	};

	var distributeStats = function(monster, statPool) {
		var choice;
		while (statPool !== 0) {
			choice = Math.floor(Math.random()*3);
			while (choice == 3) {
				choice = Math.floor(Math.random()*3);
			}
			if (choice === 0) {
				monster.strength++;
			}
			else if (choice == 1) {
				monster.dexterity++;
			}
			else if (choice == 2) {
				monster.constitution++;
			}
			statPool--;
		}
	};

	var calculateHealth = function(constitution) {
		return (Math.pow(constitution, 2) * 4);
	};

	self.runAway = function() {
		if (player.getInBattle()) {
			document.getElementById("combatlog").innerHTML = "";
			var runRoll = Math.random() * (instancedMonster.strength + instancedMonster.dexterity + instancedMonster.constitution);
			if (runRoll < player.getSpeedLevel()) {
				document.getElementById("combatlog").innerHTML += "You escaped from the battle against " + instancedMonster.name + ".";
				self.loadMonsterInfo();
				player.setSpeedExperience(player.getSpeedExperience() + runRoll);
				player.setInBattle(false);
				player.loadExploreButton();
				player.loadRestButton();
			}
			else {
				document.getElementById("combatlog").innerHTML += "You failed to run away.<br>";
				self.battle(instancedMonster, true);
			}
		}
	}
};

var Tower = function() {
	var floors = [];
	for (var i = 0; i < monsters.getMonsterList().length; i++) {
		if (i === 0) {
			floors.push({size: 100, explored: 100, canAdvance: true, stairsPosition: 0, monsterDensity: 0});
		}
		else {
			floors.push({size: Math.floor(2*floors[i-1].size),
				explored: 0,
				canAdvance: false,
				stairsPosition: Math.floor(Math.random() * Math.floor(2*floors[i-1].size)),
				monsterDensity: 10 + Math.random()*40});
		}
	}

	var self = this;
	//Save Method
	self.save = function() {
		var towerSave = {
			savedFloors: floors
		};
		localStorage.setItem("towerSave",JSON.stringify(towerSave));
	};

	//Load Method
	self.load = function() {
		var towerSave = JSON.parse(localStorage.getItem("towerSave"));
		if (towerSave) {
			if (towerSave.savedFloors !== undefined) {
				loadFloors(towerSave.savedFloors);
			}
		}
	};

	var loadFloors = function(savedFloors) {
		for (var i = 0; i < savedFloors.length; i++) {
			if (i == floors.length) {
				break;
			}
			if (savedFloors[i].explored !== undefined) {
				floors[i].explored = savedFloors[i].explored;
			}
			if (savedFloors[i].canAdvance !== undefined) {
				floors[i].canAdvance = savedFloors[i].canAdvance;
			}
			if (savedFloors[i].stairsPosition !== undefined) {
				floors[i].stairsPosition = savedFloors[i].stairsPosition;
			}
			if (savedFloors[i].monsterDensity !== undefined) {
				floors[i].monsterDensity = savedFloors[i].monsterDensity;
			}
		}
	};

	//Getters
	self.getFloorMonsterDensity = function(floor) {
		return floors[floor].monsterDensity;
	};

	//Setters

	//Other Methods
	self.floorExplorationComplete = function(floor) {
		if (floors[floor].size == floors[floor].explored) {
			return true;
		}
		return false;
	};

	self.loadTowerScreen = function() {
		var currentFloor = player.getCurrentFloor();
		document.getElementById("floor").innerHTML = currentFloor;
		document.getElementById("explperc").innerHTML = Math.round(100*(floors[currentFloor].explored/floors[currentFloor].size)*100)/100 + "%";
		document.getElementById("floorbar").style.width = 100*(floors[currentFloor].explored/floors[currentFloor].size) + "%";
		if (floors[currentFloor].canAdvance && currentFloor < monsters.getMonsterList().length) {
			document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.changeFloor(1)">Next Floor</button>';
		}
		else {
			document.getElementById("advbut").innerHTML = '';
		}
		if (currentFloor !== 0) {
			document.getElementById("retbut").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.changeFloor(-1)">Previous Floor</button>';
		}
		else {
			document.getElementById("retbut").innerHTML = '';
		}
	};

	self.changeFloor = function(floorsChanged) {
		if (!player.getInBattle()) {
			player.setCurrentFloor(player.getCurrentFloor() + floorsChanged);
			self.loadTowerScreen();
			player.loadRestButton();
			player.loadExploreButton();
		}
	};

	var hasFoundStairs = function(currentFloor) {
		if (floors[currentFloor].explored > floors[currentFloor].stairsPosition) {
			return true;
		}
		return false;
	};

	self.exploreFloor = function() {
		var currentFloor = player.getCurrentFloor();
		player.setManaCurrentValue(player.getManaCurrentValue() + buffs.getManaPerSecond());
		if (!self.floorExplorationComplete(currentFloor)) {
			var explored = player.getSpeedLevel()/10;
			var explorationLeft = floors[currentFloor].size - floors[currentFloor].explored;
			if (explored > explorationLeft) {
				explored = explorationLeft;
			}
			floors[currentFloor].explored += explored;
			if (hasFoundStairs(currentFloor) && !floors[currentFloor].canAdvance && currentFloor < monsters.getMonsterList().length) {
				floors[currentFloor].canAdvance = true;
			}
			player.setSpeedExperience(player.getSpeedExperience() + explored);
			self.loadTowerScreen();
			monsters.battleChance(false);
		}
		else {
			monsters.battleChance(true);
		}
	};
};

var tower = new Tower();
var monsters = new Monsters();
var buffs = new Buffs();
var upgrades = new Upgrades();
var spells = new Spells();
var player = new Player();
var system = new System();

$.get( "https://raw.githubusercontent.com/shiroge/shiroge.github.io/master/CHANGELOG.md", function( data ) {

	var converter       = new showdown.Converter(),
		md_content        = data,
		md_to_html      = converter.makeHtml( md_content );
	$("#changelog").html( md_to_html );

});

system.runGame();