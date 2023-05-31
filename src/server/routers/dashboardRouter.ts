import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { prisma } from '@server//prisma';

const dashboardDocumentsSelect = Prisma.validator<Prisma.DocumentSelect>()({
  id: true,
  title: true,
  description: true,
  author: {
    select: {
      name: true,
      surname: true
    }
  }
});

// export type dashboardDocuments = Prisma.DocumentGetPayload<{ select: typeof dashboardDocumentsSelect }>;

export const dashboardRouter = router({
  list: publicProcedure.query(async () => {
    const documents = await prisma.document.findMany({
      select: dashboardDocumentsSelect,
    });
    return documents;
  }),

// byId: publicProcedure
//   .input(
//     z.object({
//       id: z.number(),
//     }),
//   )
//   .query(async ({ input }) => {
//     const { id } = input;
//     const document = await prisma.document.findUnique({
//       where: { id },
//       select: defaultDocumentSelect,
//     });
//     if (!document) {
//       throw new TRPCError({
//         code: 'NOT_FOUND',
//         message: `No document with id '${id}'`,
//       });
//     }
//     return document;
//   })
//   create: publicProcedure
//     .input(
//       z.object({
//         title: z.string().min(1).max(32),
//         documentBody: z.string(),
//       }),
//     )
//     .mutation(async ({ input }) => {
//       const document = await prisma.document.create({
//         data: input,
//         select: defaultDocumentSelect,
//       });
//       return document;
//     }),
});
