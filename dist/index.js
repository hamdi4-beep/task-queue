"use strict";
const createTaskQueue = (concurrency = 2) => new class {
    constructor() {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    addTask(task) {
        this.queue.push(task);
        return this;
    }
    next(task) {
        let invokeTimer;
        if (!this.queue.length) {
            console.log('Finished processing the tasks!');
            return;
        }
        if (this.running < this.concurrency && (invokeTimer = this.queue.shift())) {
            this.running++;
            invokeTimer(() => {
                task();
                this.running--;
                this.next(task);
            });
        }
        return this;
    }
};
const taskQueue = createTaskQueue(3);
taskQueue
    .addTask(delay(1000))
    .addTask(delay(2000))
    .addTask(delay(3000))
    .addTask(delay(4000));
taskQueue.next(() => console.log('Running a task...'));
function delay(ms) {
    return (timeoutCallback) => setTimeout(timeoutCallback, ms);
}
