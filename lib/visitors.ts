import { LocationData } from "@/types/locationData.types";
import { AppDataSource, initDb } from "./db";
import { Visitors } from "@/entities/Visitors";

export async function trackVisitor(locationData: LocationData) {
  try {
    await initDb();
    const visitorRepository = AppDataSource.getRepository(Visitors);

    let visitor = await visitorRepository.findOne({
      where: { ip: locationData.ip },
    });

    if (visitor) {
      if (
        new Date().getTime() - visitor.last_visit.getTime() >
        1000 * 60 * 60
      ) {
        visitor.count += 1;
      }
      visitor.city = locationData.city;
      visitor.region = locationData.region;
      visitor.country = locationData.country;
      visitor.last_visit = new Date();
      await visitorRepository.save(visitor);
    } else {
      visitor = new Visitors();
      visitor.ip = locationData.ip;
      visitor.city = locationData.city;
      visitor.region = locationData.region;
      visitor.country = locationData.country;
      visitor.count = 1;
      visitor.last_visit = new Date();
      await visitorRepository.save(visitor);
    }

    return visitor;
  } catch (error) {
    console.error("Error tracking visitor:", error);
    throw error;
  }
}
