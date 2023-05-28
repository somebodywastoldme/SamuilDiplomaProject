/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const students = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '123 Main St, Anytown USA',
    gender: 'Male',
    dateOfBirth: new Date('2000-01-01'),
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '123 Main St, Anytown USA',
    gender: 'Female',
    dateOfBirth: new Date('2000-01-02'),
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '456 Main St, Anytown USA',
    gender: 'Male',
    dateOfBirth: new Date('2000-01-03'),
  },
  {
    firstName: 'Mary',
    lastName: 'Jones',
    email: 'mary.jones@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '456 Main St, Anytown USA',
    gender: 'Female',
    dateOfBirth: new Date('2000-01-04'),
  },
  {
    firstName: 'Joe',
    lastName: 'Davis',
    email: 'joe.davis@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '789 Main St, Anytown USA',
    gender: 'Male',
    dateOfBirth: new Date('2000-01-05'),
  },
  {
    firstName: 'Sue',
    lastName: 'Wilson',
    email: 'sue.wilson@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '789 Main St, Anytown USA',
    gender: 'Female',
    dateOfBirth: new Date('2000-01-06'),
  },
  {
    firstName: 'Mike',
    lastName: 'Brown',
    email: 'mike.brown@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '321 Main St, Anytown USA',
    gender: 'Male',
    dateOfBirth: new Date('2000-01-07'),
  },
  {
    firstName: 'Lisa',
    lastName: 'Miller',
    email: 'lisa.miller@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '321 Main St, Anytown USA',
    gender: 'Female',
    dateOfBirth: new Date('2000-01-08'),
  },
  {
    firstName: 'Tom',
    lastName: 'Jackson',
    email: 'tom.jackson@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '654 Main St, Anytown USA',
    gender: 'Male',
    dateOfBirth: new Date('2000-01-09'),
  },
  {
    firstName: 'Amy',
    lastName: 'White',
    email: 'amy.white@example.com',
    phoneNumber: '+1 555-555-5555',
    address: '654 Main St, Anytown USA',
    gender: 'Female',
    dateOfBirth: new Date('2000-01-10'),
  },
];

const typeDocument = [
  {id: 1, name: 'Военний квиток'},
  {id: 2, name: 'Документ, що посвідчує пільги'},
  {id: 3, name: 'Квитанція оплати гуртожитку'},
  {id: 4, name: 'Фотокартки'},
  {id: 5, name: 'ID картка'},
  {id: 6, name: 'Довідка з місця проживання'},
];

const hostels = [
  {
    name: "Main Hostel",
    address: "123 Main St"
  },
  {
    name: "South Hostel",
    address: "456 South St"
  },
  {
    name: "East Hostel",
    address: "789 East St"
    }
];

const rooms = [
  {
    roomNumber: "101",
    capacity: 2,
    occupancy: 0,
    hostelId: 1,
    floorId: 1
  },
  {
    roomNumber: "102",
    capacity: 2,
    occupancy: 0,
    hostelId: 1,
    floorId: 1
  },
  {
    roomNumber: "201",
    capacity: 4,
    occupancy: 0,
    hostelId: 2,
    floorId: 2
  },
  {
    roomNumber: "202",
    capacity: 4,
    occupancy: 0,
    hostelId: 2,
    floorId: 2
  },
  {
    roomNumber: "301",
    capacity: 3,
    occupancy: 0,
    hostelId: 3,
    floorId: 3
  },
  {
    roomNumber: "302",
    capacity: 3,
    occupancy: 0,
    hostelId: 3,
    floorId: 3
  }
];

const HostelCaretaker =
[
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    email: 'jane.doe@example.com',
  },
  // ...more data
];

const floors = [
  {
    id: 1,
    name: "First Floor",
    hostelId: 1
  },
  {
    id: 2,
    name: "Second Floor",
    hostelId: 1
  },
  {
    id: 3,
    name: "Third Floor",
    hostelId: 2
  },
  {
    id: 4,
    name: "Fourth Floor",
    hostelId: 2
  },
  {
    id: 5,
    name: "Fifth Floor",
    hostelId: 3
  },
  {
    id: 6,
    name: "Sixth Floor",
    hostelId: 3
  }
];
const documents = [
  {
    id: 1,
    name: 'Военний квиток',
    isRequired: true,
    isCompleted: true,
    documentBody: '...document body here...',
    typeDocumentId: 1,
  },
  {
    id: 2,
    name: 'Документ, що посвідчує пільги',
    isRequired: false,
    isCompleted: false,
    documentBody: null,
    typeDocumentId: 2,
  },
  {
    id: 3,
    name: 'Квитанція',
    isRequired: true,
    isCompleted: false,
    documentBody: '...document body here...',
    typeDocumentId: 3,
  },
  {
    id: 4,
    name: 'Фотокарточка',
    isRequired: true,
    isCompleted: false,
    documentBody: '...document body here...',
    typeDocumentId: 4,
  },
  {
    id: 5,
    name: 'Паспорт',
    isRequired: true,
    isCompleted: false,
    documentBody: '...document body here...',
    typeDocumentId: 5,
  },
  {
    id: 6,
    name: 'Прописка',
    isRequired: true,
    isCompleted: false,
    documentBody: '...document body here...',
    typeDocumentId: 6,
  }
];
const photos = [
  {
    studentId: 1,
    imageBody: "some image data"
  },
  {
    studentId: 2,
    imageBody: "some other image data"
  }

]

const submissions = [
  {
    id: 1,
    studentId: 1,
    documentId: 1,
    isSubmitted: true,
    submittedAt: new Date('2022-02-10T10:00:00Z')
  },
  {
    id: 2,
    studentId: 1,
    documentId: 2,
    isSubmitted: false
  },
  {
    id: 3,
    studentId: 1,
    documentId: 3,
    isSubmitted: false
  },
  {
    id: 4,
    studentId: 1,
    documentId: 4,
    isSubmitted: false
  },
  {
    id: 5,
    studentId: 1,
    documentId: 5,
    isSubmitted: false
  },
  {
    id: 6,
    studentId: 1,
    documentId: 6,
    isSubmitted: false
  }
]
async function main() {
  await prisma.student.createMany({
    data: students
  });
  await prisma.typeDocument.createMany({
    data: typeDocument
  });
  await prisma.hostelCaretaker.createMany({
    data: HostelCaretaker
  })
  await prisma.hostel.createMany({
    data: hostels
  });
  await prisma.floor.createMany({
    data: floors
  });
  await prisma.room.createMany({
    data: rooms
  });
  await prisma.document.createMany({
    data: documents
  });
  await prisma.submission.createMany({
    data: submissions
  });
  await prisma.photo.createMany({
    data: photos
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
