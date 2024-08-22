import { useState } from "react";
import { useEffect } from "react";
import { API } from "../services";
import {
  InputCreatePermission,
  PermissionModel,
  PermissionTypeModel,
} from "../services/permissions/types";
import { ApiResponse } from "../services/types";

export function usePermissions() {
  const [permissions, setPermissions] = useState<PermissionModel[]>([]);
  const [permissionTypes, setPermissionTypes] = useState<PermissionTypeModel[]>(
    []
  );

  useEffect(() => {
    dispatchGetPermissionTypes();
    dispatchGetPermissions();
  }, []);

  async function dispatchGetPermissions() {
    const res = await API.permission.getPermissions();
    const { data } = res.data;
    setPermissions(data);
  }

  async function dispatchGetPermissionTypes() {
    const res = await API.permission.getPermissionTypes();
    const { data } = res.data;
    setPermissionTypes(data);
  }

  async function dispatchCreatePermissions(
    input: InputCreatePermission
  ): Promise<ApiResponse<null>> {
    try {
      const { data } = await API.permission.createPermissions(input);
      if (!data.success) {
        return {
          message: "Algo salió mal",
          success: false,
          data: null,
        };
      }
      setPermissions((prev) => [...prev, data.data]);
      return {
        message: "",
        success: true,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Algo salió mal",
        success: false,
        data: null,
      };
    }
  }

  const updatePermissions = (permission: PermissionModel) => {
    setPermissions(
      permissions.map((p) =>
        p.id === permission.id ? { ...p, ...permission } : p
      )
    );
  };

  async function dispatchUpdatePermission(
    input: PermissionModel
  ): Promise<ApiResponse<null>> {
    try {
      const { data } = await API.permission.updatePermissions(input);
      if (!data.success) {
        return {
          message: "Algo salió mal",
          success: false,
          data: null,
        };
      }

      return {
        message: "",
        success: true,
        data: null,
      };
    } catch (error) {
      console.error(error);
      return {
        message: "Algo salió mal",
        success: false,
        data: null,
      };
    }
  }

  return {
    updatePermissions,
    permissions,
    setPermissions,
    permissionTypes,
    dispatchGetPermissions,
    dispatchCreatePermissions,
    dispatchUpdatePermission,
  };
}
