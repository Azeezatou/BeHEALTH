const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("Admin@BeHealth2025", 12);

  await prisma.user.upsert({
    where: { email: "admin@behealth.io" },
    update: {},
    create: {
      email: "admin@behealth.io",
      passwordHash: hash,
      role: "ADMIN",
      isEmailVerified: true
    }
  });

  console.log("Admin seeded");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
