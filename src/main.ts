const startCpu = Game.cpu.getUsed()
import { ErrorMapper } from "tools/ErrorMapper";

import * as Profiler from "screeps-profiler";
import { USE_PROFILER } from "config";

import * as Inscribe from "screeps-inscribe";

import { log } from "tools/logger/logger";
import {ENABLE_DEBUG_MODE} from "config";

import * as Tools from "tools/tools"

import { ConsoleCommands } from "tools/consolecommands";

import { Emoji, Splash } from './tools/Emoji';

import * as Orga from "./organize.json";

import { StatsManager } from './tools/stats';
import { RoomManager } from "./components/internals";

import * as Config from 'config';






//New Script loaded
console.log(`[${Inscribe.color("New Script loaded", "red")}] ${Emoji.reload}`);
Splash();

global.resetTime = Game.time;
if (USE_PROFILER) {
  log.info("Profiler an: "+ USE_PROFILER);
  Profiler.enable();
}

// Clear Memory
if (!Memory.version || (Memory.version !== Config.TARGET_MEM_VERSION)) {
  const memOld = Memory.version
  Memory.version = Config.TARGET_MEM_VERSION
  log.info(` Memory: ${memOld}/${Memory.version}/${Config.TARGET_MEM_VERSION}`)
  Tools.clearMemory();
}

// Get Script loading time
const elapsedCPU = Game.cpu.getUsed() - startCpu;
console.log(`[${Inscribe.color("Script Loading needed: ", "skyblue") + elapsedCPU.toFixed(2) + " Ticks"}]`);

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  Profiler.wrap(() => {

    if (global.resetTime = Game.time) {
      global.reset = true;
      log.info(`Global reset: ${global.reset}`)
    } else {
      global.reset = false;
    }

    global.cc = ConsoleCommands;
    log.info(`Current game tick is ${Game.time}`);

    // Main Loop here:
    if (!Memory.uuid || Memory.uuid > 1000) {
      Memory.uuid = 0;
    }

    for (const r in Game.rooms) {
      const room: Room = Game.rooms[r];
      const roomMem: RoomMemory = room.memory;
      if (Object.keys(roomMem).length === 0 || global.reset=== true) {
        log.info(`Reset room Memory for ${room.name}`);
        Tools.clearMemory();
      }
      RoomManager.run(room, roomMem);
    }

    Tools.log_info()
    Tools.ClearNonExistingCreeMemory();
    StatsManager.runForAllRooms();
  });
});
