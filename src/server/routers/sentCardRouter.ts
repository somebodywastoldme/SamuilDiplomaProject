import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@server//prisma';

const defaultSentCardSelect = Prisma.validator<Prisma.SentCardSelect>() ({
  id: true,
  recipient: {
    select: {
        name: true,
        surname: true
    }
  },
  sender: {
    select: {
        name: true,
        surname: true
    }
  },
  cardId: true,
  card: {
    select: {
        documents: {
            select: {
                fileName: true,
                description: true
            }
        }
    }
  },
  createdAt: true
});

export const sentCardRouter = router({
  list: publicProcedure
    .input(
        z.object({
            recipientId: z.number(),
        }),
    )
    .query(async ({ input }) => {
        const { recipientId } = input;
        const user = await prisma.sentCard.findMany({
        where: { recipientId },
        select: defaultSentCardSelect,
        });
        return user;
  }),
});
