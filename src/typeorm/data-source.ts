import "reflect-metadata"
import { DataSource } from "typeorm"
import path from "path"

export const dataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3333,
  username: "root",
  password: "pass",
  database: "test",
  logging: false,
  entities: [path.join(__dirname, "./entities/**/*.ts")],
  migrations: [path.join(__dirname, "./migrations/**/*.ts")],
})