var System = function() {
	var ticks = 0;
	var refreshSpeed = 1000;

	var init = false;
	var idleMode = false;

	var theGame;
	var idleHealthSlider;
	var idleManaSlider;

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
		inventory.save();
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
		inventory.load();
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

	var loadIdleManaSlider = function() {
		idleManaSlider = new Slider("#idleMpRest", {
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
				if (buffs.getBarrierLeft() === 0 && buffs.getAutoBarrierCast()) {
					spells.castSpell("barrier");
				}
				if ((100*(player.getHealthCurrentValue()/player.getHealthMaximumValue()) >= idleHealthSlider.getValue()) && (100*(player.getManaCurrentValue()/player.getManaMaximumValue())) >= idleManaSlider.getValue() && !player.getResting()) {
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
		loadIdleManaSlider();
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
		inventory.updateInventoryHTML();
		inventory.updateInventory();
		inventory.updateEquipment();
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

$.get( "https://raw.githubusercontent.com/shiroge/shiroge.github.io/master/CHANGELOG.md", function( data ) {

	var converter       = new showdown.Converter(),
		md_content        = data,
		md_to_html      = converter.makeHtml( md_content );
	$("#changelog").html( md_to_html );

});

var system = new System();
system.runGame();