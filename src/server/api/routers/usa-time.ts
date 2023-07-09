import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const places = [
  // Data is retrieved manually from census records since it doesn't update frequently
  { baseName: "Chicago", timezone: "Central", population: 31 },
  { baseName: "Denver", timezone: "Mountain", population: 7.5 },
  { baseName: "New_york", timezone: "Mountain", population: 45 },
  { baseName: "Los_Angeles", timezone: "Mountain", population: 16.5 },
] as const;
export const usaTime = createTRPCRouter({
  percent: publicProcedure.query(({}) => {
    return places.map((place) => {
      const time = new Date().toLocaleString("en-US", {
        timeZone: `america/${place.baseName}`,
        hour: "2-digit",
      });
      const isAM = time.slice(-2) == "AM"; // this stores whether the time is AM or PM
      const hour = parseInt(time.slice(0, 2));
      let awake = false;
      // if time is between 8 AM and 11 PM
      if ((isAM && hour >= 8) || (!isAM && hour < 11)) {
        awake = true;
      }
      const cleanBaseName = place.baseName.replace("_", " ");
      return {
        time: time,
        awake,
        ...place,
        baseName: cleanBaseName,
      };
    });
  }),
});
