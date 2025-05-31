import { MikroORM } from "@mikro-orm/postgresql";
import { EntityManager } from "@mikro-orm/postgresql";
import config from "../mikro-orm.config";

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};

export async function initializeDI() {
  DI.orm = await MikroORM.init({
    ...config,
    allowGlobalContext: false,
  });
  DI.em = DI.orm.em;
  return DI;
}
