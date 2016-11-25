var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    
    // Garbage collection
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    // Tower control
    
    var tower = Game.getObjectById('58369cde3a4dd49f0a88d65b');
    if(tower) {
        /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }*/

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

   //console.log('Harvesters: ' + harvesters.length);
   //console.log('Builders: ' + builders.length);
   //console.log('Upgraders: ' + upgraders.length);
    //console.log('Upgraders: ' + upgraders.length);
   
    if(harvesters.length < 3) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE], null, {role: 'harvester'});
    } else if(builders.length < 3) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: 'builder'});
    } else if(upgraders.length < 6) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], null, {role: 'upgrader'});
    } else if(repairers.length < 1) {
        Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE], null, {role: 'repairer'});
    }
    
    //console.log('Upgraders: ' + upgraders.length + ' Builders: ' + builders.length + ' Harvesters: ' + harvesters.length + ' Repairers: ' + repairers.length);
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }
}