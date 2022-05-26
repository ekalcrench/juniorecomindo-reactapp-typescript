import { FormControl, OutlinedInput } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDataSearch } from "../features/search/searchSlice";
import { API_URL } from "../utils/api";

const useStyles = makeStyles({
  body: {
    fontFamily:
      "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "11px",
    fontWeight: "500",
    color: "#a9a9a9",
    marginTop: "-10px",
    marginLeft: "10px",
    marginRight: "10px",
  },
  logoBrand: {
    height: "30px",
  },
});

const NavbarComponent = () => {
  // Styling MUI
  const classes = useStyles();
  // React Redux
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState<any>("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setSearch(event.target.value);
    setLoading(false);
    console.log("search : ", event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    console.log("handleSubmit");
  };

  // Searching
  useEffect(() => {
    if (search.length >= 3 || loading) {
      if (loading) {
        console.log("Waktunya SEARCHING BOSS");
        axios
          .get(API_URL + "listPromos?brand_like=" + search)
          .then((res) => {
            dispatch(setDataSearch(res.data));
            console.log("res data : ", res.data);
            console.log("res data length : ", res.data.length);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Jika data sudah lebih dari 3 karakter dan 
        setTimeout(() => setLoading(true), 2000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, loading]);

  return (
    <div className={classes.body}>
      <AppBar
        position="sticky"
        sx={{
          background: "#ffffff",
          color: "#000000",
          borderBottom: "1px solid #eeecea",
          alignItems: "center",
          boxShadow: "0px 0px",
          minHeight: "55px",
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
          <form onSubmit={handleSubmit}>
            <FormControl size="small" sx={{ width: "180px", height: "55px" }}>
              <OutlinedInput
                id="search"
                type="text"
                name="search"
                value={search}
                placeholder="Searching..."
                onChange={(event) => handleChange(event)}
              />
            </FormControl>
          </form>
          {userIsLoggedIn ? (
            <Link to="/dashboard" className={classes.navLink}>
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className={classes.navLink}>
              Login
            </Link>
          )}
          <Link to="/dashboard" className={classes.navLink}>
            Dashboard
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavbarComponent;
