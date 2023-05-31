/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// #region mocks
const users = [
  {
    id: 1,
    email: "user1@example.com",
    password: "password1",
    name: "John",
    surname: "Doe",
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  },
  {
    id: 3,
    email: "user2@example.com",
    password: "password2",
    name: "Jane",
    surname: "Smith",
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
];

const roles = [
  {
    id: 1,
    name: "Admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "User",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const permissions = [
  {
    id: 1,
    name: "Permission 1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Permission 2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const cards = [
  {
    id: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const documents = [
  {
    id: 1,
    fileName: "Document 1",
    description: "Description 1",
    fileBody: Buffer.from("file body 1"),
    createdAt: new Date(),
    updatedAt: new Date(),
    cardId: 1,
  },
  {
    id: 2,
    fileName: "Document 2",
    description: "Description 2",
    fileBody: Buffer.from("file body 2"),
    createdAt: new Date(),
    updatedAt: new Date(),
    cardId: 2,
  },
];

const sendingTypes = [
  {
    id: 1,
    name: "Type 1",
  },
  {
    id: 2,
    name: "Type 2",
  },
];

const sentCards = [
  {
    id: 1,
    senderId: 1,
    recipientId: 2,
    cardId: 1,
    sendingTypeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    senderId: 2,
    recipientId: 1,
    cardId: 2,
    sendingTypeId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
// #endregion

async function main() {
  await prisma.permission.createMany({
    data: permissions
  })
  await prisma.role.createMany({
    data: roles
  });
  await prisma.user.createMany({
    data: users
  });
  await prisma.card.createMany({
    data: cards
  });
  await prisma.sendingType.createMany({
    data: sendingTypes
  });
  await prisma.document.createMany({
    data: documents
  });
  await prisma.sentCard.createMany({
    data: sentCards
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
