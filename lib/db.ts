import "reflect-metadata";
import { DataSource } from "typeorm";
import { Recipe } from "../entities/Recipe";
import { Visitors } from "@/entities/Visitors";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [Recipe, Visitors],
  synchronize: true,
  ssl: {
    rejectUnauthorized: true,
  },
  extra: {
    max: 1,
    connectionTimeoutMillis: 5000,
  },
  cache: false,
});

export const initDb = async () => {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("Database connected successfully");
    }
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};
