export function randomRange(start: number, end: number) {
  return Math.random() * (end - start) + start;
}

export class TaskQueue {
  delay: number;
  tasks: { delay: number; fn: () => void }[] = [];
  constructor(delay: number) {
    this.delay = delay;
  }

  addTask(delay: number, fn: () => void) {
    this.tasks.push({ delay, fn });
  }
  destory() {
    this.tasks = [];
    clearTimeout(this.doingTask as number);
  }
  private taskCount = 0;
  private doingTask: unknown = 0;
  doTask() {
    this.taskCount++;
    const task = this.tasks[this.taskCount % this.tasks.length];
    this.doingTask = setTimeout(() => {
      task.fn();
      this.doTask();
    }, task.delay);
  }
}
