// Percobaan Koneksi dengan MySql

import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import NavbarComponent from "../components/NavbarComponent";
import axios from "axios";
import { useLayoutEffect, useState } from "react";

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
  movieName: string;
  movieReview: string;
};

type List = {
  id: number;
  movieName: string;
  movieReview: string;
};

export default function Percobaan() {
  // MUI styling
  const classes = useStyles();
  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const [reviewMovieList, setReviewMovieList] = useState<List[]>();

  const onSubmit: SubmitHandler<Data> = (data) => {
    axios
      .post("http://localhost:3001/api/insert", data)
      .then(function () {
        alert("Successful insert");
        console.log("DATA : ", data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ComponentDidMount
  useLayoutEffect(
    () => {
      axios
        .get("http://localhost:3001/api/get")
        .then((response) => {
          console.log("RESPONSE : ", response);
          setReviewMovieList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <NavbarComponent />

      <div className={classes.login}>
        <div className={classes.form}>
          <div className={classes.judulLogin}>
            <div>Form Review Movie</div>
          </div>
          <div className={classes.isiLogin}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                id="movieName"
                className={classes.input}
                type="text"
                placeholder="Masukan Movie Name"
                {...register("movieName", { required: true })}
              />
              {errors.movieName && <span>This field is required</span>}
              <input
                id="movieReview"
                className={classes.input}
                type="text"
                placeholder="Masukan Movie Review"
                {...register("movieReview", { required: true })}
              />
              {errors.movieReview && <span>This field is required</span>}
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

      <div>{reviewMovieList && reviewMovieList.map((val) => {
         return (<h1>MovieName : {val.movieName} and MovieReview : {val.movieReview}</h1>)
      })}</div>
    </div>
  );
}
