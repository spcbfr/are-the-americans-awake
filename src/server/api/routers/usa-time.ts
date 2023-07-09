import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const places = [
  // Data is retrieved manually from census records since it doesn't update frequently
  { baseName: "Chicago", timezone: "Central", population: 30.38 },
  { baseName: "Denver", timezone: "Mountain", population: 7.49 },
  { baseName: "New_york", timezone: "Eastern", population: 45.42 },
  { baseName: "Los_Angeles", timezone: "Pacific", population: 16.58 },
] as const;
export const usaTime = createTRPCRouter({
  percent: publicProcedure.query(({}) => {
    const placesWithTime = places.map((place) => {
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
    let percentAwake = 0;
    for (const place of placesWithTime) {
      if (place.awake) percentAwake += place.population;
    }
    percentAwake = Math.round((percentAwake + Number.EPSILON) * 100) / 100; // precise rounding
    return percentAwake;
  }),
});
