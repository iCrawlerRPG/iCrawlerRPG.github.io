var Monsters = function() {
    var inBossBattle = false;
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
        {name:"Orc Child", killed:0},

        //Third Tier
        {name: "Stone Golem", killed: 0},
        {name: "Lesser Elemental", killed: 0},
        {name: "Kobold Chieftain", killed: 0},
        {name: "Weakened Minotaur", killed: 0},
        {name: "Troll Warrior", killed: 0},
        {name: "Wisp", killed: 0},
        {name: "Dragon Hatchling", killed: 0},
        {name: "Goblin Shaman", killed: 0},
        {name: "Giant Snake", killed: 0},
        {name: "Mummy", killed: 0},

        //Fourth Tier
        {name: "Elemental", killed: 0},
        {name: "Lesser Imp", killed: 0},
        {name: "Lizardman", killed: 0},
        {name: "Orc", killed: 0},
        {name: "Troll Chieftain", killed: 0},
        {name: "Cyclops", killed: 0},
        {name: "Young Vampire", killed: 0},
        {name: "Harpy", killed: 0},
        {name: "Empowered Wisp", killed: 0},
        {name: "Ancient Mummy", killed: 0},

        //Fifth Tier
        {name: "Imp", killed: 0},
        {name: "Orc Soldier", killed: 0},
        {name: "Young Minotaur", killed: 0},
        {name: "Floating Eye", killed: 0},
        {name: "Banshee", killed: 0},
        {name: "Young Dragon", killed: 0},
        {name: "Cyclops Warrior", killed: 0},
        {name: "Lizardman Archer", killed: 0},
        {name: "Living Armor", killed: 0},
        {name: "Frenzied Goblin", killed: 0}
    ];

    var bossList = [
        {name: "The First Guardian, Alstroemeria", currentHealth: 91204, maximumHealth: 91204, strength: 151, dexterity: 151, constitution: 151, status: 0},
        {name: "The Second Guardian, Bouvardia", currentHealth: 372100, maximumHealth: 372100, strength: 305, dexterity: 305, constitution: 305, status: 0},
        {name: "The Third Guardian, Clarkia", currentHealth: 864900, maximumHealth: 864900, strength: 465, dexterity: 465, constitution: 465, status: 0},
        {name: "The Fourth Guardian, Dianthus", currentHealth: 1638400, maximumHealth: 1638400, strength: 640, dexterity: 640, constitution: 640, status: 0},
        {name: "The Fifth Guardian, Erigeron", currentHealth: 2930944, maximumHealth: 2930944, strength: 856, dexterity: 856, constitution: 856, status: 0}
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
            savedInstancedMonster: instancedMonster,
            savedInBossBattle: inBossBattle
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
            if (monstersSave.savedInBossBattle !== undefined) {
                inBossBattle = monstersSave.savedInBossBattle;
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

    self.getBossMonster = function(number) {
        return bossList[number];
    };

    self.getInBossBattle = function() {
        return inBossBattle;
    };

    //Setters
    self.setInstancedMonster = function(updatedMonster) {
        instancedMonster = updatedMonster;
    };

    self.setInBossBattle = function(boolean) {
        inBossBattle = boolean;
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
            if (!inBossBattle) {
                document.getElementById("combatlog").innerHTML = "You are attacked by a " + monster.name + "!<br>";
            }
            else {
                document.getElementById("combatlog").innerHTML = "You challenge a floor boss! You begin fighting " + monster.name + "!<br>";
            }
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
                        buffs.updateTemporaryBuffs(true);
                        return true;
                    }
                }
                else {
                    isDead = playerAttacks(monster);
                }
            }
            if (!isDead) {
                isDead = monsterAttacks(monster);
            }
        }
        buffs.updateTemporaryBuffs(true);
    };

    var playerAttacks = function(monster) {
        var damage = damageFormula(player.getStrengthLevel() + player.getStrengthBonus(), player.getDexterityLevel() + player.getDexterityBonus(), monster.constitution, monster.currentHealth);
        if (buffs.getRageTimeLeft() !== 0) {
            damage *= 5;
        }
        if (damage >= monster.currentHealth) {
            damage = monster.currentHealth;
        }
        document.getElementById("combatlog").innerHTML += "You dealt " + Math.round(damage) + " damage to the " + monster.name + ".<br>";
        player.gainExperience(monster, true);
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
        if (!inBossBattle) {
            document.getElementById("combatlog").innerHTML += "You have defeated the " + monster.name + "!<br>";
            if (Math.floor(Math.random()*100) < 10) {
                monsterCrystalDrop(monster);
                inventory.updateInventory();
            }
            updateMonsterKilled(monster.name);
        }
        else {
            document.getElementById("combatlog").innerHTML += "You have defeated a floor boss! " + monster.name + " recognizes your strength and allows you to advance.";
            tower.setBossFound(false);
            tower.setLastBossDefeated(player.getCurrentFloor());
            tower.bossDefeated();
            inBossBattle = false;
        }
        upgrades.gainExcelia(monster);
        player.loadRestButton();
        player.loadExploreButton();
        self.loadMonsterInfo();
    };

    var monsterCrystalDrop = function(monster) {
        var type = Math.floor(Math.random()*5);
        var experience = monster.strength + monster.dexterity + monster.constitution;
        if (type === 0) {
            inventory.createCrystal("Strength", experience);
        }
        else if (type == 1) {
            inventory.createCrystal("Dexterity", experience);
        }
        else if (type == 2) {
            inventory.createCrystal("Constitution", experience);
        }
        else if (type == 3) {
            inventory.createCrystal("Speed", experience);
        }
        else if (type == 4) {
            inventory.createCrystal("Magic", experience);
        }
        document.getElementById("combatlog").innerHTML += "The " + monster.name + " has left an experience crystal behind!<br>";
    }

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
        var damage = damageFormula(monster.strength, monster.dexterity, player.getConstitutionLevel() + player.getConstitutionBonus(), player.getHealthCurrentValue());
        if (buffs.getRageTimeLeft() !== 0) {
            damage = damage*2;
        }
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
        player.gainExperience(monster, false);
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
        if (inBossBattle) {
            inBossBattle = false;
        }
    }
};

var monsters = new Monsters();