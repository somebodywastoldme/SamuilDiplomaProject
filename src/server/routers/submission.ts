import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@server//prisma';


const defaultSubmissionSelect = Prisma.validator<Prisma.SubmissionSelect>()({
  id: true,
  studentId: true,
  isSubmitted: true,
  document: {
    select: {
      name: true,
      isCompleted: true,
      typeDocument: {
        select: {
          id: true,
          name: true
        }
      }
    }
  }
});
export type SubmissionSelect  = Prisma.SubmissionGetPayload<{ select: typeof defaultSubmissionSelect }>;


export const submissionRouter = router({
  list: publicProcedure
    .input(
      z.object({
        studentId: z.number().int(),
      }),
    )
    .query(async ({ input }) => {
      const { studentId } = input;
      const submission = await prisma.submission.findMany({
        where: { studentId: studentId },
        select: defaultSubmissionSelect,
      });
      return submission; 
    }),
  addSubmissionWithDocument: publicProcedure
    .input(
      z.object({
        studentId: z.number().int(),
        document: z.object({
          name: z.string(),
          documentBody: z.string(),
          typeDocument: z.number()
        })
      })
    ).mutation(async ({input}) => {
      const { studentId, document } = input;
      const submission = await prisma.submission.create({
        data: {
          isSubmitted: false,
          student: { connect: { id: studentId } },
          document: {
            create: {
              name: document.name,
              documentBody: document.documentBody,
              typeDocument: { connect: { id: document.typeDocument } },
              isCompleted: true,
              isRequired: true
            },
          },
        }
      });
    })
});
