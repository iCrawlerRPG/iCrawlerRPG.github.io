var Spells = function() {
	var arcania = 0;

	var spellbook = [];
	spellbook.push({name: "Cure",
		id: "cure",
		type: 0,
		requiredMagic: 5,
		arcaniaCost: 0,
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
		arcaniaCost: 0,
		learned: true,
		baseMana: 10,
		experience: 0,
		nextLevel: 100,
		baseNextLevel: 100,
		level: 0,
		description:""});

	spellbook.push({name: "Transmutation",
		id: "transmutation",
		type: 3,
		requiredMagic: 5,
		arcaniaCost: 0,
		learned: true,
		baseMana: 50,
		experience: 0,
		nextLevel: 500,
		baseNextLevel: 500,
		level: 0,
		description:""});

	spellbook.push({name: "Barrier",
		id: "barrier",
		type: 0,
		requiredMagic: 10,
		arcaniaCost: 1000,
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
		arcaniaCost: 2000,
		learned: false,
		baseMana: 400,
		experience: 0,
		nextLevel: 4000,
		baseNextLevel: 4000,
		level: 0,
		description: ""});

	spellbook.push({name: "Rage",
		id: "rage",
		type: 1,
		requiredMagic: 25,
		arcaniaCost: 2500,
		learned: false,
		baseMana: 1250,
		experience: 0,
		nextLevel: 12500,
		baseNextLevel: 12500,
		level: 0,
		description: ""});

    spellbook.push({name: "Shadow Ball",
        id: "shadowball",
        type: 1,
        requiredMagic: 30,
        arcaniaCost: 3000,
        learned: false,
        baseMana: 150,
        experience: 0,
        nextLevel: 1500,
        baseNextLevel: 1500,
        level: 0,
        description: ""});

	spellbook.push({name: "Aegis",
		id: "aegis",
		type: 0,
		requiredMagic: 50,
		arcaniaCost: 5000,
		learned: false,
		baseMana: 5000,
		experience: 0,
		nextLevel: 50000,
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
		var success = false;
		for(var i = 0; i < savedSpellbook.length; i++) {
			if (i == spellbook.length) {
				break;
			}
			for (var j = 0; j < spellbook.length; j++) {
				if (spellbook[j].id == savedSpellbook[i].id) {
					success = true;
					break;
				}
			}
			if (success) {
				if (savedSpellbook[i].learned !== undefined) {
					spellbook[j].learned = savedSpellbook[i].learned;
				}
				if (savedSpellbook[i].experience !== undefined) {
					spellbook[j].experience = savedSpellbook[i].experience;
				}
				if (savedSpellbook[i].nextLevel !== undefined) {
					spellbook[j].nextLevel = savedSpellbook[i].nextLevel;
				}
				if (savedSpellbook[i].level !== undefined) {
					spellbook[j].level = savedSpellbook[i].level;
				}
			}
			success = false;
		}
	};

	//Getters

	//Setters
	self.setArcania = function(number) {
		arcania = number;
		document.getElementById("arcania").innerHTML = Math.round(100*arcania)/100;
	};

	//Other Methods
	var updateSpellDescriptions = function() {
		for (var i = 0; i < spellbook.length; i++) {
			if (spellbook[i].id == "cure") {
			spellbook[i].description = "Call the powers of nature to heal yourself for " + curePotency(spellbook[i]) + " HP";
			}
			else if (spellbook[i].id == "fireball") {
				spellbook[i].description = "Ignite mana around your hand and throw it. Deals " + fireballPotency(spellbook[i]) + " fire damage.";
			}
			else if (spellbook[i].id == "barrier") {
				spellbook[i].description = "Condense mana around you to put up a barrier that will absorb " + barrierPotency(spellbook[i]) + " damage.";
			}
			else if (spellbook[i].id == "aegis") {
				spellbook[i].description = "Call for heavenly protection and take no damage for " + aegisPotency(spellbook[i]) + " turns.";
			}
			else if (spellbook[i].id == "slow") {
                spellbook[i].description = "Magically shackle your enemy, reducing its dexterity for " + slowPotency(spellbook[i]) + " points.";
            }
			else if (spellbook[i].id == "rage") {
				spellbook[i].description = "Fill yourself with rage for " + ragePotency(spellbook[i]) + " turns. You deal 5x damage, however, you take 2x damage and cannot cast other spells.";
			}
			else if (spellbook[i].id == "transmutation") {
				spellbook[i].description = "Give material form to the Arcania inside you. Transforms 100 Arcania into " + transmutationPotency(spellbook[i]) + " gold.";
			}
            else if (spellbook[i].id == "shadowball") {
                spellbook[i].description = "Condense shadow energy into a sphere you can hurl into enemies. Deals " + shadowBallPotency(spellbook[i]) + " damage.";
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
		updateSpellHtml(spell, true);
	};

	self.updateSpellbook = function() {
		document.getElementById("spellbook").innerHTML = '';
		for (var i = 0; i <= 3; i++) {
			document.getElementById("spellbook" + i).innerHTML = '';
		}
		updateSpellDescriptions();
		for (i = 0; i < spellbook.length; i++) {
			if (player.getMagicLevel() >= spellbook[i].requiredMagic && spellbook[i].learned === false) {
				var spellColor = spellType(spellbook[i].type);
				document.getElementById("spellbook").innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.buySpell(\'' + spellbook[i].id + '\')"> Buy ' + spellbook[i].name + '</button></div><div class="col-xs-7"><p class="text-right">Arcania Cost: <span id="' + spellbook[i].id + 'arcaniacostall">0</span></p></div></div>';
				document.getElementById("spellbook" + spellbook[i].type).innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.buySpell(\'' + spellbook[i].id + '\')"> Buy ' + spellbook[i].name + '</button></div><div class="col-xs-7"><p class="text-right">Arcania Cost: <span id="' + spellbook[i].id + 'arcaniacost">0</span></p></div></div>';
				updateSpellHtml(spellbook[i], false);
			}
			else if (spellbook[i].learned === true) {
				var spellColor = spellType(spellbook[i].type);
				document.getElementById("spellbook").innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xpall" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%;"><span id="' + spellbook[i].id + 'progall">' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'levelall">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'costall">0</span></p></div></div>';
				document.getElementById("spellbook" + spellbook[i].type).innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + spellColor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].description + '" onClick="spells.castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xp" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%;"><span id="' + spellbook[i].id + 'prog">' + 100*spellbook[i].experience/spellbook[i].nextLevel + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'level">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'cost">0</span></p></div></div>';
				spellbook[i].learned = true;
				updateSpellHtml(spellbook[i], true);
			}
		}

		$(document).ready(function(){
			$('[data-toggle="tooltip"]').tooltip(); 
		});
	};

	var updateSpellHtml = function(spell, hasBought) {
		document.getElementById("arcania").innerHTML = Math.round(100*arcania)/100;
		if (!hasBought) {
			document.getElementById(spell.id + "arcaniacost").innerHTML = spell.arcaniaCost;
			document.getElementById(spell.id + "arcaniacostall").innerHTML = spell.arcaniaCost;
		}
		else {
			document.getElementById(spell.id + "costall").innerHTML = spellCost(spell);
			document.getElementById(spell.id + "cost").innerHTML = spellCost(spell);
			document.getElementById(spell.id + "xpall").style.width = 100*(spell.experience/spell.nextLevel) + "%";
			document.getElementById(spell.id + "progall").innerHTML = Math.round(100 * (100 * (spell.experience/spell.nextLevel)))/100 + "%";
			document.getElementById(spell.id + "levelall").innerHTML = spell.level;
			document.getElementById(spell.id + "xp").style.width = 100*(spell.experience/spell.nextLevel) + "%";
			document.getElementById(spell.id + "prog").innerHTML = Math.round(100 * (100 * (spell.experience/spell.nextLevel)))/100 + "%";
			document.getElementById(spell.id + "level").innerHTML = spell.level;
		}
	};

	self.isSpellLearned = function(spellId) {
		if (spellId === "") {
			return true;
		}
		else {
			for (var i = 0; i < spellbook.length; i++) {
				if (spellbook[i].id == spellId) {
					return spellbook[i].learned;
				}
			}
			return false;
		}
	};

	self.castSpell = function(spellId) {
		var spell = findSpell(spellId);
		var manaCost = spellCost(spellbook[spell]);

		if (player.getManaCurrentValue() >= manaCost && buffs.getRageTimeLeft() === 0 && self.isSpellLearned(spellId)) {
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
			else if (spellbook[spell].id == "transmutation") {
				castSuccessful = castTransmutation(spellbook[spell]);
			}
            else if (spellbook[spell].id == "shadowball") {
                castSuccessful = castShadowBall(spellbook[spell]);
            }
			if (castSuccessful) {
				if (spellbook[spell].id !== "transmutation") {
					arcania += spellbook[spell].level + manaCost/100;
				}
				player.setManaCurrentValue(player.getManaCurrentValue() - manaCost);
				levelSpell(spellbook[spell], buffs.getSpellLevelingMultiplier() * manaCost);
				player.setMagicExperience(player.getMagicExperience() + buffs.getLevelingSpeedMultiplier()*(spellbook[spell].level + 1 + manaCost/10));
				return true;
			}
		}
		return false;
	};

	self.buySpell = function(spellId) {
		var spell = findSpell(spellId);
		if (arcania >= spellbook[spell].arcaniaCost) {
			self.setArcania(arcania - spellbook[spell].arcaniaCost);
			spellbook[spell].learned = true;
		}
		self.updateSpellbook();
	}

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
        var cureLevelPotency = 15 * cure.level;
        var cureMagicPotency = 3 * (player.getMagicLevel() + player.getMagicBonus() - 5);
        return Math.floor(cureBasePotency + cureLevelPotency + cureMagicPotency);
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
        var fireballLevelPotency = 5 * fireball.level;
        var fireballMagicPotency = 1 * (player.getMagicLevel() + player.getMagicBonus() - 5);
        return Math.floor(fireballBasePotency + fireballLevelPotency + fireballMagicPotency);
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
        var barrierMagicPotency = 10 * (player.getMagicLevel() + player.getMagicBonus() - 10);
        return Math.floor(barrierBasePotency + barrierLevelPotency + barrierMagicPotency);
    };

    var castAegis = function(aegis) {
        if (buffs.getAegisTimeLeft() !== 0) {
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
        var aegisLevelPotency = 1 * aegis.level;
        var aegisMagicPotency = 0.2 * (player.getMagicLevel() + player.getMagicBonus() - 50);
        return Math.floor(aegisBasePotency + aegisLevelPotency + aegisMagicPotency);
    };

    var castSlow = function(slow) {
        var monster = monsters.getInstancedMonster();
        if (!player.getInBattle() || monster.dexterity <= 1) {
            return false;
        }
        else {
            var slowEffect = slowPotency(slow);
            if (monster.dexterity <= slowEffect) {
                slowEffect = monster.dexterity - 1;
            }
            monster.dexterity -= slowEffect;
            document.getElementById("monsterdex").innerHTML = monster.dexterity;
            document.getElementById("combatlog").innerHTML = '';
            document.getElementById("combatlog").innerHTML += "You have cast slow on the " + monster.name + ". Its dexterity has been lowered by " + slowEffect + ".<br>";
            monsters.setInstancedMonster(monster);
            monsters.battle(monsters.getInstancedMonster(), true);
            return true;
        }
    };

    var slowPotency = function(slow) {
        var slowBasePotency = 5;
        var slowLevelPotency = 1 * slow.level;
        var slowMagicPotency = 0.2 * (player.getMagicLevel() + player.getMagicBonus() - 20);
        return Math.floor(slowBasePotency + slowLevelPotency + slowMagicPotency);
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
        var rageLevelPotency = 1 * rage.level;
        var rageMagicPotency = 0.2 * (player.getMagicLevel() + player.getMagicBonus() - 25);
        return Math.floor(rageBasePotency + rageLevelPotency + rageMagicPotency);
    };

    var castTransmutation = function(transmutation) {
        if (arcania < 100 || player.getInBattle()) {
            return false;
        }
        else {
            self.setArcania(arcania - 100);
            inventory.setGold(inventory.getGold() + transmutationPotency(transmutation));
            return true;
        }
    };

    var transmutationPotency = function(transmutation) {
        var transmutationBasePotency = 1;
        var transmutationLevelPotency = 1 * transmutation.level;
        var transmutationMagicPotency = 0.2 * (player.getMagicLevel() + player.getMagicBonus() - 5);
        return Math.floor(transmutationBasePotency + transmutationLevelPotency + transmutationMagicPotency);
    };

    var castShadowBall = function(shadowBall) {
        if (!player.getInBattle()) {
            return false;
        }
        else {
            var monster = monsters.getInstancedMonster();
            var shadowBallDamage = shadowBallPotency(shadowBall);
            if (monster.currentHealth <= shadowBallDamage) {
                shadowBallDamage = monster.currentHealth;
            }
            document.getElementById("combatlog").innerHTML = '';
            document.getElementById("combatlog").innerHTML += "Your shadow ball hit the " + monster.name + " for " + Math.floor(shadowBallDamage) + " damage.<br>";
            if (!monsters.monsterTakeDamage(monsters.getInstancedMonster(), shadowBallDamage)) {
                monsters.battle(monsters.getInstancedMonster(), true);
            }
            return true;
        }
    };

    var shadowBallPotency = function(shadowBall) {
        var shadowBallBasePotency = 300;
        var shadowBallLevelPotency = 50 * shadowBall.level;
        var shadowBallMagicPotency = 10 * (player.getMagicLevel() + player.getMagicBonus() - 30);
        return Math.floor(shadowBallBasePotency + shadowBallLevelPotency + shadowBallMagicPotency);
    };
};

var spells = new Spells();