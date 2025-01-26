import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn({ type: "text" })
  id!: string;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text", nullable: true })
  name!: string | null;

  @Column({ type: "boolean", default: false })
  isAdmin!: boolean;
}
