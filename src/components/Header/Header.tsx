import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import n5Image from "../../assets/n5photo.svg";
import Button from "@mui/material/Button";

type HeaderProps = {
  openDialog: () => void;
};
export const Header = ({ openDialog }: HeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "#000", padding: "0.5rem" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <figure className="brand">
          <img src={n5Image} alt="N5 challengue" />
        </figure>
        <Button onClick={openDialog} color="primary" variant="contained">
          Crear permiso
        </Button>
      </Toolbar>
    </AppBar>
  );
};
