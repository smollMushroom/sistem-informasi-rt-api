import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create 3 users
  const user1 = await prisma.user.create({
    data: {
      email: 'johndoe@example.com',
      username: 'johndoe123',
      role: "ketua",
      token: "131311",
      passwordHash: 'hashedPassword123', // Di production, pastikan sudah di-hash!
      profile: {
        create: {
          fullName: 'John Doe',
          address: '123 Main Street',
          birthDate: '010190', // format ddmmyy
          phoneNumber: '85612122343',
          phoneNumberHash: 'sdasdad',
          nationalIdHash: "asdsda",
          nationalId: '1234567890123456',
          meritalStatus: 'single',
          occupation: 'Software Engineer',
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'janedoe@example.com',
      username: 'janedoe456',
      role: "admin",
      token: "1313111",
      passwordHash: 'hashedPassword456',
      profile: {
        create: {
          fullName: 'Jane Doe',
          address: '456 Elm Street',
          birthDate: '020290', // format ddmmyy
          phoneNumber: '85612122323',
          nationalId: '6543219876543210',
          phoneNumberHash: 'sdasdasd',
          nationalIdHash: "asdsdas",
          meritalStatus: 'married',
          occupation: 'Teacher',
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'bobsmith@example.com',
      username: 'bobsmith789',
      role: "warga",
      token: "131311w",
      passwordHash: 'hashedPassword789',
      profile: {
        create: {
          fullName: 'Bob Smith',
          address: '789 Oak Avenue',
          birthDate: '150385', // format ddmmyy
          phoneNumber: '85612122333',
          nationalId: '9876543210123456',
          phoneNumberHash: 'sdassssdad',
          nationalIdHash: "asdsssda",
          meritalStatus: 'divorced',
          occupation: 'Mechanic',
        },
      },
    },
  });

  console.log('3 users with profiles have been created!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
