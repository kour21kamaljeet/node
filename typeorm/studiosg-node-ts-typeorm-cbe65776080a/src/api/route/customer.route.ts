import express from "express";
import { CustomerController } from "@api/controller/customer.controller";
import { HttpRequestValidator } from "@middleware/http-request-validator";
import { loginValidation, registerCustomer, updateCustomer, getCustomer } from "@api/validator/customer.validator";
import { AuthenticateRequest } from "@middleware/authenticate-request";

class CustomerRoute {
    public router: express.Router = express.Router();
    private customerController: CustomerController;
    private httpRequestValidator: HttpRequestValidator;
    private authenticate; 

    constructor() {
        this.customerController = new CustomerController(); 
        this.httpRequestValidator = new HttpRequestValidator();
        const authMiddleware = new AuthenticateRequest();
        this.authenticate = authMiddleware.validate;
        this.assign();
    }

    private assign() {

        this.router.post( 
            "/loginCustomer",
            this.httpRequestValidator.validate("body",loginValidation), 
            this.customerController.login
        );

        this.router.post(  
            "/registerCustomer",  
            this.httpRequestValidator.validate("body", registerCustomer),
            this.customerController.createCustomer
        );

        this.router.put(   
            "/updateCustomer",
            this.authenticate,
            this.httpRequestValidator.validate("body", updateCustomer),
            this.customerController.updateCustomer 
        );

        this.router.get(   
            "/getCustomer",
            this.authenticate,
            this.httpRequestValidator.validate("body", getCustomer),
            this.customerController.getCustomer 
        );
    }
}
export default new CustomerRoute().router;
