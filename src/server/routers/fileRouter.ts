import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { NEVER, z } from 'zod';
import { prisma } from '@server//prisma';
import { TextEncoder } from 'text-encoding';
export const fileRouter = router({
  create: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        fileBody: z.string(),
        cardId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.document.create({
          data: {
            fileName: input.fileName,
            fileBody: Buffer.from(input.fileBody, 'utf8'),
            cardId: input.cardId,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),
});
