// import { router, publicProcedure } from '../trpc';
// import { Prisma } from '@prisma/client';
// import { TRPCError } from '@trpc/server';
// import { z } from 'zod';
// import { prisma } from '@server//prisma';

// const defaultTypeDocumentSelect = Prisma.validator<Prisma.TypeDocumentSelect>()({
//   id: true,
//   name: true,
// });

// export type TypeOfDocument  =  Prisma.TypeDocumentGetPayload<{ select: typeof defaultTypeDocumentSelect }>

// export const typeDocumentRouter = router({
//   list: publicProcedure.query(async () => {
//     const typeDocuments = await prisma.typeDocument.findMany({
//       select: defaultTypeDocumentSelect,
//     });
//     return typeDocuments;
//   }),
//   byId: publicProcedure
//     .input(
//       z.object({
//         id: z.number().int(),
//       }),
//     )
//     .query(async ({ input }) => {
//       const { id } = input;
//       const typeDocument = await prisma.typeDocument.findUnique({
//         where: { id },
//         select: defaultTypeDocumentSelect,
//       });
//       if (!typeDocument) {
//         throw new TRPCError({
//           code: 'NOT_FOUND',
//           message: `No type document with id '${id}'`,
//         });
//       }
//       return typeDocument;
//     }),
// });
