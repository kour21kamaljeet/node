import { EntityRepository, Repository } from "typeorm";
import { Customer } from "@database/model/customer.model";

@EntityRepository(Customer)
export class CustomerRepo extends Repository<Customer> {}