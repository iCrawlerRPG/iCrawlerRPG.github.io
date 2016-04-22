var Buffs = function() {
	//Multipliers
	var exceliaMultiplier = 1;
	var spellLevelingMultiplier = 1;
	var restingMultiplier = 1;
	var levelingSpeedMultiplier = 1;
	var explorationSpeedMultiplier = 1;

	//Adders
	var manaPerSecond = 0;

	//Percenters
	var exceliaSavedOnDeath = 0;
	var deathPenaltyReduction = 0;

	//Toggleables
	var castCureInBattle = false;
	var castFireballInBattle = false;
	var autoBarrierCast = false;

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
			savedRestingMultiplier: restingMultiplier,
			savedLevelingSpeedMultiplier: levelingSpeedMultiplier,
			savedExplorationSpeedMultiplier: explorationSpeedMultiplier,
			savedManaPerSecond: manaPerSecond,
			savedExceliaSavedOnDeath: exceliaSavedOnDeath,
			savedDeathPenaltyReduction: deathPenaltyReduction,
			savedCastCureInBattle: castCureInBattle,
			savedCastFireballInBattle: castFireballInBattle,
			savedAutoBarrierCast: autoBarrierCast,
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
		if (buffsSave.savedRestingMultiplier !== undefined) {
			restingMultiplier = buffsSave.savedRestingMultiplier;
		}
		if (buffsSave.savedLevelingSpeedMultiplier !== undefined) {
			levelingSpeedMultiplier = buffsSave.savedLevelingSpeedMultiplier;
		}
		if (buffsSave.savedExplorationSpeedMultiplier !== undefined) {
			explorationSpeedMultiplier = buffsSave.savedExplorationSpeedMultiplier;
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
		if (buffsSave.deathPenaltyReduction !== undefined) {
			deathPenaltyReduction = buffsSave.savedDeathPenaltyReduction;
		}
	};

	var loadToggleableBuffs = function(buffsSave) {
		if (buffsSave.savedCastCureInBattle !== undefined) {
			castCureInBattle = buffsSave.savedCastCureInBattle;
		}
		if (buffsSave.savedCastFireballInBattle !== undefined) {
			castFireballInBattle = buffsSave.savedCastFireballInBattle;
		}
		if (buffsSave.savedAutoBarrierCast !== undefined) {
			autoBarrierCast = buffsSave.autoBarrierCast;
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

	self.getRestingMultiplier = function() {
		return restingMultiplier;
	};

	self.getDeathPenaltyReduction = function() {
		return deathPenaltyReduction;
	};

	self.getAutoBarrierCast = function() {
		return autoBarrierCast;
	};

	self.getLevelingSpeedMultiplier = function() {
		return levelingSpeedMultiplier;
	};

	self.getExplorationSpeedMultiplier = function() {
		return explorationSpeedMultiplier;
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

	self.setRestingMultiplier = function(newMultiplier) {
		restingMultiplier = newMultiplier;
	};

	self.setDeathPenaltyReduction = function(newPercentage) {
		deathPenaltyReduction = newPercentage;
	};

	self.setAutoBarrierCast = function(boolean) {
		autoBarrierCast = boolean;
	};

	self.setLevelingSpeedMultiplier = function(newMultiplier) {
		levelingSpeedMultiplier = newMultiplier;
	};

	self.setExplorationSpeedMultiplier = function(newMultiplier) {
		explorationSpeedMultiplier = newMultiplier;
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

		if (autoBarrierCast || upgrades.isUpgradePurchased("barriercast")) {
			if (autoBarrierCast) {
				toggleStatusText = "ON";
			}
			else {
				toggleStatusText = "OFF";
			}
			document.getElementById("toggleable").innerHTML += '<button type="button" class="list-group-item" onClick="buffs.toggleBuff(\'autoBarrierCast\')"><span class="badge">' + toggleStatusText + '</span>Barrier Casting</button>';
		}
	};

	self.updatePermanentBuffs = function() {
		document.getElementById("permanent").innerHTML = '';
		if (deathPenaltyReduction !== 0) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">' + deathPenaltyReduction + '%</span>Death Penalty Reduction</li>';
		}
		if (exceliaMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + exceliaMultiplier + '</span>Excelia Gain</li>';
		}
		if (exceliaSavedOnDeath !== 0) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">' + exceliaSavedOnDeath + '%</span>Excelia Saved Upon Death</li>';
		}
		if (manaPerSecond !== 0) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">+' + manaPerSecond + '</span>Exploration Mana per Second</li>';
		}
		if (explorationSpeedMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + explorationSpeedMultiplier + '</span>Exploration Speed</li>';
		}
		if (restingMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + restingMultiplier + '</span>Rest Speed</li>';
		}
		if (spellLevelingMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + spellLevelingMultiplier + '</span>Spell Level Gain</li>';
		}
		if (levelingSpeedMultiplier !== 1) {
			document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + levelingSpeedMultiplier + '</span>Stats Experience Gain</li>';
		}
	};

	self.toggleBuff = function(buffId) {
		if (buffId == "castCureInBattle") {
			castCureInBattle = !castCureInBattle;
		}
		else if (buffId == "castFireballInBattle") {
			castFireballInBattle = !castFireballInBattle;
		}
		else if (buffId == "autoBarrierCast") {
			autoBarrierCast = !autoBarrierCast;
		}
		self.updateToggleableBuffs();
	};
};

var buffs = new Buffs();