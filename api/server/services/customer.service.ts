import { EntityManager, FilterQuery } from "@mikro-orm/core";
import { Customer } from "../entities/Customer";

export class CustomerService {
  constructor(private readonly em: EntityManager) {
    if (!em) throw new Error("EntityManager required");
  }

  async create(data: {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    orders?: string[];
  }): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, data);
    await this.em.persistAndFlush(customer);
    return customer;
  }

  async findAll(filter: FilterQuery<Customer> = {}): Promise<Customer[]> {
    return await this.em.find(Customer, filter);
  }
}
