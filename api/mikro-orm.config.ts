import { defineConfig } from "@mikro-orm/postgresql";
import { BaseEntity } from "./server/entities/BaseEntity";
import { Customer } from "./server/entities/Customer";

export default defineConfig({
  host: "localhost",
  port: 5432,
  user: "p-user",
  password: "difficultpassword",
  dbName: "mydatabase",
  entities: [BaseEntity, Customer],
  debug: true,
});