import { AppDataSource } from "./lib/db";
import { Language, Recipe } from "./entities/Recipe";
import { ILike, FindOptionsWhere } from "typeorm";
import { Visitors } from "./entities/Visitors";
import { trackVisitor } from "./lib/visitors";
import { LocationData } from "./types/locationData.types";
import { User } from "./entities/User";
import { getSession } from "@auth0/nextjs-auth0";
import { getCachedStats, setCachedStats } from "./lib/redis";

export const resolvers = {
  Query: {
    recipes: async (
      parent: unknown,
      args: {
        title?: string;
        category?: string;
        ingredients?: string;
        language?: string;
      }
    ): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe);

      const whereClause: FindOptionsWhere<Recipe> = {};
      if (args.title) whereClause.title = ILike(`%${args.title}%`);
      if (args.category) whereClause.category = ILike(`%${args.category}%`);
      if (args.ingredients)
        whereClause.ingredients = ILike(`%${args.ingredients}%`);
      if (args.language) whereClause.language = args.language as Language;

      const recipes = await recipeRepository.find({
        where: whereClause,
        order: {
          title: "ASC",
        },
      });

      return recipes.map((recipe) => ({
        ...recipe,
        title: recipe.title,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
      }));
    },
    stats: async () => {
      const cachedStats = await getCachedStats();
      if (cachedStats) {
        return cachedStats;
      }

      // If no cache, compute stats
      const recipeRepository = AppDataSource.getRepository(Recipe);
      const totalRecipes = await recipeRepository
        .createQueryBuilder("recipe")
        .select("COUNT(recipe.id)", "total")
        .where("recipe.translatedFromId IS NULL")
        .getRawOne();
      const totalViews = await recipeRepository
        .createQueryBuilder("recipe")
        .select("SUM(recipe.views)", "total")
        .getRawOne();
      const visitorsRepository = AppDataSource.getRepository(Visitors);
      const visitorCount = await visitorsRepository
        .createQueryBuilder("visitors")
        .select("SUM(visitors.count)", "total")
        .getRawOne();

      const stats = {
        totalRecipes: parseInt(totalRecipes?.total || "0"),
        totalViews: parseInt(totalViews?.total || "0"),
        visitorCount: parseInt(visitorCount?.total || "0"),
      };

      await setCachedStats(stats);
      return stats;
    },
    trackVisitor: async (
      parent: unknown,
      args: { locationData: LocationData }
    ): Promise<boolean> => {
      trackVisitor(args.locationData);
      return true;
    },
    userInfo: async (): Promise<User | null> => {
      const session = await getSession();
      if (!session?.user?.sub) return null;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({
        where: { id: session.user.sub },
      });
      if (!user) {
        const newUser = {
          id: session.user.sub,
          email: session.user.email,
          isAdmin: false,
        };
        await userRepository.save(newUser);
        return newUser;
      }
      return user;
    },
  },
};
