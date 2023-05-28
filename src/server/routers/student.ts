import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

const defaultStudentSelect = Prisma.validator<Prisma.StudentSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
});
const succsessResultSelect = Prisma.validator<Prisma.StudentSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  room: {
    select: {
      roomNumber: true,
      hostel: {
        select: {
          address: true
        }
      },
      floor: {
        select: {
          name: true
        }
      }
    }
  }
});

export type SuccessfulResultType = Prisma.StudentGetPayload<{ select: typeof succsessResultSelect }>;

export const studentRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;

      const items = await prisma.student.findMany({
        select: defaultStudentSelect,
        take: limit + 1,
        where: {},
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
        orderBy: {
          id: 'asc',
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      const student = await prisma.student.findUnique({
        where: { id },
        select: defaultStudentSelect,
      });
      if (!student) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No student with id '${id}'`,
        });
      }
      return student;
    }),
    addRoomToStudent : publicProcedure
    .input(
      z.object({
        studentId: z.number().int(),
        roomId: z.number().int()
      })
    ).mutation(async ({input}) => {
      const { studentId, roomId } = input;
      const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: { roomId: roomId },
      })
      return updatedStudent
    }),
    succsessfullResult: publicProcedure
      .input(
        z.object({
          studentId: z.number().int(),
        })
      )
      .query(async ({input}) => {
        const { studentId } = input;
        const successResult = await prisma.student.findFirst({
          where: { id: studentId },
          select: succsessResultSelect,
        });
        return successResult
      })
});
