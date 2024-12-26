# Overview

A queue for processing asynchronous tasks that ensures only a limited number of tasks can run in the background.

## How does the queue works?

Before firing off any asynchronous tasks, it checks to see if the number of currently running tasks are less than the allowed concurrency (which is 3, by default).

Tasks can be added by calling the 'addTask' method which queues up asynchronous tasks until their turn comes. The order of the execution is maintained.

The process of executing the tasks is initiated by called the 'next' method. The method will call itself recursively until there are no more tasks in the queue.

## Inspiration

My inspiration of creating the task queue is to practice working with asynchronous tasks and learn how to deal with their unpredictability.