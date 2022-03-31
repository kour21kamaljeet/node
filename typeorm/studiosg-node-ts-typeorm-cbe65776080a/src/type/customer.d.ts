export interface BasicCustomerDetailResponse {
    email: string;
    id: number;
  }
  
  export interface LoggedInCustomer extends BasicCustomerDetailResponse {
    token: string;
  }

  export interface UpdateProfile {
    id: number;
    name: string;
  }