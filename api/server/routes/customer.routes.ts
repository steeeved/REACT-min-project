import { Router } from "express";
import { createEntityManagerContext } from "../context";
import { CustomerController } from "../controllers/customer.controller";
import { CustomerService } from "../services/customer.service";
import { EntityManager } from "@mikro-orm/core";

const router = Router();
router.use(createEntityManagerContext);

let controller: CustomerController | null = null;

const getController = (em: EntityManager) => {
  if (!controller) {
    const service = new CustomerService(em);
    controller = new CustomerController(service);
  }
  return controller;
};

router.get("/", async (req: any, res) => {
  const ctrl = getController(req.em);
  return ctrl.getAll(req, res);
});

router.post("/", async (req, res) => {
  const ctrl = getController(req.em);
  return ctrl.create(req, res);
});

export default router;
