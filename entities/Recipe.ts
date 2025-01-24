import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

export type Language = "en" | "it" | "ja";

@Entity("recipe")
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("text")
  category!: string;

  @Column("text")
  title!: string;

  @Column("text")
  ingredients!: string;

  @Column("text")
  instructions!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  modifiedAt!: Date;

  @Column({ type: "integer", default: 0 })
  views!: number;

  @Column({ type: "text", default: "it" })
  language!: Language;

  @Column({ type: "text", default: "en,ja" })
  translateTo!: Language[];

  @ManyToOne(() => Recipe, (recipe) => recipe.id, { nullable: true })
  translatedFrom!: Recipe | null;

  @Column({ type: "timestamp", nullable: true })
  lastTranslatedAt!: Date | null;
}
