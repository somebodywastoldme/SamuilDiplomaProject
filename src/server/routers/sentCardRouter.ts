import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '@server//prisma';

const gridSentCardSelect = Prisma.validator<Prisma.SentCardSelect>()({
  id: true,
  recipient: {
    select: {
      name: true,
      surname: true,
    },
  },
  sender: {
    select: {
      name: true,
      surname: true,
    },
  },
  cardId: true,
  card: {
    select: {
      documents: {
        select: {
          fileName: true,
          description: true,
        },
      },
    },
  },
  createdAt: true,
});

const defaultCardSelect = Prisma.validator<Prisma.SentCardSelect>()({
  id: true,
  recipient: {
    select: {
      name: true,
      surname: true,
    },
  },
  sender: {
    select: {
      name: true,
      surname: true,
    },
  },
  cardId: true,
  card: {
    select: {
      documents: {
        select: {
          id: true,
          fileName: true,
          description: true,
          fileBody: true,
        },
      },
    },
  },
  createdAt: true,
});

export type SentCardGridType = Prisma.SentCardGetPayload<{
  select: typeof gridSentCardSelect;
}>;

export type SentCardType = Prisma.SentCardGetPayload<{
  select: typeof defaultCardSelect;
}>;
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
        select: gridSentCardSelect,
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
        select: gridSentCardSelect,
      });
      return user;
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;
      try {
        const card = await prisma.sentCard.findUniqueOrThrow({
          where: { id },
          select: defaultCardSelect,
        });
        if (!card) {
          return null;
        }
        return JSON.stringify(card);
      } catch (e) {
        console.log(e);
      }
    }),
});
