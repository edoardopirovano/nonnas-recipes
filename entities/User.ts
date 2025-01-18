import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ type: "boolean", default: false })
  isAdmin!: boolean;
}
