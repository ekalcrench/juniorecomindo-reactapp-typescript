import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const useStyles = makeStyles({
  navLink: {
    textDecoration: "none",
    color: "#000000",
    fontSize: "18px",
    marginTop: "-10px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  logoBrand: {
    height: "30px",
  },
});

export default function NavbarComponent() {
  const classes = useStyles();
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  
  return (
    <AppBar
      position="sticky"
      sx={{
        background: "#ffffff",
        color: "#000000",
        borderBottom: "1px solid #eeecea",
        alignItems: "center",
        boxShadow: "0px 0px",
        height: "55px",
      }}
    >
      <Toolbar>
        <Link to="/home" className={classes.navLink}>
          <img
            src="https://www.poinin.com/_next/image?url=%2Fassets%2Ficon%2Fpoinin_icon.png&w=1920&q=75"
            className={classes.logoBrand}
            alt="Logo Poinin"
          ></img>
        </Link>
        <Link to="/login" className={classes.navLink}>
          Login
        </Link>
        <Link to="/dashboard" className={classes.navLink}>
          Dashboard
        </Link>
        <Link to="/percobaan" className={classes.navLink}>
          Percobaan
        </Link>
        <Link to="/percobaandua" className={classes.navLink}>
          Percobaan 2
        </Link>
        <Link to="/counter" className={classes.navLink}>
          Counter
        </Link>
        {userIsLoggedIn ? (
          <Link to="/dashboard" className={classes.navLink}>
            Dashboard
          </Link>
        ) : (
          <Link to="/login" className={classes.navLink}>
            Login
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
