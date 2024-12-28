import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    title!: string

    @Column("text")
    ingredients!: string

    @Column("text")
    instructions!: string

    @CreateDateColumn()
    createdAt!: Date
}

