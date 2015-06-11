module.exports = function (creep) {
    var spawn = Game.spawns['Spawn1'];
    var control = creep.room.controller;
 
    switch(creep.memory.action){
        case "harvesting":
            var source = Game.getObjectById(creep.memory.targetSourceId);
            
    		creep.moveTo(source);
    		creep.harvest(source);
    		
    		if(creep.energy == 100){
    		    if(spawn.energy < spawn.energyCapacity){
                    creep.memory.action = "Moving to Spawn";  
    		    }else{
		            creep.memory.action = "Moving to Controller"; 
    		    }
    		}
            break;
            
        case "Moving to Spawn":
            creep.moveTo(spawn);
			creep.transferEnergy(spawn);
			
			if(creep.energy == 0){
			    creep.memory.action = "harvesting"; 
			}else if (spawn.energy == spawn.energyCapacity){
			    creep.memory.action = "Moving to Controller"; 
			}
			
            break;
            
        case "Moving to Controller":
            creep.moveTo(control);
			creep.upgradeController(control);
			
			if(creep.energy == 0){
			    creep.memory.action = "harvesting"; 
			}else if (spawn.energy < spawn.energyCapacity){
			    creep.memory.action = "Moving to Spawn"; 
			}
			
            break;
        default:
            creep.memory.action = "harvesting"; 
            break;
    }
}