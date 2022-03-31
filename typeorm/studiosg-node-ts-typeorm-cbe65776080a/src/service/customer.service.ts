import { getManager } from "typeorm";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import createError from "http-errors";
import { Customer } from "@database/model/customer.model";
import { LoggedInCustomer, UpdateProfile } from "@type/customer";
import { JWT_SECRET } from "@config/secret";
import { TIMEZONE } from "@config/secret";
import i18n from "i18n";
import moment from "moment-timezone";
import asyncForEach from "@util/asyncForEach";
import { CustomerRepo } from "@database/repository/customer.repository";
import { RandomKeyGenerator } from "@util/random-key-generator";
import constant from "@config/constant";

export class CustomerService {
    constructor() {
        moment.tz.setDefault(TIMEZONE);
    }

    public async login(email: string, password: string): Promise<LoggedInCustomer> {
        const customerRepo = getManager().getCustomRepository(CustomerRepo);
        const customer = await customerRepo.findOne({ email: email.toLowerCase() });
        if(!customer) {
            throw new createError.NotFound(i18n.__("customer_not_found"));
        }
        const validPassword = await bcrypt.compare(password, customer.password);
        if (!validPassword) {
            throw new createError.Unauthorized(i18n.__("incorrect_password"));
        }

        const token = jwt.sign(
            { id: customer.id, email: customer.email, password: customer.password },
            JWT_SECRET
        );
        return { id: customer.id, email: customer.email, token };
    }

    /**
   * @param  {string} email customer's email
   * @param  {string} password password
   * @returns Promise<Customer>
   */
  public async createCustomer(email: string, password: string, name: string): Promise<Customer> {
    const customerRepo = getManager().getCustomRepository(CustomerRepo);
    const customerExists = await customerRepo.findOne({ email: email.toLowerCase() });
    if (customerExists) {
      throw new createError.BadRequest(i18n.__("customer_already_exists"));
    }

    const isVerified: boolean = false;
    const keyGen = new RandomKeyGenerator();
    const userUniqueKey = keyGen.generate(10);

    const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return customerRepo.save({
         email: email.toLowerCase(),
         password: hashedPassword,
         name
    });
  }

  public async updateCustomer(
    customerId: number,
    name: string
  ): Promise<UpdateProfile> {
    const customerRepo = getManager().getCustomRepository(CustomerRepo);
    const customer = await customerRepo.findOne({ id: customerId });
    if (!customer) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
   
    await customerRepo.update({ id: customerId }, { name: name });
    const updatedUser = await customerRepo.findOne({ id: customerId });
    return updatedUser;
  }

  public async getCustomer( customerId: number ): Promise<Customer> { 
    const customerRepo = getManager().getCustomRepository(CustomerRepo);
    const customer = await customerRepo.findOne({ id: customerId });
    if (!customer) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
    return customer;
  }

}