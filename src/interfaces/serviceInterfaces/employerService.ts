export interface EmployerAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      userId?: string;
      token?: string; 
    };
  }