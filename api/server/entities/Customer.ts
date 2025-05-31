import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

@Entity({ tableName: "customers" })
export class Customer extends BaseEntity {
  @Property()
  title!: string;

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  email!: string;

  @Property({ type: "array", nullable: true })
  orders?: string[];
}
