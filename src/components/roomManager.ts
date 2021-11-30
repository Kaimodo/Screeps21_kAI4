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
    }

    public static initRoomMemory(room: Room, roomName: string) {
        log.debug(`INIT: ${roomName}`)
        const roomMem: RoomMemory = Memory.rooms[roomName];
        roomMem.energyLevel = room.energyAvailable;
        // TODO TASK-Manager for Sources
        roomMem.energySources = room.find(FIND_SOURCES);
        if (room.controller) {
            roomMem.controller = room.controller;
        }
        const firstSpawn = RoomManager.getFirstSpawn(room);
        if (firstSpawn == null) {
            return null;
        }
        roomMem.spawn = firstSpawn;
        roomMem.desiredRampHitPoints = Config.MAX_RAMP_HP;
        roomMem.desiredWallHitPoints = Config.MAX_WALL_HP;

    }
    private static getFirstSpawn(room: Room): StructureSpawn | null{
        const spawns: StructureSpawn[] = room.find(FIND_MY_SPAWNS);
        if (spawns.length === 0) {
            return null;
        }
        return spawns[0] as StructureSpawn;
    }
}
