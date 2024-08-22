import { ChangeEvent, useState } from "react";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { usePermissions } from "./hooks/usePermissions";
import { PermissionModel } from "./services/permissions/types";
import { PermissionCard } from "./components/PermissionCard/PermissionCard";
import { Header } from "./components/Header/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import "./App.css";

type FormData = {
  id: number;
  username: string;
  lastname: string;
  permissionType: string;
  permissionDate: dayjs.Dayjs | null;
  permissionDescription: string;
};

const initialState = {
  id: 0,
  username: "",
  lastname: "",
  permissionType: "1",
  permissionDate: dayjs(new Date()),
  permissionDescription: "",
};

function App() {
  const {
    permissions,
    permissionTypes,
    dispatchGetPermissions,
    dispatchCreatePermissions,
    dispatchUpdatePermission,
  } = usePermissions();
  const [dialogVisble, setDialogVisible] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialState);
  const [snackbarState, setSnacbarkState] = useState({
    open: false,
    message: "",
  });
  const [dialogType, setDialogType] = useState<"create" | "edit">("create");

  const handleOpenCreationalDialog = () => {
    setDialogType("create");
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setFormData(initialState);
    setDialogVisible(false);
  };

  const submitButtonLabel =
    dialogType === "create" ? "Crear permiso" : "Guardar cambios";

  const dialogHeader =
    dialogType === "create" ? "Nuevo permiso" : "Editar permiso";

  const handleCreatePermission = async () => {
    const { success } = await dispatchCreatePermissions({
      employeeLastName: formData.lastname,
      employeeName: formData.username,
      permissionTypeId: Number(formData.permissionType),
      permissionDate: new Date(),
    });
    if (!success) {
      return;
    }
    setSnacbarkState({
      open: true,
      message: "Permiso creado",
    });
    handleCloseDialog();
    setFormData(initialState);
    dispatchGetPermissions();
  };

  const handleTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (value: Dayjs | null) => {
    setFormData({
      ...formData,
      permissionDate: value,
    });
  };

  const handleOpenEditDialog = (permission: PermissionModel) => {
    setFormData({
      id: permission.id,
      lastname: permission.employeeLastName,
      username: permission.employeeName,
      permissionType: String(permission.permissionTypeId),
      permissionDate: permission.permissionDate,
      permissionDescription: permission.permissionTypeDescription,
    });
    setDialogType("edit");
    setDialogVisible(true);
  };

  const handleEditPermission = async () => {
    const {
      id,
      lastname,
      username,
      permissionType,
      permissionDate,
      permissionDescription,
    } = formData;
    const { success } = await dispatchUpdatePermission({
      employeeLastName: lastname,
      employeeName: username,
      id: id,
      permissionDate: permissionDate,
      permissionTypeId: Number(permissionType),
      permissionTypeDescription: permissionDescription,
    });
    if (!success) return;

    setSnacbarkState({
      open: true,
      message: "Permiso editado",
    });
    handleCloseDialog();
    setFormData(initialState);
    dispatchGetPermissions();
  };

  const handleSubmitForm = () => {
    if (dialogType === "create") {
      handleCreatePermission();
    } else {
      handleEditPermission();
    }
  };

  return (
    <main>
      <Header openDialog={handleOpenCreationalDialog} />
      <section className="permission-list">
        {permissions.map((p) => (
          <PermissionCard
            key={p.id}
            permission={p}
            handleOpenEditDialog={handleOpenEditDialog}
          />
        ))}
      </section>

      <Dialog open={dialogVisble} onClose={handleCloseDialog}>
        <DialogTitle>{dialogHeader}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form autoComplete="off" className="create-form">
            <TextField
              required
              id="username"
              name="username"
              label="Nombre"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.username}
              onChange={handleTextFieldChange}
            />
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Apellidos"
              type="text"
              fullWidth
              variant="outlined"
              value={formData.lastname}
              onChange={handleTextFieldChange}
            />
            <FormControl fullWidth>
              <InputLabel>Tipo de permiso</InputLabel>
              <Select
                name="permissionType"
                value={formData.permissionType}
                onChange={handleSelectChange}
              >
                {permissionTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.description}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha"
                name="permissionDate"
                defaultValue={dayjs(formData.permissionDate)}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            type="submit"
            onClick={handleSubmitForm}
          >
            {submitButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarState.open}
        message={snackbarState.message}
        onClose={() =>
          setSnacbarkState({
            open: false,
            message: "",
          })
        }
        autoHideDuration={2000}
      >
        <Alert severity="success" variant="filled">
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </main>
  );
}

export default App;
