/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { studentRouter } from './student';
import { typeDocumentRouter } from './typeDocument';
import { documentRouter } from './document';
import { submissionRouter } from './submission';
import { HostelRouter } from './hostel';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  post: postRouter,
  student: studentRouter,
  typeDocument: typeDocumentRouter,
  document: documentRouter,
  submission: submissionRouter,
  hostel: HostelRouter
});

export type AppRouter = typeof appRouter;
