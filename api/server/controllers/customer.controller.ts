import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";
import { DI } from "../bootstrap";

export class CustomerController {
  private customerService: CustomerService;

  constructor(customerService?: CustomerService) {
    this.customerService = customerService || new CustomerService(DI.em);
  }

  async getAll(req: Request, res: Response) {
    try {
      const customers = await this.customerService.findAll();
      res.json({ success: true, data: customers });
    } catch (e: any) {
      res.status(500).json({ success: false, error: e.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const customer = await this.customerService.create(req.body);
      res.status(201).json(customer);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  }
}
