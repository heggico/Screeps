/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('builders'); // -> 'a thing'
 */
 
module.exports = function (creep) {
    var spawn = Game.spawns['Spawn1'];
    var control = creep.room.controller;
    var structures = creep.room.find(Game.STRUCTURES);
    var targets = creep.pos.findNearest(Game.CONSTRUCTION_SITES);
    var damagedRamparts = [ ];
    var toRepair = [ ];
    for(var index in structures){
        var structure = structures[index];
        if(structure.structureType == 'rampart' && structure.hits < (structure.hitsMax - 50)){
            damagedRamparts.push(structure);
        }else if((structure.hits / structure.hitsMax) < 0.5){
			toRepair.push(structure);
        }
    }
    damagedRamparts.sort(function(a, b) {
        return(a.hits - b.hits);
    });
    
    if(damagedRamparts.length){
        creep.moveTo(damagedRamparts[0]);
        creep.repair(damagedRamparts[0]);
    
        return;
    }

	if(toRepair.length)	{
		creep.moveTo(toRepair[0]);
		creep.repair(toRepair[0]);

		return;
	}
    
    if(targets.length) {
		creep.moveTo(targets);
		creep.build(targets);
		
		return;
	}
}