
CREATE TABLE "Hostel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "hostelCaretakerId" INTEGER,

    CONSTRAINT "Hostel_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomNumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "occupancy" INTEGER NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "HostelCaretaker" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "HostelCaretaker_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "hostelId" INTEGER NOT NULL,

    CONSTRAINT "Floor_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "roomId" INTEGER,
    "hostelCaretakerId" INTEGER,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "documentBody" TEXT,
    "typeDocumentId" INTEGER,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "imageBody" TEXT,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "documentId" INTEGER NOT NULL,
    "isSubmitted" BOOLEAN NOT NULL,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TypeDocument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeDocument_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "_room_floor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

CREATE UNIQUE INDEX "HostelCaretaker_email_key" ON "HostelCaretaker"("email");

CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

CREATE UNIQUE INDEX "_room_floor_AB_unique" ON "_room_floor"("A", "B");

CREATE INDEX "_room_floor_B_index" ON "_room_floor"("B");

ALTER TABLE "Hostel" ADD CONSTRAINT "Hostel_hostelCaretakerId_fkey" FOREIGN KEY ("hostelCaretakerId") REFERENCES "HostelCaretaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Room" ADD CONSTRAINT "Room_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Floor" ADD CONSTRAINT "Floor_hostelId_fkey" FOREIGN KEY ("hostelId") REFERENCES "Hostel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Student" ADD CONSTRAINT "Student_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Student" ADD CONSTRAINT "Student_hostelCaretakerId_fkey" FOREIGN KEY ("hostelCaretakerId") REFERENCES "HostelCaretaker"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Document" ADD CONSTRAINT "Document_typeDocumentId_fkey" FOREIGN KEY ("typeDocumentId") REFERENCES "TypeDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "Photo" ADD CONSTRAINT "Photo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Submission" ADD CONSTRAINT "Submission_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "Submission" ADD CONSTRAINT "Submission_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "_room_floor" ADD CONSTRAINT "_room_floor_A_fkey" FOREIGN KEY ("A") REFERENCES "Floor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "_room_floor" ADD CONSTRAINT "_room_floor_B_fkey" FOREIGN KEY ("B") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
