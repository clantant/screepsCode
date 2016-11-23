var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
   //console.log('Harvesters: ' + harvesters.length);
   if(harvesters.length <= 1) {
       Game.spawns.Spawn1.createCreep([WORK, CARRY, MOVE], null, {role: 'harvester'});
   }
   
   var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
   //console.log('Builders: ' + builders.length);
   if(builders.length <= 3) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'builder'});
   }
   
   var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
   //console.log('Upgraders: ' + upgraders.length);
   if(upgraders.length < 2) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader'});
   }
   
   var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
   //console.log('Upgraders: ' + upgraders.length);
   if(repairers.length < 2) {
       Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer'});
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