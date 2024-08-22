import dayjs from "dayjs";

export type PermissionTypeModel = {
  id: number;
  description: string;
};

export type PermissionModel = {
  id: number;
  employeeName: string;
  employeeLastName: string;
  permissionTypeDescription: string;
  permissionTypeId: number;
  permissionDate: dayjs.Dayjs | null;
};

export type InputCreatePermission = {
  employeeName: string;
  employeeLastName: string;
  permissionTypeId: number;
  permissionDate: Date;
};
