// Game Memory
interface Memory {
    codeVersion?: string;
    date?: string;
    version?: string;
    uuid: number;
    log: any;
    stats: any;
}

interface CreepMemory {
    [name: string]: any;
    role: CreepRoles;
    room: string;
    working?: boolean;
    homeRoom: string;
    assignedTask: Task;
}

interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }

/**
 *
 *
 * @interface RoomMemory
 */
interface RoomMemory {
    [name: string]: any;
    creeps: Creep[];
    creepCount: number;
    miners: Creep[];
    energyLevel: number;
    controller: StructureController;
    energySources: Source[];
    containers: StructureContainer[];
    spawns: StructureSpawn[];
    desiredRampHitPoints?: number;
    desiredWallHitPoints?: number;
    tasks: Tasks[];
}

/**
 * The Creep Roles as Number
 * @export CreepRoles
 * @enum {number}
 */
 const enum CreepRoles
 {
     ROLE_UNASSIGNED = 0,
     ROLE_ALL,
     ROLE_BUILDER,
     ROLE_MINER,
     ROLE_MINEHAULER,
     ROLE_HEALER,
     ROLE_FIGHTER,
     ROLE_RANGER,
     ROLE_CLAIMER,
     ROLE_REMOTEMINER,
     ROLE_REMOTEMINEHAULER,
     ROLE_CUSTOMCONTROL,
     ROLE_UPGRADER,
     ROLE_UPGRADETRANSPORT
 }

