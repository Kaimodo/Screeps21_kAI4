// Syntax for adding proprties to `global` (ex "global.log")
declare namespace NodeJS {
    interface Global {
        cc: any;
        Profiler: any;
        log: {
            level: number,
            showSource: boolean,
            showTick: boolean
        };
    }
}
