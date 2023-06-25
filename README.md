# Overview
Test code of locking table row with TypeORM to get a task from a queue built with a mysql table. It's assumed that multiple task executors are running in parallel and the executor takes the task from the queue and executes it. The task is executed only once.

# How to run the project
0. `docker-compose up`
1. `yarn`
2. `yarn migrate`
3. `yarn start`