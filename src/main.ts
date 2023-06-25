import { dataSource } from "./typeorm/data-source"
import Task from "./typeorm/entities/Task"

enum Status {
  Waiting = 0,
  Processing = 1,
  Completed = 2,
}

;(async () => {
  await dataSource.initialize()
  const repo = dataSource.getRepository(Task)
  await repo.delete({})

  const tasks = new Array(10).fill(0).map(() => {
    const t = new Task()
    t.status = Status.Waiting
    return t
  })
  await repo.save(tasks)

  const promises = Array.from({ length: 5 }, (_, i) => {
    return (async () => {
      const id = await dataSource.transaction(async (mng) => {
        const t = await mng.getRepository(Task)
          .createQueryBuilder("task")
          .setLock("pessimistic_write")
          .where(`task.status = ${Status.Waiting}`)
          .orderBy("task.id", "ASC")
          .getOne()
        if (!t) {
          throw new Error("NO TASK")
        }
        console.log("Retrieved:", t.id, i)
        t.status = Status.Processing
        await mng.save(t)
        return t.id
      })
      const t = await dataSource.getRepository(Task).findOneBy({ id })
      if (!t) {
        throw new Error("NO TASK")
      }
      await new Promise<void>((resolve) => {
        setTimeout(async () => {
          t.status = Status.Completed
          await dataSource.getRepository(Task).save(t)
          console.log("Completed:", id, i)
          resolve()
        }, 1000 * i)
      })
    })()
  })
  await Promise.all(promises)
  process.exit(0)
})()