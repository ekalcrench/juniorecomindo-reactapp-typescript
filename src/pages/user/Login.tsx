import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLogin } from "../../features/user/usersSlice";
import NavbarComponent from "../../components/NavbarComponent";
import SearchComponent from "../../components/SearchComponent";
import { setDataSearch } from "../../features/search/searchSlice";
import { useLayoutEffect } from "react";


const useStyles = makeStyles({
  form: {
    marginTop: "100px",
  },
  judulLogin: {
    display: "block",
    fontSize: "30px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "50px",
  },
  box: {
    display: "block",
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
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
        <div className={classes.form}>
          <div className={classes.judulLogin}>
            <div>Login Admin</div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className={classes.box}>
              <FormControl sx={{ marginTop: "20px", width: "600px" }}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  placeholder="Masukan Email"
                  {...register("email", { required: true })}
                />
              </FormControl>
              {errors.email && <span>This field is required</span>}
              <FormControl sx={{ marginTop: "20px", width: "600px" }}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type="password"
                  placeholder="Masukan Password"
                  {...register("password", { required: true })}
                />
              </FormControl>
              {errors.password && <span>This field is required</span>}
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#fe5b2c",
                  borderRadius: "15px",
                  boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
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
            </Box>
          </form>
        </div>
      )}
    </div>
  );
}
