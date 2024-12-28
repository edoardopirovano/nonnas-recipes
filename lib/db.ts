import "reflect-metadata"
import { createConnection } from "typeorm"
import { Recipe } from "../entities/Recipe"

export async function initializeDatabase() {
  try {
    await createConnection({
      type: "postgres",
      url: process.env.POSTGRES_URL,
      entities: [Recipe],
      synchronize: true, // Be careful with this in production
    })
    console.log("Database connected successfully")
  } catch (error) {
    console.error("Error connecting to database:", error)
  }
}

