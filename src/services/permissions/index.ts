import http from "../api";
import { ApiResponse } from "../types";
import {
  InputCreatePermission,
  PermissionModel,
  PermissionTypeModel,
} from "./types";

async function getPermissions() {
  return await http.get<ApiResponse<PermissionModel[]>>("/permissions");
}

async function getPermissionTypes() {
  return await http.get<ApiResponse<PermissionTypeModel[]>>("/PermissionTypes");
}

async function createPermissions(input: InputCreatePermission) {
  return await http.post<ApiResponse<PermissionModel>>("/permissions", input);
}

async function updatePermissions(input: PermissionModel) {
  return await http.put<ApiResponse<PermissionModel>>(
    `/permissions/${input.id}`,
    input
  );
}

export default {
  getPermissions,
  createPermissions,
  getPermissionTypes,
  updatePermissions,
};
