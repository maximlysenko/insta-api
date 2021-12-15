import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function main() {
    if (!process.env.MAX_PASS) {
        throw new Error(`"MAX_PASS" env variable was not specified`);
    }

    const hash = await bcrypt.hash(process.env.MAX_PASS, 10);

    await client.user.create({
        data: {
            email: "max@test.com",
            password: hash,
            author: {
              create: {
                name: "Max Lysenko",
                photo: null,
              },
            },
          },
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
