import classNames from "classnames";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDataSearch } from "../features/search/searchSlice";
import { API_URL } from "../utils/api";
// Azure AD
import { useIsAuthenticated } from "@azure/msal-react";

const useStyles = makeStyles({
  nav: {
    position: "sticky",
    top: 0,
    display: "flex",
    background: "#ffffff",
    borderBottom: "1px solid #eeecea",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 0px",
    minHeight: "55px",
  },
  row: {
    display: "flex",
    width: "47.5%", // untuk xl
    // width: "73%", // untuk md
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  col3: {
    display: "flex",
    width: "25%",
    alignItems: "center",
  },
  col6: {
    display: "flex",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  navLink: {
    textDecoration: "none",
    fontSize: "11px",
    fontWeight: "500",
    color: "#a9a9a9",
  },
  navForm: {
    // Background Search Bar
    backgroundImage: "url(/assets/gif/search.gif)",
    backgroundSize: "120px 25px",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "10px",
    backgroundPositionY: "center",
    "&:focus": {
      backgroundSize: "0px",
      "&::placeholder": {
        fontSize: "16px",
        fontWeight: "100",
        color: "#858585",
      },
    },
    "&::placeholder": {
      color: "transparent",
    },

    // Ukuran Search Bar
    width: "100%",
    backgroundColor: "#eeecea",
    borderRadius: "5px",
    borderWidth: "0px",
    paddingLeft: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    outline: "none",
  },
  navRight: {
    justifyContent: "right",
  },
  logoBrand: {
    height: "30px",
    // padding: "3px 0!important",
  },
});

const NavbarComponent = () => {
  // Styling MUI
  const classes = useStyles();
  // Azure AD
  const isAuthenticated = useIsAuthenticated();

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
    <div className={classes.nav}>
      <div className={classes.row}>
        <Link to="/home" className={classes.col3}>
          <img
            src="https://www.poinin.com/_next/image?url=%2Fassets%2Ficon%2Fpoinin_icon.png&w=1920&q=75"
            className={classes.logoBrand}
            alt="Logo Poinin"
          ></img>
        </Link>
        <form onSubmit={handleSubmit} className={classes.col6}>
          <input
            className={classes.navForm}
            placeholder="Search Promo and Mall"
            type="text"
            name="search"
            value={search}
            onChange={(event) => handleChange(event)}
          />
        </form>
        {isAuthenticated || userIsLoggedIn ? (
          <Link
            to="/dashboard"
            className={classNames(
              classes.navLink,
              classes.col3,
              classes.navRight
            )}
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className={classNames(
              classes.navLink,
              classes.col3,
              classes.navRight
            )}
          >
            Cari Promo? di Poinin Aja
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavbarComponent;
