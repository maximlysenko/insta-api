import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
  if (!process.env.MAX_PASS) {
    throw new Error(`"MAX_PASS" env variable was not specified`);
  }

  const users = [
    {
      email: "max@test.com",
      password: process.env.MAX_PASS,
      name: "Max",
    },
    {
      email: "vadim.konstantinov.666@gmail.com",
      password: "vadim123",
      name: "Vadim",
    },
    {
      email: "tebedomeny@gmail.com",
      password: "vasyl123",
      name: "Vasyl",
    },
    {
      email: "Alan.gare13@gmail.com",
      password: "alan123",
      name: "Alan",
    },
  ];

  users.forEach(async (user) => {
    const found = await client.user.findUnique({
      where: { email: user.email },
    });

    if (!found) {
      const hash = await bcrypt.hash(user.password, 10);

      await client.user.create({
        data: {
          email: user.email,
          password: hash,
          author: {
            create: {
              name: user.name,
              photo: null,
            },
          },
        },
      });
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
