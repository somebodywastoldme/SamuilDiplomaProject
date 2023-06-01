/**
 * This file contains the root router of your tRPC-backend
 */
import { userRouter } from '@server/routers/userRouter';
import { sentCardRouter } from '@server/routers/sentCardRouter';
import { fileRouter } from '@/server/routers/fileRouter';

import { publicProcedure, router } from '../trpc';

export const appRouter = router({
  user: userRouter,
  sentCard: sentCardRouter,
  files: fileRouter
});

export type AppRouter = typeof appRouter;
