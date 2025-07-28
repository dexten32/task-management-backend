import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Example: Add a user
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      role: "EMPLOYEE",
    },
  });

  // Example: Add a task
  await prisma.task.create({
    data: {
      title: "Sample Task",
      description: "This is a test task.",
      deadline: new Date("2025-05-20"),
      status: "PENDING",
      assignedTo: {
        create: { name: "Alice", email: "alice@example.com", role: "EMPLOYEE" },
      },
      // assuming user with ID 1
    },
  });
}

main()
  .then(() => {
    console.log("Seeding done!");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
