import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  CardActions,
  Chip,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import { PermissionModel } from "../../services/permissions/types";
import EditIcon from "@mui/icons-material/Edit";
import CategoryIcon from "@mui/icons-material/Category";

type PermissionCardProps = {
  permission: PermissionModel;
  handleOpenEditDialog: (permission: PermissionModel) => void;
};

const StyledCard = styled(Card)({
  width: "100%",
  border: ".5px solid hsla(0, 0%, 100%, .4);",
  color: "#e0e0e0",
  borderImage:
    "linear-gradient(0deg, rgba(22, 174, 225, 0) -17.06%, #fff 562.04%, rgba(22, 174, 225, 0) 0) 1;",
  backgroundColor: "hsla(0, 0%, 100%, .05)",
});

export const PermissionCard = ({
  permission,
  handleOpenEditDialog,
}: PermissionCardProps) => {
  return (
    <StyledCard>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Chip
          label={permission.permissionTypeDescription}
          icon={<CategoryIcon />}
          color="secondary"
          variant="filled"
        />
        <IconButton
          color="warning"
          aria-label="editar"
          aria-hidden={false}
          type="button"
          onClick={() => handleOpenEditDialog(permission)}
        >
          <EditIcon />
        </IconButton>
      </CardActions>
      <CardContent>
        <Typography variant="h6" component="div">
          {permission.employeeName} {permission.employeeLastName}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};
