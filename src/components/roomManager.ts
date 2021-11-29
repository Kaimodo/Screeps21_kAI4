import { log } from "tools/logger/logger";

import {ENABLE_DEBUG_MODE} from "config";

import { Emoji } from "tools/Emoji";

export class RoomManager {
    public static run(room: Room, roomMem: RoomMemory) {
        log.info(`Running on room: ${room.name}`)
        log.debug(`nrg: ${roomMem.energyLevel}`)
        log.debug(`Contr: ${roomMem.controller}`)
        log.debug(`Sources: ${JSON.stringify(roomMem.sources)}`)
    }

    public static initRoomMemory(room: Room, roomName: string) {
        log.debug(`INIT: ${roomName}`)
        const roomMem: RoomMemory = Memory.rooms[roomName];
        roomMem.energyLevel = room.energyAvailable;
        roomMem.sources = room.find(FIND_SOURCES);
        //log.debug(`${JSON.stringify(roomMem, null, 4)}`)
        /*

        if (room.controller) {
            roomMem.controller = room.controller;
        }

        */
    }
}
