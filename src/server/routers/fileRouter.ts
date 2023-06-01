import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@server//prisma';
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
    delete: publicProcedure
    .input(
      z.object({
        fileId: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        await prisma.document.delete({
          where: {
            id: input.fileId
          }
        });
      } catch (e) {
        console.log(e);
      }
    }),
});
