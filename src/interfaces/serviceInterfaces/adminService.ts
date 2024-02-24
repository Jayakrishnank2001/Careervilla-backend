export interface AdminLoginResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      adminId?: string;
      token?: string; 
    };
  }