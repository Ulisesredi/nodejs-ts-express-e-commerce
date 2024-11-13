import { Column, Entity } from "typeorm";
import { BaseEntity } from "../config/base.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @Column()
  username!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  mobile!: number;

  @Column({ nullable: true })
  jobRole?: string;
}
