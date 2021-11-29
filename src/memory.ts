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
    role: string;
    room: string;
    working?: boolean;
    homeRoom: string;
}

interface FlagMemory { [name: string]: any }
interface SpawnMemory { [name: string]: any }

interface RoomMemory {
    [name: string]: any;
    energyLevel: number;
    controller: StructureController[];
    sources: Source[];
}
