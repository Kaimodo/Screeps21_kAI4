interface Tasks {
    uuid: number;
    taskType: Task;
}

/**
 * Several Tasks Creeps can do
 * @interface Task
 */
interface Task {
    minerTask: MinerTask;
}

/**
 * A task given from the Room to the Creep
 * @export MinerTask
 * @interface MinerTask
 */
interface MinerTask {
    taskId: number;
    minerPosition: PositionPlusTarget;
    assignedMinerName?: string;
    sourceContainer: PositionPlusTarget | undefined;
}

/**
 * A Position (x/y)
 * @export MyPosition
 * @interface MyPosition
 * {x} X-positon
 * {y} Y-positon
 */
interface MyPosition
 {
     x: number;
     y: number;
 }
 /**
  * Position (x/y)
  * @export PositionPlusTarget
  * @interface PositionPlusTarget
  */
interface PositionPlusTarget
 {
     x: number;
     y: number;
     targetId: string;
 }
 /**
  * A Room Position (x/y) plus target
  * @export RoomPositionPlusTarget
  * @interface RoomPositionPlusTarget
  */
interface RoomPositionPlusTarget
 {
     roomTarget: string;
     x: number;
     y: number;
     targetId: string;
 }
