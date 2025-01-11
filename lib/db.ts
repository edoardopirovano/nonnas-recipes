import "reflect-metadata";
import { DataSource } from "typeorm";
import { Recipe } from "../entities/Recipe";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  entities: [Recipe],
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

export async function initializeDatabase() {
  if (!process.env.POSTGRES_URL) {
    throw new Error("POSTGRES_URL environment variable is not set");
  }

  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
    return AppDataSource;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

export const initDb = async () => {
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
