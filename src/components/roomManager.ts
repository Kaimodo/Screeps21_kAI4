import { log } from "tools/logger/logger";

import {ENABLE_DEBUG_MODE} from "config";

import { Emoji } from "tools/Emoji";
import * as Config from "config";

export class RoomManager {
    public static run(room: Room, roomMem: RoomMemory) {
        log.info(`Running on room: ${room.name}`)
        log.debug(`nrg: ${roomMem.energyLevel}`)
        log.debug(`Contr: ${roomMem.controller}`)
        log.debug(`Sources: ${JSON.stringify(roomMem.energySources)}`)


        // Room is Base Room
        if (room.controller) {
            let controllerLevel = room.controller.level
            log.debug(`Found Controller on Level ${controllerLevel}`)
            RoomManager.scanRoom(room, roomMem);
            let techLevel: number = RoomManager.getTechLevel(room, roomMem);

            // TODO Debug
            RoomManager.debugRoom(room, roomMem);

            // TODO TaskManager
            switch (techLevel) {
                case 0: {

                }
                case 1: {

                    break;
                }
            }
            // TODO CreepFactory

            // Loop Creeps
            _.each(Memory.creeps, (creep: Creep) => {
                const creepMem = creep.memory;
                if (creepMem.role === CreepRoles.ROLE_MINER) {
                    // Miner.run(room, roomMem, creep);
                } else if(creepMem.role === CreepRoles.ROLE_BUILDER) {
                    // Builder.run(room, roomMem, creep);
                } else {
                    // RoomManager.assignRoleToCreep(creep, creepMem);
                }
            });
        }
        // TODO Remote Room

    }

    public static scanRoom(room: Room, roomMem: RoomMemory) {
        // log.debug(`INIT: ${room.name}`)

        if (room.controller) {
            roomMem.controller = room.controller;
        }
        roomMem.creeps = room.find(FIND_MY_CREEPS);
        roomMem.creepCount = _.size(roomMem.creeps);
        roomMem.miners = _.filter(roomMem.creeps, (creep) => creep.memory.role === CreepRoles.ROLE_MINER);
        roomMem.energyLevel = room.energyAvailable;
        roomMem.energySources = room.find(FIND_SOURCES);
        roomMem.desiredRampHitPoints = Config.MAX_RAMP_HP;
        roomMem.desiredWallHitPoints = Config.MAX_WALL_HP;
        let structures = room.find(FIND_STRUCTURES);
        roomMem.spawns = _.filter(structures, (structure) => structure.structureType === STRUCTURE_SPAWN) as StructureSpawn[];
        roomMem.containers = _.filter(structures, (structure) => structure.structureType === STRUCTURE_CONTAINER) as StructureContainer[];

    }
    private static getFirstSpawn(room: Room): StructureSpawn | null{
        const spawns: StructureSpawn[] = room.find(FIND_MY_SPAWNS);
        if (spawns.length === 0) {
            return null;
        }
        return spawns[0] as StructureSpawn;
    }

    public static getTechLevel (room: Room, roomMem: RoomMemory) : number {
        if (roomMem.miners.length < roomMem.energySources.length) {
            return 1;
        }
        if (roomMem.containers.length >= roomMem.energySources.length) {
            return 2;
        }
        return 0;
    }

    private static getRoomEnergyLevel(room: Room, roomMem:RoomMemory): number {
        if ((roomMem.techLevel <= 4 && room.energyAvailable < 550) || roomMem.miners.length < 2) {
            return 1; // less than 550
        }
        else if (room.energyCapacityAvailable < 800) {
            return 2;
        }
        else if (room.energyCapacityAvailable < 1300) {
            return 3;
        }
        else if (room.energyCapacityAvailable < 1800) {
            return 4;
        }
        else if (room.energyCapacityAvailable < 2300) {
            return 5;
        }
        else if (room.energyCapacityAvailable < 2800) {
            return 6;
        }
        else if (room.energyCapacityAvailable < 3200) {
            return 7;
        }
        else {
            return 8;
        }
    }

    public static debugRoom(room: Room, roomMem: RoomMemory) {
        // log.debug(`INIT: ${room.name}`)

        if (room.controller) {
            roomMem.controller = room.controller;
        }
        roomMem.creeps = room.find(FIND_MY_CREEPS);
        roomMem.creepCount = _.size(roomMem.creeps);
        roomMem.miners = _.filter(roomMem.creeps, (creep) => creep.memory.role === CreepRoles.ROLE_MINER);
        roomMem.energyLevel = room.energyAvailable;
        roomMem.energySources = room.find(FIND_SOURCES);
        roomMem.desiredRampHitPoints = Config.MAX_RAMP_HP;
        roomMem.desiredWallHitPoints = Config.MAX_WALL_HP;
        let structures = room.find(FIND_STRUCTURES);
        roomMem.spawns = _.filter(structures, (structure) => structure.structureType === STRUCTURE_SPAWN) as StructureSpawn[];
        roomMem.containers = _.filter(structures, (structure) => structure.structureType === STRUCTURE_CONTAINER) as StructureContainer[];

        log.debug(`Creeps: ${JSON.stringify(roomMem.creeps, null, 4)}`)
        log.debug(`CreepCount: ${JSON.stringify(roomMem.creepCount, null, 4)}`)
        log.debug(`Miners: ${JSON.stringify(roomMem.miners, null, 4)}`)
        log.debug(`nrgLevel: ${JSON.stringify(roomMem.energyLevel, null, 4)}`)
        log.debug(`nrgSources: ${JSON.stringify(roomMem.energySources, null, 4)}`)
        log.debug(`Spawns: ${JSON.stringify(roomMem.spawns, null, 4)}`)
        log.debug(`Cont: ${JSON.stringify(roomMem.containers, null, 4)}`)
    }
}
