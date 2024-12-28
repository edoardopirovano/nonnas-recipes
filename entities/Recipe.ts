import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity("recipe")
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number

    @Column("text")
    title!: string

    @Column("text")
    ingredients!: string

    @Column("text")
    instructions!: string

    @CreateDateColumn()
    createdAt!: Date
}

