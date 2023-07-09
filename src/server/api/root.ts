import { createTRPCRouter } from "~/server/api/trpc";
import { usaTime } from "./routers/usa-time";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  usaTime: usaTime,
});

// export type definition of API
export type AppRouter = typeof appRouter;
