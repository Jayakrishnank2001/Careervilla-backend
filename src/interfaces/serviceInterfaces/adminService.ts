export interface AdminAuthResponse {
    status: number;
    data: {
      success: boolean;
      message: string;
      adminId?: string;
      token?: string; 
    };
  }