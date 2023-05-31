import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { NEVER, z } from 'zod';
import { prisma } from '@server//prisma';

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  name: true,
  surname: true,
  createdAt: true,
  updatedAt: true
});

export const userRouter = router({
  list: publicProcedure.query(async () => {
    const user = await prisma.user.findMany({
      select: defaultUserSelect,
    });
    return user;
  }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        // password: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { email } = input;
      const user = await prisma.user.findFirst({
        where: { email }, // , password
        select: defaultUserSelect,
      });
      if (!user) {
        return null;
      }
      return user;
    })
});
