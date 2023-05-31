/**
 * This file contains the root router of your tRPC-backend
 */
import { userRouter } from '@server/routers/userRouter';
import { publicProcedure, router } from '../trpc';


export const appRouter = router({
  user: userRouter,
});

export type AppRouter = typeof appRouter;
