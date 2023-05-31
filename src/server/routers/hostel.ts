// import { router, publicProcedure } from '../trpc';
// import { Prisma } from '@prisma/client';
// import { prisma } from '@server//prisma';

// /**
//  * Default selector for Hostel.
//  */
// const defaultHostelSelect = Prisma.validator<Prisma.HostelSelect>()({
// 	id: true,
// 	name: true,
// 	address: true,
// 	rooms: true,
// 	floors: true,
// 	caretaker: true,
// 	hostelCaretakerId: true
// });

// export type HostelSelection = Prisma.HostelGetPayload<{ select: typeof defaultHostelSelect }>;

// export const HostelRouter = router({
//   list: publicProcedure.query(async () => {
// 	const Hostels = await prisma.hostel.findMany({
// 	  select: defaultHostelSelect,
// 	});
// 	return Hostels;
//   }),
// //   create: publicProcedure
// //     .input(
// //       z.object({
// //         title: z.string().min(1).max(32),
// //         HostelBody: z.string(),
// //       }),
// //     )
// //     .mutation(async ({ input }) => {
// //       const Hostel = await prisma.Hostel.create({
// //         data: input,
// //         select: defaultHostelSelect,
// //       });
// //       return Hostel;
// //     }),
// });
