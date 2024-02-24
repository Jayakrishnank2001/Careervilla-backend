export interface JobseekerLoginResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      userId?: string;
      token?: string; 
    };
  }