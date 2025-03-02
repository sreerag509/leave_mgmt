
export interface LeaveRequest {
    _id: number;
    employeeName: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }