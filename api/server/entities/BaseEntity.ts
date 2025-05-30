import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property({ defaultRaw: "now()" })
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), defaultRaw: "now()" })
  updatedAt: Date = new Date();
}
