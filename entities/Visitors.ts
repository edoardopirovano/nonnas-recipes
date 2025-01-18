import { Entity, PrimaryColumn } from "typeorm";

import { Column } from "typeorm";

@Entity("visitors")
export class Visitors {
  @PrimaryColumn({ type: "text" })
  ip!: string;

  @Column({ type: "text" })
  city!: string;

  @Column({ type: "text" })
  region!: string;

  @Column({ type: "text" })
  country!: string;

  @Column({ type: "integer", default: 0 })
  count!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  last_visit!: Date;
}
