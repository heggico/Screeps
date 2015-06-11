var harvester = require('harvester');
var builders = require('builders');
var guards = require('guards');
var spawn  = Game.spawns['Spawn1'];


for(var name in Game.creeps) {
	var creep = Game.creeps[name];

	if(creep.memory.role == 'harvester') {
    	if(!creep.memory.targetSourceId) {
    		var source = creep.pos.findClosest(FIND_SOURCES_ACTIVE);
    		creep.memory.targetSourceId = source.id;
    	}  
		harvester(creep);
	}
	
/*	if(creep.memory.role == 'builder') {
	    builders(creep);
	}
	
	if(creep.memory.role == 'guard') {
	    guards(creep);
    }
    */
}

var countHarvesters  = _.filter(Game.creeps, { memory: {role: 'harvester'}}).length;
var countBuilder  = _.filter(Game.creeps, { memory: {role: 'builder'}}).length;
var countGuard  = _.filter(Game.creeps, { memory: {role: 'guard'}}).length;

if ((Game.spawns['Spawn1'].energy >= 300) && (countHarvesters < 6)){
    Game.spawns['Spawn1'].createCreep( [WORK, CARRY, CARRY, MOVE, MOVE],null,{role: 'harvester'});
}

/*if ((Game.spawns['Spawn1'].energy >= 300) && (countBuilder < 2)){
    Game.spawns['Spawn1'].createCreep( [WORK, WORK, CARRY, CARRY, MOVE],null,{role: 'builder'});
}*/