//----------------------------------------------------------------//
//---------------------------- OBJECTS ---------------------------//
//----------------------------------------------------------------//

//The most important one.
var theGame;

//Game controllers:
var game = {
	ticks: 0,
	gameSpeed: 1,
	refreshSpeed: 1000,
	inbattle: false,
	resting: true,
	queued: false,
	init: false,
	found: 0
};

//Player Object:
var player = {
	name:"placeholder",
	hp: {id: "hp", curval: 100, maxval: 100},
	mp: {id: "mp", curval: 50, maxval: 50},
	str: {id: "str", val: 5, xp: 0, next: 90},
	dex: {id: "dex", val: 5, xp: 0, next: 90},
	con: {id: "con", val: 5, xp: 0, next: 90},
	spd: {id: "spd", val: 5, xp: 0, next: 90},
	mgc: {id: "mgc", val: 5, xp: 0, next: 90},
	curfloor: 0,
};

//Resources:
var resources = {
	excelia: 0
};

//Spellbook:
var spellbook = [];
spellbook.push({name: "Cure", id: "cure", type: 0, requiredmgc: 5, learned: false, baseMP: 15, xp: 0, next: 150, baseNext: 150, level: 0, desc:""});
spellbook.push({name: "Fireball", id: "fireball", type: 1, requiredmgc: 5, learned: false, baseMP: 10, xp: 0, next: 100, baseNext: 100, level: 0, desc:""});
spellbook.push({name: "Barrier", id: "barrier", type: 0, requiredmgc: 10, learned: false, baseMP: 100, xp: 0, next: 1000, baseNext: 1000, level: 0, desc: ""});
spellbook.push({name: "Clairvoyance", id:"clairvoyance", type: 3, requiredmgc: 10, learned: false, baseMP: 100, xp: 0, next: 1000, baseNext: 1000, level: 0, desc: ""});
spellbook.push({name: "Slow", id: "slow", type: 2, requiredmgc: 20, learned: false, baseMP: 400, xp: 0, next: 4000, baseNext: 4000, level: 0, desc: ""});
spellbook.push({name: "Rage", id: "rage", type: 1, requiredmgc: 25, learned: false, baseMP: 1250, xp: 0, next: 12500, baseNext: 12500, level: 0, desc: ""});
spellbook.push({name: "Aegis", id: "aegis", type: 0, requiredmgc: 50, learned: false, baseMP: 5000, xp: 0, next: 50000, baseNext: 50000, level: 0, desc: ""});

//Excelia Upgrades:
var upgrades = [];
//upgrades.push({name: "Time Warp 1", id: "timewarp1", exceliacost: 10, shown: false, purchased: false, desc:"Progress too slow? Make everything go at twice the speed!"});
upgrades.push({name: "Aetheric Attunement", id:"aetheric", exceliacost: 100, shown: false, purchased: false, desc:"Tap into the mana around you. Recover +1 MP per second while exploring."});
//upgrades.push({name: "Time Warp 2", id: "timewarp2", exceliacost: 100, shown: false, purchased: false, desc:"Change to the next gear! With this, everything is five times faster!"});
upgrades.push({name: "Auto Crawl 1", id: "autocrawl1", exceliacost: 1000, shown: false, purchased: false, desc:"Rest whenever you're below 10% health. Start exploring again when completely healed."});
upgrades.push({name: "Excelia x2", id:"doubleexcelia", exceliacost: 2000, shown: false, purchased: false, desc:"Double the amount of Excelia you gain per monster."});
upgrades.push({name: "Adept Mage", id:"adeptmage", exceliacost: 5000, shown: false, purchased: false, desc:"Master spells twice as fast. Blow yourself up twice as much."});
upgrades.push({name: "Battle Healing", id:"battlehealing", exceliacost: 5000, shown: false, purchased: false, desc:"Cast Cure whenever you get under 50% HP during battle."});
upgrades.push({name: "Blessings", id:"blessings", exceliacost: 10000, shown:false, purchased: false, desc:"Keep 10% of your excelia upon death."});

//Buffs
var buffs = {
	autoCrawlPercent: 0,
	exceliaMultiplier: 1,
	spellMasteryMultiplier: 1,
	aegis: 0,
	barrier: 0,
	aethericLevel: 0,
	battleHealing: false,
	exceliaBless: 0,
	rage: 0
};

//Monster List:
var monster = [];
monster.push({name: "Rat", curhp:50, hp: 50, str: 5, dex: 5, con: 5, status: 0, killed: 0});
monster.push({name: "Bat", curhp:40, hp: 40, str: 4, dex: 7, con: 4, status: 0, killed: 0});
monster.push({name: "Slime", curhp: 65, hp: 65, str: 6, dex: 5, con: 7, status: 0, killed: 0});
monster.push({name: "Kobold", curhp: 180, hp: 180, str: 12, dex: 8, con: 7, status: 0, killed: 0});
monster.push({name: "Wolf", curhp: 320, hp: 320, str: 20, dex: 15, con: 12, status: 0, killed: 0});
monster.push({name: "Lizard", curhp: 710, hp: 710, str: 28, dex: 20, con: 25, status: 0, killed: 0});
monster.push({name: "Goblin", curhp: 1400, hp: 1400, str: 45, dex: 32, con: 40, status: 0, killed: 0});
monster.push({name: "Bandit", curhp: 2850, hp: 2850, str: 48, dex: 72, con: 35, status: 0, killed: 0});
monster.push({name: "Giant Wolf", curhp: 5000, hp: 5000, str: 104, dex: 78, con: 80, status: 0, killed: 0});
monster.push({name: "Armored Slime", curhp: 12430, hp: 12430, str: 172, dex: 50, con: 340, status: 0, killed: 0});
monster.push({name: "Kobold Leader", curhp: 22000, hp: 22000, str: 150, dex: 124, con: 165, status: 0, killed: 0});
monster.push({name: "Weakened Minotaur", curhp: 47320, hp: 47320, str: 226, dex: 160, con: 189, status: 0, killed: 0});
monster.push({name: "Dragon Cub", curhp: 101000, hp: 101000, str: 402, dex: 216, con: 287, status: 0, killed: 0});
monster.push({name: "Giant Snake", curhp: 183200, hp: 183200, str: 521, dex: 674, con: 195, status: 0, killed: 0});
monster.push({name: "Living Armor", curhp: 321950, hp: 321950, str: 832, dex: 420, con: 429, status: 0, killed: 0});
monster.push({name: "Beholder", curhp: 623900, hp: 623900, str: 1047, dex: 500, con: 986, status: 0, killed: 0});
monster.push({name: "Shadow Killer", curhp: 1178000, hp: 1178000, str: 1870, dex: 2500, con: 320, status: 0, killed: 0});

//Tower
var tower = [];
for (var i = 0; i <= monster.length; i++) { //It has as many floors as monsters
	if (i === 0) {
		tower.push({size:100, explored:100, advallowed:1, stairpos: 0, density: 0});
	}
	else {
		tower.push({size: Math.floor(2*tower[i-1].size),
					explored: 0,
					advallowed: 0,
					stairpos: Math.floor(Math.random() * Math.floor(2*tower[i-1].size)),
					density: 10 + Math.random()*40});
	}
}

//----------------------------------------------------------------//
//----------------------- SYSTEM FUNCTIONS -----------------------//
//----------------------------------------------------------------//

//Run the game!
var runGame = function() {
	theGame = window.setInterval(function() {main();}, game.refreshSpeed);
};

//Save the game!
var saving = function() {
	var save = {
		savedGame: game,
		savedPlayer: player,
		savedResources: resources,
		savedSpellbook: spellbook,
		savedUpgrades: upgrades,
		savedBuffs: buffs,
		savedMonster: monster,
		savedTower: tower
	};
	localStorage.setItem("saved",JSON.stringify(save));
};

//Load the game! If all goes well, retro-compatibility is forever!
var load = function() {
  var savegame = JSON.parse(localStorage.getItem("saved"));
	if (savegame) {
		if (savegame.savedGame != undefined) {
			if (savegame.savedGame.ticks != undefined) {
				if (savegame.savedGame.ticks > 30000000) {
					game.ticks = 31536000 - savegame.savedGame.ticks;
				}
				else {
					game.ticks = savegame.savedGame.ticks;
				}
			}
			if (savegame.savedGame.gameSpeed != undefined) {
				game.gameSpeed = savegame.savedGame.gameSpeed;
			}
			if (savegame.savedGame.refreshSpeed != undefined) {
				game.refreshSpeed = savegame.savedGame.refreshSpeed;
			}
		}
		if (savegame.savedPlayer != undefined) {
			if (savegame.savedPlayer.name != undefined) {
				player.name = savegame.savedPlayer.name;
			}
			if (savegame.savedPlayer.hp != undefined) {
				if (savegame.savedPlayer.hp.curval != undefined) {
					player.hp.curval = savegame.savedPlayer.hp.curval;
				}
				if (savegame.savedPlayer.hp.maxval != undefined) {
					player.hp.maxval = savegame.savedPlayer.hp.maxval;
				}
			}
			if (savegame.savedPlayer.mp != undefined) {
				if (savegame.savedPlayer.mp.curval != undefined) {
					player.mp.curval = savegame.savedPlayer.mp.curval;
				}
				if (savegame.savedPlayer.mp.maxval != undefined) {
					player.mp.maxval = savegame.savedPlayer.mp.maxval;
				}
			}
			if (savegame.savedPlayer.str != undefined) {
				if (savegame.savedPlayer.str.val != undefined) {
					player.str.val = savegame.savedPlayer.str.val;
				}
				if (savegame.savedPlayer.str.xp != undefined) {
					player.str.xp = savegame.savedPlayer.str.xp;
				}
				if (savegame.savedPlayer.str.next != undefined) {
					player.str.next = savegame.savedPlayer.str.next;
				}
			}
			if (savegame.savedPlayer.dex != undefined) {
				if (savegame.savedPlayer.dex.val != undefined) {
					player.dex.val = savegame.savedPlayer.dex.val;
				}
				if (savegame.savedPlayer.dex.xp != undefined) {
					player.dex.xp = savegame.savedPlayer.dex.xp;
				}
				if (savegame.savedPlayer.dex.next != undefined) {
					player.dex.next = savegame.savedPlayer.dex.next;
				}
			}
			if (savegame.savedPlayer.con != undefined) {
				if (savegame.savedPlayer.con.val != undefined) {
					player.con.val = savegame.savedPlayer.con.val;
				}
				if (savegame.savedPlayer.con.xp != undefined) {
					player.con.xp = savegame.savedPlayer.con.xp;
				}
				if (savegame.savedPlayer.con.next != undefined) {
					player.con.next = savegame.savedPlayer.con.next;
				}
			}
			if (savegame.savedPlayer.spd != undefined) {
				if (savegame.savedPlayer.spd.val != undefined) {
					player.spd.val = savegame.savedPlayer.spd.val;
				}
				if (savegame.savedPlayer.spd.xp != undefined) {
					player.spd.xp = savegame.savedPlayer.spd.xp;
				}
				if (savegame.savedPlayer.spd.next != undefined) {
					player.spd.next = savegame.savedPlayer.spd.next;
				}
			}
			if (savegame.savedPlayer.mgc != undefined) {
				if (savegame.savedPlayer.mgc.val != undefined) {
					player.mgc.val = savegame.savedPlayer.mgc.val;
				}
				if (savegame.savedPlayer.mgc.xp != undefined) {
					player.mgc.xp = savegame.savedPlayer.mgc.xp;
				}
				if (savegame.savedPlayer.mgc.next != undefined) {
					player.mgc.next = savegame.savedPlayer.mgc.next;
				}
			}
			if (savegame.savedPlayer.curfloor != undefined) {
				player.curfloor = savegame.savedPlayer.curfloor;
			}
		}
		if (savegame.savedResources != undefined) {
			if (savegame.savedResources.excelia != undefined) {
				resources.excelia = savegame.savedResources.excelia;
			}
			if (savegame.savedResources.exceliaMultiplier != undefined) {
				resources.exceliaMultiplier = savegame.savedResources.exceliaMultiplier;
			}
		}
		if (savegame.savedSpellbook != undefined) {
			for (i = 0; i < savegame.savedSpellbook.length; i++) {
				if (i == spellbook.length) break;
				if (savegame.savedSpellbook[i].learned != undefined) {
					spellbook[i].learned = savegame.savedSpellbook[i].learned;
				}
				if (savegame.savedSpellbook[i].xp != undefined) {
					spellbook[i].xp = savegame.savedSpellbook[i].xp;
				}
				if (savegame.savedSpellbook[i].next != undefined) {
					spellbook[i].next = savegame.savedSpellbook[i].next;
				}
				if (savegame.savedSpellbook[i].level != undefined) {
					spellbook[i].level = savegame.savedSpellbook[i].level;
				}
			}
		}
		if (savegame.savedUpgrades != undefined) {
			for (i = 0; i < savegame.savedUpgrades.length; i++) {
				if (i == upgrades.length) break;
				if (savegame.savedUpgrades[i].shown != undefined) {
					upgrades[i].shown = savegame.savedUpgrades[i].shown;
				}
				if (savegame.savedUpgrades[i].purchased != undefined) {
					upgrades[i].purchased = savegame.savedUpgrades[i].purchased;
				}
			}
		}
		if (savegame.savedBuffs != undefined) {
			if (savegame.savedBuffs.autoCrawlPercent != undefined) {
				buffs.autoCrawlPercent = savegame.savedBuffs.autoCrawlPercent;
			}
			if (savegame.savedBuffs.barrier != undefined) {
				buffs.barrier = savegame.savedBuffs.barrier;
			}
			if (savegame.savedBuffs.aegis != undefined) {
				buffs.aegis = savegame.savedBuffs.aegis;
			}
			if (savegame.savedBuffs.spellMasteryMultiplier != undefined) {
				buffs.spellMasteryMultiplier = savegame.savedBuffs.spellMasteryMultiplier;
			}
			if (savegame.savedBuffs.exceliaMultiplier != undefined) {
				buffs.exceliaMultiplier = savegame.savedBuffs.exceliaMultiplier;
			}
			if (savegame.savedBuffs.aethericLevel != undefined) {
				buffs.aethericLevel = savegame.savedBuffs.aethericLevel;
			}
			if (savegame.savedBuffs.battleHealing != undefined) {
				buffs.battleHealing = savegame.savedBuffs.battleHealing;
			}
			if (savegame.savedBuffs.exceliaBless != undefined) {
				buffs.exceliaBless = savegame.savedBuffs.exceliaBless;
			}
		}
		if (savegame.savedMonster != undefined) {
			for (i = 0; i < savegame.savedMonster.length; i++) {
				if (i == monster.length) break;
				if (savegame.savedMonster[i].killed != undefined) {
					monster[i].killed = savegame.savedMonster[i].killed;
				}
			}
		}
		if (savegame.savedTower != undefined) {
			for (i = 0; i < savegame.savedTower.length; i++) {
				if (i == tower.length) break;
				if (savegame.savedTower[i].explored != undefined) {
					tower[i].explored = savegame.savedTower[i].explored;
				}
				if (savegame.savedTower[i].advallowed != undefined) {
					tower[i].advallowed = savegame.savedTower[i].advallowed;
				}
				if (savegame.savedTower[i].stairpos != undefined) {
					tower[i].stairpos = savegame.savedTower[i].stairpos;
				}
				if (savegame.savedTower[i].density != undefined) {
					tower[i].density = savegame.savedTower[i].density;
				}
			}
		}
	}
	else {
		player.name = prompt("Please, enter your name:", "Crawler");
	}
};

//Hard resetting is hard!
var hardReset = function() {
	theGame = window.clearInterval(theGame);
	if (confirm("Are you sure? You will lose ALL your progress!")) {
		localStorage.clear();
		location.reload();
	}
	else {
		runGame();
	}
};

//Dawn of the First Day
var updateTime = function(number) {
	document.getElementById("seconds").innerHTML = number % 60;
	number = Math.floor(number / 60);
	document.getElementById("minutes").innerHTML = number % 60;
	number = Math.floor(number / 60);
	document.getElementById("hours").innerHTML = number % 24;
	number = Math.floor(number / 24);
	document.getElementById("days").innerHTML = number;
};

//How fast can we go?
var gameSpeed = function(number) {
	game.refreshSpeed = number;
	theGame = window.clearInterval(theGame);
	runGame();
	document.getElementById("speed").innerHTML = 1000/number;
};

//I am the Alpha and the Omega
var main = function() {
	if (game.init === false) {
		startTheEngine();
	}
	game.ticks += 1;
	if (game.inbattle === false) {
		if (game.resting) {
			updateCondition(player.hp, 1*player.con.val);
			updateCondition(player.mp, 1*player.mgc.val);
			if (game.queued && player.hp.curval == player.hp.maxval && player.mp.curval == player.mp.maxval) {
				game.resting = false;
				document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Rest</button>';
				game.queued = false;
			}
		}
		else if (percentage(player.hp.curval, player.hp.maxval) <= buffs.autoCrawlPercent) {
			explore();
			explore();
		}
		else {
			updateCondition(player.mp, buffs.aethericLevel);
			exploreFloor();
		}
	}
	else {
		battle(monster[game.found]);
	}
	readTempBuffs(true);
	updateTime(game.ticks);
	saving();
};

//Loading everything
var startTheEngine = function() {
	load();
	document.getElementById("name").innerHTML = player.name;
	updateStat(player.str, 0);
	updateStat(player.dex, 0);
	updateStat(player.con, 0);
	updateStat(player.spd, 0);
	updateStat(player.mgc, 0);
	updateCondition(player.hp, 0);
	updateCondition(player.mp, 0);
	updateMaxCondition(player.hp);
	updateMaxCondition(player.mp);
	document.getElementById("floor").innerHTML = player.curfloor;
	document.getElementById("explperc").innerHTML = Math.round(percentage(tower[player.curfloor].explored, tower[player.curfloor].size)*100)/100 + "%";
	document.getElementById("floorbar").style.width = percentage(tower[player.curfloor].explored, tower[player.curfloor].size) + "%";
	if (tower[player.curfloor].advallowed == 1) {
		document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="changeFloor(1)">Proceed to Floor <span id="nextfloor">0</span></button>';
		document.getElementById("nextfloor").innerHTML = player.curfloor + 1;
	}
	if (player.curfloor !== 0) {
		document.getElementById("retbut").innerHTML = '<button class="btn btn-default btn-block" onClick="changeFloor(-1)">Back to Floor <span id="prevfloor">0</span></button>';
		document.getElementById("prevfloor").innerHTML = player.curfloor - 1;
	}
	if (game.resting) {
		if (tower[player.curfloor].size == tower[player.curfloor].explored && player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Search for Monsters</button>';
		}
		else if (player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Explore Floor</button>';
		}
	}
	else {
		document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Rest</button>';
	}
	document.getElementById("excelia").innerHTML = Math.round(100*resources.excelia)/100;
	readSpells();
	readUpgrades();
	readPermBuffs();
	readToggBuffs();
	readTempBuffs(false);
	for (i = 0; i < upgrades.length; i++) {
		if (upgrades[i].id == "timewarp1" && upgrades[i].purchased == true) {
			document.getElementById("speed2").innerHTML = '<button class="btn btn-primary" onClick="gameSpeed(500)">x2</button>';
		}
		else if (upgrades[i].id == "timewarp2" && upgrades[i].purchased == true) {
			document.getElementById("speed5").innerHTML = '<button class="btn btn-primary" onClick="gameSpeed(200)">x5</button>';
		}
	}
	game.refreshSpeed = 1000;
	theGame = window.clearInterval(theGame);
	runGame();
	game.init = true;
};

//----------------------------------------------------------------//
//------------------------ DYNAMIC HTML --------------------------//
//----------------------------------------------------------------//

//Let's read our spellbook!
var readSpells = function() {
	//First we must clear our mind...
	document.getElementById("spellbook").innerHTML = '';
	for (i = 0; i <= 2; i++) {
		document.getElementById("spellbook" + i).innerHTML = '';
	}
	
	//Now CHECK ALL THE SPELLS o/
	addSpellDescriptions();
	for (var i = 0; i < spellbook.length; i++) {
		if (player.mgc.val >= spellbook[i].requiredmgc) {
			//Are you a goody-shiny or a baddy-hurty spell?
			var btncolor = spellType(spellbook[i].type);
			
			//Let's write down what we learned:
			document.getElementById("spellbook").innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + btncolor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].desc + '" onClick="castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xpall" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].xp/spellbook[i].next + '%;"><span id="' + spellbook[i].id + 'progall">' + 100*spellbook[i].xp/spellbook[i].next + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'levelall">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'costall">0</span></p></div></div>';
			document.getElementById("spellbook" + spellbook[i].type).innerHTML += '<div class="row"><div class="col-xs-5"><button class="btn ' + btncolor + ' btn-block" data-toggle="tooltip" data-placement="top" title="' + spellbook[i].desc + '" onClick="castSpell(\'' + spellbook[i].id + '\')">' + spellbook[i].name + '</button></div><div class="col-xs-7"><div class="progress"><div id="' + spellbook[i].id + 'xp" class="progress-bar" role="progressbar" style="width: ' + 100*spellbook[i].xp/spellbook[i].next + '%;"><span id="' + spellbook[i].id + 'prog">' + 100*spellbook[i].xp/spellbook[i].next + '%</span></div></div></div></div><div class="row"><div class="col-xs-5">Level: <span id="' + spellbook[i].id + 'level">0</span></div><div class="col-xs-6"><p class="text-right">Mana Cost: <span id="' + spellbook[i].id + 'cost">0</span></p></div></div>';
			spellbook[i].learned = true;
			
			//Now we update our HTML:
			document.getElementById(spellbook[i].id + "progall").innerHTML = Math.round(100 * percentage(spellbook[i].xp, spellbook[i].next))/100 + "%";
			document.getElementById(spellbook[i].id + "costall").innerHTML = spellCost(spellbook[i]);
			document.getElementById(spellbook[i].id + "levelall").innerHTML = spellbook[i].level;
			document.getElementById(spellbook[i].id + "prog").innerHTML = Math.round(100 * percentage(spellbook[i].xp, spellbook[i].next))/100 + "%";
			document.getElementById(spellbook[i].id + "cost").innerHTML = spellCost(spellbook[i]);
			document.getElementById(spellbook[i].id + "level").innerHTML = spellbook[i].level;
		}
	}

	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip(); 
	});
};

//Take a look at our shopping list!
var readUpgrades = function() {
	//Scratch all this, let's go from the beginning:
	document.getElementById("upgrades").innerHTML = '';
	
	//Look at all these nice upgrades!
	for (var i = 0; i < upgrades.length; i++) {
		if ((resources.excelia >= upgrades[i].exceliacost || upgrades[i].shown === true) && upgrades[i].purchased === false) {
			upgrades[i].shown = true;
			document.getElementById("upgrades").innerHTML += '<div class="row"><div class="col-xs-7"><button class="btn btn-primary btn-block" data-toggle="tooltip" data-placement="top" title="' + upgrades[i].desc + '" onClick="buyUpgrade(\'' + upgrades[i].id + '\')">' + upgrades[i].name + '</button></div><div class="col-xs-5"><p>(Cost: ' + upgrades[i].exceliacost + ')</p></div></div><div class="row" style="height: 5px;"></div>';
		}
	}
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip(); 
	});
};

//Are we buffed or not?
var readToggBuffs = function() {
	//Clean whatever is there
	document.getElementById("toggleable").innerHTML = '';
	
	//Can I healz?
	var bhStatus = findUpgrade("battlehealing");
	if (buffs.battleHealing == true || bhStatus.purchased == true) {
		var bhOnOff;
		if (buffs.battleHealing) {
			bhOnOff = "ON";
		}
		else {
			bhOnOff = "OFF";
		}
		document.getElementById("toggleable").innerHTML += '<button type="button" class="list-group-item" onClick="setBattleHealing()"><span class="badge">' + bhOnOff + '</span>Battle Healing</button>';
	}
}

//Let's get buffed!
var readPermBuffs = function() {
	//Our body is a clean slate
	document.getElementById("permanent").innerHTML = '';
	
	//You don't even need to play anymore
	if (buffs.autoCrawlPercent !== 0) {
		document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">' + buffs.autoCrawlPercent + '%</span>Auto Crawl</li>';
	}
	if (buffs.exceliaMultiplier !== 1) {
		document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + buffs.exceliaMultiplier + '</span>Excelia Gain</li>';
	}
	if (buffs.exceliaBless !== 0) {
		document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">' + buffs.exceliaBless + '%</span>Excelia Saved Upon Death</li>';
	}
	if (buffs.aethericLevel !== 0) {
		document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">+' + buffs.aethericLevel + '</span>Exploration Mana per Second</li>';
	}
	if (buffs.spellMasteryMultiplier !== 1) {
		document.getElementById("permanent").innerHTML += '<li class="list-group-item"><span class="badge">x' + buffs.spellMasteryMultiplier + '</span>Spell Level Gain</li>';
	}
};

//Steroids aren't forever!
var readTempBuffs = function(decrease) {
	//I'm so tired of all this
	document.getElementById("temporary").innerHTML = '';
	
	//You're so durable!
	if (buffs.aegis !== 0) {
		if (decrease) {
			buffs.aegis--;
		}
		document.getElementById("temporary").innerHTML += '<li class="list-group-item"><span class="badge">' + Math.round(buffs.aegis) + '</span>Aegis</li>';
	}
	
	//Puny shield
	if (buffs.barrier !== 0) {
		document.getElementById("temporary").innerHTML += '<li class="list-group-item"><span class="badge">' + Math.round(buffs.barrier) + '</span>Barrier</li>';
	}
	
	//HULK SMASH
	if (buffs.rage !== 0) {
		if (decrease) {
			buffs.rage--;
		}
		document.getElementById("temporary").innerHTML += '<li class="list-group-item"><span class="badge">' + Math.round(buffs.rage) + '</span>Rage</li>';
	}
};

//----------------------------------------------------------------//
//--------------------- AUXILIARY FUNCTIONS ----------------------//
//----------------------------------------------------------------//

//It's easy to calculate percentages!
var percentage = function(val, maxval) {
	return (100*(val/maxval));
};

//How much does a spellcast cost?
var spellCost = function(arg) {
	if (arg.type == 2) {
		return Math.floor(arg.baseMP - Math.pow(arg.level, 2));
	}
	else {
		return Math.floor(arg.baseMP + Math.pow(arg.level, 2));
	}
};

//This is how much we hit
var damageFormula = function(str, dex, enemyCon, enemyHP) {
	var damage = ((2*str - enemyCon/2) * dex/10);
	if (damage < 0) {
		damage = 0;
	}
	else if (damage > enemyHP) {
		damage = enemyHP;
	}
	return damage;
};

//----------------------------------------------------------------//
//----------------------- PLAYER FUNCTIONS -----------------------//
//----------------------------------------------------------------//

//Update HP/MP values.
//arg can be player.hp or player.mp
//Number is always an integer
var updateCondition = function(arg, number) {
	//Change the number!
	arg.curval += number;
	
	//Don't go below 0 HP!
	if (arg.curval < 0) {
		arg.curval = 0;
	}
	
	//Don't go over max HP!
	else if (arg.curval > arg.maxval) {
		arg.curval = arg.maxval;
	}
	
	//Update all the related HTML!
	document.getElementById(arg.id).innerHTML = Math.floor(arg.curval);
	document.getElementById(arg.id + "max").innerHTML = arg.maxval;
	document.getElementById(arg.id + "bar").style.width = percentage(arg.curval, arg.maxval) + "%";
};

//Update max HP/MP values.
//arg can be player.hp or player.mp
var updateMaxCondition = function(arg) {
	//Max HP is 4*(CON^2)
	if (arg.id == "hp") {
		arg.maxval = Math.pow(player.con.val, 2) * 4;
	}
	
	//Max MP is 2*(MGC^2)
	else if (arg.id == "mp") {
		arg.maxval = Math.pow(player.mgc.val, 2) * 2;
	}
};

//Update the stats.
//arg can be player.(any stat)
//Number doesn't need to be integer
var updateStat = function(arg, number) {
	//Increase the XP!
	arg.xp += number;
	
	//Did we level up?
	//Exp for next level is 3*(PREV^2 + PREV)
	while (arg.xp >= arg.next) {
		arg.val++;
		arg.xp -= arg.next;
		arg.next = (Math.pow(arg.val, 2) + arg.val) * 3;
		
		//If it was CON, we need to update MAX HP!
		//If it was MGC, we need to update MAX MP!
		if (arg.id == "con") {
			updateMaxCondition(player.hp);
		}
		else if (arg.id == "mgc") {
			updateMaxCondition(player.mp);
			readSpells();
		}
	}
	
	//Let's update the HTMLs!
	document.getElementById(arg.id).innerHTML = arg.val;
	document.getElementById(arg.id + "prog").style.width = percentage(arg.xp, arg.next) + "%";
	document.getElementById(arg.id + "per").innerHTML = Math.round(100 * percentage(arg.xp, arg.next))/100 + "%";
};

//----------------------------------------------------------------//
//----------------------- BATTLE FUNCTIONS -----------------------//
//----------------------------------------------------------------//

//Are we going to fight a monster?
var battleChance = function() {
	//Roll the dice!
	var check = Math.random()*100;
	
	//BATTLE MUSIC INTENSIFIES
	if (check <= tower[player.curfloor].density) {
		game.found = player.curfloor + (Math.floor(Math.random()*3))-1;
		if (game.found < 0) {
			game.found = 0;
		}
		else if (game.found >= monster.length) {
			game.found = monster.length-1;
		}
		battle(monster[game.found]);
	}
};

//This is where the real fun is
var battle = function(arg) {
	//What am I battling against?
	if (game.inbattle === false) {
		loadMonsterInfo(arg);
	}
	
	//The intense battle continues
	else {
		//This is how much I hit
		var playerAttackDamage = damageFormula(player.str.val, player.dex.val, arg.con, arg.curhp);
		var monsterAttackDamage;
		if (buffs.rage !== 0) {
			playerAttackDamage *= 5;
			monsterAttackDamage *= 2;
			if (playerAttackDamage > arg.curhp) {
				playerAttackDamage = arg.curhp;
			}
			if (monsterAttackDamage > player.hp.cur) {
				monsterAttackDamage = player.hp.cur;
			}
		}
		if (arg.status == 1) {
			monsterAttackDamage = damageFormula(arg.str, arg.dex/2, player.con.val, player.hp.curhp);
		}
		else {
			monsterAttackDamage = damageFormula(arg.str, arg.dex, player.con.val, player.hp.curhp);
		}
		
		if (buffs.battleHealing && player.hp.curval <= player.hp.maxval/2 && buffs.rage === 0) {
			castSpell("cure");
		}
		
		//Damage makes me stronger
		if (buffs.aegis === 0) {
			if (buffs.barrier > 0) {
				if (monsterAttackDamage > buffs.barrier) {
					monsterAttackDamage -= buffs.barrier;
					updateCondition(player.hp, -monsterAttackDamage);
					buffs.barrier = 0;
				}
				else {
					buffs.barrier -= monsterAttackDamage;
				}
				readTempBuffs(false);
			}
			else {
				updateCondition(player.hp, -monsterAttackDamage);
			}
		}
		updateStat(player.str, (arg.str/player.str.val));
		updateStat(player.con, (arg.con/player.con.val));
		updateStat(player.dex, (arg.dex/player.dex.val));
		
		//Weak monster is dying
		monsterDamage(arg, playerAttackDamage);
		
		//Am I still alive?
		if (player.hp.curval <= 0) {
			playerDeath(arg);
		}
	}
};

//This is how much they suffer
var monsterDamage = function(arg, damage) {
	arg.curhp -= damage;
	document.getElementById("monsterhp").innerHTML = Math.floor(arg.curhp);
	document.getElementById("monsterbar").style.width = percentage(arg.curhp, arg.hp) + "%";
	if (arg.curhp <= 0) {
		monsterDeath(arg);
	}
};

//Cry me a river
var monsterDeath = function(arg) {
	game.inbattle = false;
	document.getElementById("battlestatus").innerHTML = "You have defeated the " + arg.name + "!";
	updateStat(player.str, arg.str);
	updateStat(player.con, arg.con);
	updateStat(player.dex, arg.dex);
	arg.killed += 1;
	gainExcelia(arg);
	
	//Restoring monster to default
	arg.curhp = arg.hp;
	arg.status = 0;
	
	if (game.resting) {
		if (tower[player.curfloor].size == tower[player.curfloor].explored && player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Search for Monsters</button>';
		}
		else if (player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Explore Floor</button>';
		}
	}
};

//I'm working on it!
var loadMonsterInfo = function(arg) {
	document.getElementById("monstername").innerHTML = arg.name;
	document.getElementById("monsterhp").innerHTML = arg.hp;
	document.getElementById("monsterstr").innerHTML = arg.str;
	document.getElementById("monsterdex").innerHTML = arg.dex;
	document.getElementById("monstercon").innerHTML = arg.con;
	document.getElementById("monsterbar").style.width = percentage(arg.curhp, arg.hp) + "%";
	document.getElementById("battlestatus").innerHTML = "You are attacked by a " + arg.name + "!";
	game.inbattle = true;
};

//RIP me
var playerDeath = function(arg) {
	game.inbattle = false;
	document.getElementById("battlestatus").innerHTML = "You have been defeated by the " + arg.name + "!";
	changeFloor(-player.curfloor);
	updateExcelia(-((100-buffs.exceliaBless)*resources.excelia/100));
	player.str.val -= Math.floor(player.str.val/10);
	player.dex.val -= Math.floor(player.dex.val/10);
	player.con.val -= Math.floor(player.con.val/10);
	player.spd.val -= Math.floor(player.spd.val/10);
	player.mgc.val -= Math.floor(player.mgc.val/10);
	updateStat(player.str, -player.str.xp);
	updateStat(player.dex, -player.dex.xp);
	updateStat(player.con, -player.con.xp);
	updateStat(player.spd, -player.spd.xp);
	updateStat(player.mgc, -player.mgc.xp);
	arg.curhp = arg.hp;
	readSpells();
};

//----------------------------------------------------------------//
//--------------------- EXPLORATION FUNCTIONS --------------------//
//----------------------------------------------------------------//

//Switch between rest/explore
var explore = function() {
	//I'm not fighting anything
	if (game.inbattle === false) {
		//I'm fully restored, let's go
		if (game.resting && player.hp.curval == player.hp.maxval && player.mp.curval == player.mp.maxval) {
			game.resting = false;
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Rest</button>';
		}
		
		//Wait, I'm almost done
		else if (game.resting) {
			game.queued = true;
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-success btn-block" onClick="explore()">Exploration Queued</button>';
		}
		
		//Okay, time to rest
		else {
			game.resting = true;
			if (tower[player.curfloor].size == tower[player.curfloor].explored && player.curfloor !== 0) {
				document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Search for Monsters</button>';
			}
			else if (player.curfloor !== 0) {
				document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Explore Floor</button>';
			}
		}
	}
	
	//Down the rabbit hole we go
	else {
		game.resting = true;
		document.getElementById("restwalk").innerHTML = '<button class="btn btn-success btn-block" onClick="explore()">Resting Queued</button>';
	}
};

//I'm walking down the street on the boulevard of broken dreams
var exploreFloor = function() {
	//There is still more to see
	if (tower[player.curfloor].explored < tower[player.curfloor].size) {
		tower[player.curfloor].explored += player.spd.val/10;
		if (tower[player.curfloor].explored > tower[player.curfloor].size) {
			tower[player.curfloor].explored = tower[player.curfloor].size;
		}
		document.getElementById("floorbar").style.width = percentage(tower[player.curfloor].explored, tower[player.curfloor].size) + "%";
		document.getElementById("explperc").innerHTML = Math.round(100 * percentage(tower[player.curfloor].explored, tower[player.curfloor].size))/100 + "%";
	}
	
	//Are we there yet?
	if (tower[player.curfloor].stairpos <= tower[player.curfloor].explored && tower[player.curfloor].advallowed === 0 && player.curfloor < monster.length) {
		tower[player.curfloor].advallowed = 1;
		document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="changeFloor(1)">Proceed to Floor <span id="nextfloor">0</span></button>';
		document.getElementById("nextfloor").innerHTML = player.curfloor + 1;
	}
	
	//My calfs are getting tougher
	if (tower[player.curfloor].explored != tower[player.curfloor].size) {
		updateStat(player.spd, player.spd.val/10);
	}
	battleChance();
};

//I hate stairs so much
var changeFloor = function(number) {
	//This many floors!
	player.curfloor += number;
	document.getElementById("floor").innerHTML = player.curfloor;
	document.getElementById("floorbar").style.width = percentage(tower[player.curfloor].explored, tower[player.curfloor].size) + "%";
	document.getElementById("explperc").innerHTML = Math.round(100 * percentage(tower[player.curfloor].explored, tower[player.curfloor].size))/100 + "%";
	
	//I can go to the next floor
	if (tower[player.curfloor].advallowed == 1 && player.curfloor < monster.length) {
		document.getElementById("advbut").innerHTML = '<button class="btn btn-default btn-block" onClick="changeFloor(1)">Proceed to Floor <span id="nextfloor">0</span></button>';
		document.getElementById("nextfloor").innerHTML = player.curfloor + 1;
	}
	else {
		document.getElementById("advbut").innerHTML = '';
	}
	
	//If I'm not at the bottom, I can go down
	if (player.curfloor !== 0) {
		document.getElementById("retbut").innerHTML = '<button class="btn btn-default btn-block" onClick="changeFloor(-1)">Back to Floor <span id="prevfloor">0</span></button>';
		document.getElementById("prevfloor").innerHTML = player.curfloor - 1;
	}
	else {
		document.getElementById("retbut").innerHTML = '';
	}
	
	//Have I reached the bottom?
	if (player.curfloor === 0) {
		game.resting = true;
		document.getElementById("restwalk").innerHTML = '';
	}
	
	//Am I resting?
	if (game.resting) {
		if (tower[player.curfloor].size == tower[player.curfloor].explored && player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Search for Monsters</button>';
		}
		else if (player.curfloor !== 0) {
			document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Explore Floor</button>';
		}
	}
	else {
		document.getElementById("restwalk").innerHTML = '<button class="btn btn-default btn-block" onClick="explore()">Rest</button>';
	}
};

//----------------------------------------------------------------//
//---------------------- RESOURCES FUNCTIONS ---------------------//
//----------------------------------------------------------------//

//Give me souls! More souls!
var gainExcelia = function(arg) {
	var gain = buffs.exceliaMultiplier * (arg.str + arg.con + arg.dex)/15;
	updateExcelia(gain);
	readUpgrades();
};

//Where has my stuff gone?
var updateExcelia = function(number) {
	resources.excelia += number;
	document.getElementById("excelia").innerHTML = Math.round(100*resources.excelia)/100;
};

//----------------------------------------------------------------//
//----------------------- UPGRADE FUNCTIONS ----------------------//
//----------------------------------------------------------------//

//Where is our upgrade?
var findUpgrade = function(upgradeId) {
	for (i = 0; i < upgrades.length; i++) {
		if (upgrades[i].id == upgradeId) break;
	}
	return upgrades[i];
}

//Let's cheat our way up!
var buyUpgrade = function(upgradeId) {
	//Where's the one we want?
	for (i = 0; i < upgrades.length; i++) {
		if (upgrades[i].id == upgradeId) break;
	}
	
	//Oh, here it is. Do we have enough?
	if (resources.excelia >= upgrades[i].exceliacost) {
		updateExcelia(-upgrades[i].exceliacost);
		upgrades[i].purchased = true;
		readUpgrades();
		
		//Let's activate it!
		//You don't even need any higher than that.
		if (upgrades[i].id == "autocrawl1") {
			setAutoCrawl(10);
		}
		else if (upgrades[i].id == "timewarp1") {
			document.getElementById("speed2").innerHTML = '<button class="btn btn-primary" onClick="gameSpeed(500)">x2</button>';
		}
		else if (upgrades[i].id == "aetheric") {
			buffs.aethericLevel += 1;
		}
		else if (upgrades[i].id == "timewarp2") {
			document.getElementById("speed5").innerHTML = '<button class="btn btn-primary" onClick="gameSpeed(200)">x5</button>';
		}
		else if (upgrades[i].id == "battlehealing") {
			buffs.battleHealing = true;
		}
		else if (upgrades[i].id == "doubleexcelia") {
			buffs.exceliaMultiplier *= 2;
		}
		else if (upgrades[i].id == "adeptmage") {
			buffs.spellMasteryMultiplier *= 2;
		}
		else if (upgrades[i].id == "blessings") {
			buffs.exceliaBless += 10;
		}
	}
	
	readPermBuffs();
	readToggBuffs();
};

var setBattleHealing = function() {
	buffs.battleHealing = !buffs.battleHealing;
	readToggBuffs();
}

//How far are you willing to go?
var setAutoCrawl = function(number) {
	buffs.autoCrawlPercent = number;
};

//----------------------------------------------------------------//
//------------------------ SPELL FUNCTIONS -----------------------//
//----------------------------------------------------------------//

//Describe Spells:
var addSpellDescriptions = function() {
	for (i = 0; i < spellbook.length; i++) {
		if (spellbook[i].id == "cure") {
			spellbook[i].desc = "Heal " + curePotency(spellbook[i]) + " HP";
		}
		else if (spellbook[i].id == "fireball") {
			spellbook[i].desc = "Deal " + fireballPotency(spellbook[i]) + " fire damage.";
		}
		else if (spellbook[i].id == "barrier") {
			spellbook[i].desc = "Put up a barrier that will protect you from " + barrierPotency(spellbook[i]) + " damage.";
		}
		else if (spellbook[i].id == "aegis") {
			spellbook[i].desc = "Take no damage for " + aegisPotency(spellbook[i]) + " seconds.";
		}
		else if (spellbook[i].id == "slow") {
			spellbook[i].desc = "Halve an enemy's DEX.";
		}
		else if (spellbook[i].id == "rage") {
			spellbook[i].desc = "Fill yourself with rage for " + ragePotency(spellbook[i]) + " seconds. You deal 5x damage, however, you take 2x damage and cannot cast other spells."
		}
		else if (spellbook[i].id == "clairvoyance") {
			spellbook[i].desc = "Project your mind further into the tower, and see areas you have not yet explored.";
		}
	}
};

//Spell, spell, which type are you?
var spellType = function(number) {
	//Good spell!
	if (number === 0) {
		return "btn-info";
	}
	
	//Even better spell!
	else if (number == 1) {
		return "btn-danger";
	}
	
	//Saboteur
	else if (number == 2) {
		return "btn-warning";
	}
	
	//Hacker
	else if (number == 3) {
		return "btn-success";
	}
};

//The more we cast, the better we get
//Arg can be any spell, number can be any number (most useful comment ever)
var spellLevel = function(arg, number) {
	//Increase spell exp
	arg.xp += number;
	
	//Did our spell level up?
	while (arg.xp >= arg.next) {
		arg.level++;
		arg.xp -= arg.next;
		arg.next = Math.pow(2,arg.level) * arg.baseNext;
		document.getElementById(arg.id + "costall").innerHTML = Math.floor(arg.baseMP + Math.pow(arg.level, 2));
		document.getElementById(arg.id + "cost").innerHTML = Math.floor(arg.baseMP + Math.pow(arg.level, 2));
		readSpells();
	}
	
	//Dynamic HTML is our friend
	document.getElementById(arg.id + "xpall").style.width = percentage(arg.xp, arg.next) + "%";
	document.getElementById(arg.id + "progall").innerHTML = Math.round(100 * percentage(arg.xp, arg.next))/100 + "%";
	document.getElementById(arg.id + "levelall").innerHTML = arg.level;
	document.getElementById(arg.id + "xp").style.width = percentage(arg.xp, arg.next) + "%";
	document.getElementById(arg.id + "prog").innerHTML = Math.round(100 * percentage(arg.xp, arg.next))/100 + "%";
	document.getElementById(arg.id + "level").innerHTML = arg.level;
};

//Do you wanna cast a spell? It doesn't have to be a spell!
var castSpell = function(spellId) {
	//I wish you would tell me which.
	for (var i = 0; i < spellbook.length; i++) {
		if (spellbook[i].id == spellId) break;
	}
	
	//Go away, Anna
	var mpCost = spellCost(spellbook[i]);
	if (player.mp.curval >= mpCost && buffs.rage === 0) {
		//Let it cast! Let it cast! Can't hold it back anymore!
    var castSuccess;
		if (spellbook[i].id == "cure") {
			castSuccess = castCure(spellbook[i]);
		}
		else if (spellbook[i].id == "fireball") {
			castSuccess = castFireball(spellbook[i]);
		}
		else if (spellbook[i].id == "barrier") {
			castSuccess = castBarrier(spellbook[i]);
		}
		else if (spellbook[i].id == "slow") {
			castSuccess = castSlow(spellbook[i]);
		}
		else if (spellbook[i].id == "aegis") {
			castSuccess = castAegis(spellbook[i]);
		}
		else if (spellbook[i].id == "rage") {
			castSuccess = castRage(spellbook[i]);
		}
		else if (spellbook[i].id == "clairvoyance") {
			castSuccess = castClairvoyance(spellbook[i]);
		}
		
		//These spells never bothered me anyway.
		if (castSuccess === true) {
			updateCondition(player.mp, -mpCost);
			spellLevel(spellbook[i], mpCost);
			updateStat(player.mgc, buffs.spellMasteryMultiplier * (spellbook[i].level + 1 + mpCost/10));
			updateCondition(player.mp, 0);
		}
	}
};

//Voodoo magic!
var castCure = function(arg) {
	//Don't be a crybaby, you're not even hurt.
	if (player.hp.curval == player.hp.maxval) {
		return false;
	}
	
	//Okay, time for your medicine.
	else {
		var cureValue = curePotency(arg);
		if (player.hp.maxval - player.hp.curval < cureValue) {
			cureValue = player.hp.maxval - player.hp.curval;
		}
		updateCondition(player.hp, cureValue);
		return true;
	}
};

//How much will I heal?
var curePotency = function(arg) {
	return Math.floor(25 * Math.pow(1.5, arg.level) * Math.pow(1.1, player.mgc.val));
};

//Your own personal fireplace.
var castFireball = function(arg) {
	//Jeez, you're not even fighting. Let's not start a fire, okay?
	if (game.inbattle === false) {
		return false;
	}
	
	//BURN IT!!!!
	else {
		var damageValue = fireballPotency(arg);
		if (monster[game.found].curhp <= damageValue) {
			damageValue = monster[game.found].curhp;
		}
		monsterDamage(monster[game.found], damageValue);
		return true;
	}
};

//How much will my fireball hit for?
var fireballPotency = function(arg) {
	return Math.floor(15 * Math.pow(1.5, arg.level) * Math.pow(1.1, player.mgc.val));
};

//Gain a shield.
var castBarrier = function(arg) {
	var potency = barrierPotency(arg);
	if (buffs.barrier == potency) {
		return false;
	}
	else {
		buffs.barrier = potency;
		readTempBuffs(false);
		return true;
	}
};

//How much will I block?
var barrierPotency = function(arg) {
	return Math.floor(50 + 50*arg.level + (10*player.mgc.val)-10);
};

//Become invulnerable
var castAegis = function(arg) {
	if (buffs.aegis !== 0) {
		return false;
	}
	else {
		buffs.aegis = aegisPotency(arg);
		readTempBuffs(false);
		return true;
	}
};

//How long do I have magic star?
var aegisPotency = function(arg) {
	return Math.floor(5 + 5*arg.level + (1*player.mgc.val)-50);
};

//The monsters are gonna get behind
var castSlow = function(arg) {
	if (game.inbattle === false || monster[game.found].status !== 0) {
		return false;
	}
	else {
		monster[game.found].status = 1;
		document.getElementById("monsterdex").innerHTML = monster[game.found].dex/2;
		return true;
	}
};

//I'M SO MAD RIGHT NOW
var castRage = function(arg) {
	if (game.inbattle === false) {
		return false;
	}
	else {
		buffs.rage = ragePotency(arg);
		readTempBuffs(false);
		return true;
	}
}

//Count to 10
var ragePotency = function(arg) {
	return Math.floor(5 + 1*arg.level + (0.2*player.mgc.val)-5);
};

//Look deep into the dungeon
var castClairvoyance = function(arg) {
	if (tower[player.curfloor].explored == tower[player.curfloor].size) {
		return false;
	}
	else {
		tower[player.curfloor].explored += (10 + 2*arg.level + (0.4*player.mgc.val)-4);
		if (tower[player.curfloor].explored >= tower[player.curfloor].size) {
			tower[player.curfloor].explored = tower[player.curfloor].size;
		}
		document.getElementById("floorbar").style.width = percentage(tower[player.curfloor].explored, tower[player.curfloor].size) + "%";
		document.getElementById("explperc").innerHTML = Math.round(100 * percentage(tower[player.curfloor].explored, tower[player.curfloor].size))/100 + "%";
		return true;
	}
}

//Now all that is left...
runGame();