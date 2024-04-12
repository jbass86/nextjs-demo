const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

async function seedUsers(client) {

  const hashedPassword = await bcrypt.hash("a7n8xa7n8x", 10);

  console.log("Create entry with pass");
  console.log(hashedPassword);

  const id = "3958dc9e-712f-4377-85e9-fec4b6a6442a"
  const name = "JoshB";
  const email = "Josh33@go.com";

  console.log(`
  INSERT INTO users (id, name, email, password)
  VALUES (${id}, ${name}, ${email}, ${hashedPassword})
  ON CONFLICT (id) DO NOTHING;
`)

  await client.sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);

  console.log("Got past seed users");

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});