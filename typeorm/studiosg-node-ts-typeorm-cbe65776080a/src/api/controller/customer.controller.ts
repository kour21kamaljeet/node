import { Request, Response } from "express";
import i18n from "i18n";
import { ResponseParser } from "@util/response-parser";
import constant from "@config/constant";
import { CustomerService } from "@service/customer.service";

export class CustomerController {
    private responseParser: ResponseParser;
    private customerService: CustomerService;

    constructor() {
        this.responseParser = new ResponseParser();
        this.customerService = new CustomerService();
    }

   /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
  public login = async (req: Request, res: Response): Promise<void> => {
      const {
          body: { email, password },
      } = req;
      const response = await this.customerService.login(email, password);
      this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
   public createCustomer = async (req: Request, res: Response): Promise<void> => {
    const {
      body: { email, password, name },
    } = req;
    const response = await this.customerService.createCustomer(email, password, name);
    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */
  public updateCustomer = async (req: Request, res: Response): Promise<void> => {
    const {
      body: { id: customerId, name },
    } = req;
    const response = await this.customerService.updateCustomer(customerId as number, name);

    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("user_updated"))
      .send(res);
  };

  /**
   * @param  {Request} req
   * @param  {Response} res
   * @returns void
   */ 
   public getCustomer = async (req: Request, res: Response): Promise<void> => {
    const {
      user: { id: customerId },
    } = req;    
    const response = await this.customerService.getCustomer(customerId as number);

    this.responseParser
      .setStatus(true)
      .setHttpCode(constant.HTTP_STATUS_OK)
      .setBody(response)
      .setMessage(i18n.__("SUCCESS"))
      .send(res);
  };
}