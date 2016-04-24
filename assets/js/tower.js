var Tower = function() {
	var lastBossDefeated = 0;
	var bossFound = false;
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
				monsterDensity: Math.floor(10 + Math.random()*40)});
		}
	}

	var self = this;
	//Save Method
	self.save = function() {
		var towerSave = {
			savedFloors: floors,
			savedLastBossDefeated: lastBossDefeated,
			savedBossFound: bossFound
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
			if (towerSave.savedLastBossDefeated !== undefined) {
				lastBossDefeated = towerSave.savedLastBossDefeated;
			}
			if (towerSave.savedBossFound !== undefined) {
				bossFound = towerSave.savedBossFound;
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

    self.getMaxFloor = function() {
        var maxFloor = 0;
        for (var i = 0; i < floors.length; i++) {
            if (floors[i].explored === floors[i].size) {
                maxFloor = i;
            }
        };
        return maxFloor;
    };

	//Setters
	self.setBossFound = function(boolean) {
		bossFound = boolean;
	};

	self.setLastBossDefeated = function(floor) {
		lastBossDefeated = floor;
	};

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
		else if (bossFound) {
			if (currentFloor % 10 !== 0) {
				document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.changeFloor(1)">Next Floor</button>';
			}
			else {
				if (currentFloor <= lastBossDefeated) {
					document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="tower.changeFloor(1)">Next Floor</button>';
				}
				else {
					document.getElementById("advbut").innerHTML = '<button class="btn btn-danger btn-block" onClick="tower.startBossBattle()">Fight Floor Boss</button>';
				}
			}
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

	self.startBossBattle = function() {
		if (!player.getInBattle()) {
			monsters.setInstancedMonster(monsters.getBossMonster((player.getCurrentFloor()/10)-1));
			monsters.setInBossBattle(true);
			monsters.battle(monsters.getInstancedMonster(), false);
		}
	};

	self.bossDefeated = function() {
		floors[player.getCurrentFloor()].canAdvance = true;
		self.loadTowerScreen();
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
			var explored = buffs.getExplorationSpeedMultiplier() * ((player.getSpeedLevel() + player.getSpeedBonus())/10);
			var explorationLeft = floors[currentFloor].size - floors[currentFloor].explored;
			if (explored > explorationLeft) {
				explored = explorationLeft;
			}
			floors[currentFloor].explored += explored;
			if (hasFoundStairs(currentFloor) && !floors[currentFloor].canAdvance && currentFloor < monsters.getMonsterList().length) {
				if (currentFloor % 10 !== 0) {
					floors[currentFloor].canAdvance = true;
				}
				else {
					bossFound = true;
				}
			}
			player.setSpeedExperience(player.getSpeedExperience() + 5*explored*buffs.getLevelingSpeedMultiplier()/buffs.getExplorationSpeedMultiplier());
			self.loadTowerScreen();
			if (!checkFloorEvent()) {
				monsters.battleChance(false);
			}
		}
		else {
			monsters.battleChance(true);
		}
	};

	var checkFloorEvent = function() {
		var eventChance = 10;
		var eventRoll = Math.floor(Math.random()*100);
		if (eventRoll <= eventChance) {
			eventRoll = Math.random()*100;
			if (eventRoll < 5) {
				var rarity = player.getCurrentFloor() + Math.floor(Math.random() * player.getCurrentFloor());
				document.getElementById("floorlog").innerHTML = "You turn a corner, finding a treasure chest."
				inventory.findChest(rarity);
			}
			else {
				var gold = Math.round(Math.random() * 50 * player.getCurrentFloor()) + 1;
				document.getElementById("floorlog").innerHTML = "You find the body of another adventurer. You check their pockets, obtaining " + gold + " gold.";
				inventory.setGold(inventory.getGold() + gold);
			}
			return true;
		}
		else {
			document.getElementById("floorlog").innerHTML = "You walk around for a bit, finding nothing of interest."
			return false;
		}
	};
};

var tower = new Tower();
