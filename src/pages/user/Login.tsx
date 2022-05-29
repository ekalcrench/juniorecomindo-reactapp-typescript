import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLogin } from "../../features/user/usersSlice";
import NavbarComponent from "../../components/NavbarComponent";
import SearchComponent from "../../components/SearchComponent";
import { setDataSearch } from "../../features/search/searchSlice";
import { useLayoutEffect } from "react";


const useStyles = makeStyles({
  login: {
    height: "620px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "40%",
    borderStyle: "solid",
    borderRadius: "5px",
    borderWidth: "1px",
    borderColor: "rgb(0 0 0 / 10%)",
    // Kanan, Bawah, Blur, Spread, Color
    boxShadow: "10px 10px 10px 1px rgb(0 0 0 / 10%)",
    padding: "40px",
  },
  judulLogin: {
    width: "100%",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "40px",
  },
  isiLogin: {
    width: "100%",
  },
  input: {
    "&::placeholder": {
      color: "black",
      paddingLeft: "10px",
    },
    "&:focus": {
      backgroundColor: "rgb(247, 247, 247)",
      "&::placeholder": {
        color: "#e6e7e8",
      },
    },
    "&:hover": {
      backgroundColor: "rgb(247, 247, 247)",
      "&::placeholder": {
        color: "#fe5b2c",
      },
    },
    // Ukuran Search Bar
    height: "40px",
    width: "100%",
    backgroundColor: "#eeecea",
    borderRadius: "5px",
    borderWidth: "0px",
    boxShadow: "1px 1px 2px 1px rgb(0 0 0 / 10%)",
    marginTop: "20px",
  },
});

type Data = {
  email: string;
  password: string;
};

export default function Login() {
  // MUI styling
  const classes = useStyles();
  // Redux
  const dataSearch = useAppSelector((state) => state.search.dataSearch);
  const dispatch = useAppDispatch();
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();
  const onSubmit: SubmitHandler<Data> = (data) => {
    dispatch(setLogin(data.email));
  };

  // ComponentDidMount
  useLayoutEffect(
    () => {
      dispatch(setDataSearch([]));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <NavbarComponent />
      {dataSearch.length > 0 ? (
        <SearchComponent />
      ) : (
        <div className={classes.login}>
          <div className={classes.form}>
            <div className={classes.judulLogin}>
              <div>Login Admin</div>
            </div>
            <div className={classes.isiLogin}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  id="email"
                  className={classes.input}
                  type="email"
                  placeholder="Masukan Email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}
                <input
                  id="password"
                  className={classes.input}
                  type="password"
                  placeholder="Masukan Password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#fe5b2c",
                    borderRadius: "15px",
                    boxShadow: "1px 1px 2px 1px rgb(0 0 0 / 10%)",
                    color: "white",
                    height: "40px",
                    width: "100%",
                    marginTop: "20px",
                    "&:hover": {
                      backgroundColor: "rgb(247, 247, 247)",
                      color: "#fe5b2c",
                    },
                  }}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
