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

export type SentCardGridType  =  Prisma.SentCardGetPayload<{ select: typeof defaultSentCardSelect }>

export const sentCardRouter = router({
  recipientCards: publicProcedure
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
  sendedCards: publicProcedure
    .input(
        z.object({
          senderId: z.number(),
        }),
    )
    .query(async ({ input }) => {
        const { senderId } = input;
        const user = await prisma.sentCard.findMany({
        where: { senderId },
        select: defaultSentCardSelect,
        });
        return user;
  }),
});
