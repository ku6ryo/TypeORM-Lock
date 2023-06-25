import {
  Entity,
  PrimaryColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm"

@Entity()
@Unique(["id"])
export default class Task {
  @PrimaryGeneratedColumn({
    type: "integer",
    unsigned: true,
  })
  id!: string

  @Column("integer")
  status!: number

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date
}