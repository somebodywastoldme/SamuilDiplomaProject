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
      description: true,
      documents: {
        select: {
          id: true,
          fileName: true,
          description: true,
          fileBody: true,
          signedHash: true
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
        where: {
          recipientId,
          sendingTypeId: {
            not: {
              in: [4, 2],
            },
          },
        },
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
        if (card) {
          return JSON.stringify(card);
        }
        return null;
      } catch (e) {
        console.log(e);
      }
    }),
  create: publicProcedure
    .input(
      z.object({
        userId: z.number().int(),
        sendingTypeId: z.number().int(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, sendingTypeId } = input;
      try {
        const card = await prisma.sentCard.create({
          data: {
            sender: {
              connect: {
                id: userId,
              },
            },
            recipient: {
              connect: {
                id: userId,
              },
            },
            card: {
              create: {
                userId: userId,
              },
            },
            sendingType: {
              connect: {
                id: sendingTypeId,
              },
            },
          },
          include: {
            card: true,
          },
        });
        return card.id;
      } catch (e) {
        console.log(e);
      }
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number().int(),
        addresserId: z.number().int(),
        sendingTypeId: z.number().int(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, addresserId, sendingTypeId } = input;
      try {
        await prisma.sentCard.update({
          where: { id },
          data: {
            sendingTypeId,
            recipientId: addresserId,
          },
        });
        return card.id;
      } catch (e) {
        console.log(e);
      }
    }),
});
