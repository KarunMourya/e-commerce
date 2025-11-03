import { v4 as uuid } from "uuid";

export async function up(queryInterface) {
  await queryInterface.bulkInsert(
    "users",
    [
      {
        id: uuid(),
        name: "Admin User",
        email: "admin@admin.com",
        password: 'admin@123',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("users", null, {});
}
