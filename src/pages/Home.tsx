import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import NavbarComponent from "../components/NavbarComponent";
import SearchComponent from "../components/SearchComponent";
import { CardComponent, SkeletonComponent } from "../components/PromoComponent";
import {
  setDataCurrentPage,
  setDataNextPage,
  setDataStartRequest,
} from "../features/data/homeSlice";
import { setDataSearch } from "../features/search/searchSlice";
import { API_URL } from "../utils/api";

const useStyles = makeStyles({
  header: {
    display: "flex",
    height: "70px",
    width: "710px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  iconHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  judulHeader: {
    display: "inline-block",
    alignSelf: "flex-end",
    fontSize: "19px",
    fontWeight: "bold",
    marginLeft: "25px",
    paddingBottom: "10px",
  },
  container: {
    backgroundColor: "rgb(247, 247, 247)",
    paddingBottom: "40px",
  },
  box: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    width: "750px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  imageHotPromo: {
    width: "30px",
  },
});

type List = {
  id: number;
  brand: string;
  imageBrand: string;
  jenis: string;
  subjenis: string;
  imageJenis: string;
  waktuBerakhir: string;
};

function Home() {
  // Styling MUI
  const classes = useStyles();

  // React Redux, membuat data menjadi dynamic
  const dispatch = useAppDispatch();
  // searchSlice
  const dataSearch = useAppSelector((state) => state.search.dataSearch);
  // homeSlice
  const dataCurrentPage = useAppSelector((state) => state.home.dataCurrentPage);
  const dataNextPage = useAppSelector((state) => state.home.dataNextPage);
  const dataStartRequest = useAppSelector(
    (state) => state.home.dataStartRequest
  );

  const dataLengthRequest = 8;

  // Untuk tampilan sementara
  const [dataBefore, setDataBefore] = useState<List[]>();
  // const [dataNextPage, setDataNextPage] = useState<List[]>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [dataStartRequest, setDataStartRequest] = useState<number>(8);

  // Store data dari next page ketika yang nantinya akan discrolling
  const getNextPage = () => {
    axios
      .get(
        API_URL +
          "listPromos?_start=" +
          dataStartRequest +
          "&_limit=" +
          dataLengthRequest
      )
      .then((res) => {
        console.log("setDataNextPage : ", res.data);
        dispatch(setDataNextPage(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(setDataStartRequest(dataLengthRequest));
  };

  const handleScroll = (event: any) => {
    console.log("loading : ", loading);
    if (!loading) {
      // Jika sudah mencapai bottom page
      if (
        window.innerHeight + event.target.documentElement.scrollTop + 1 >
        event.target.documentElement.offsetHeight
      ) {
        // Jika masih ada page selanjutnya dan tidak loading
        if (dataNextPage && dataNextPage.length > 0) {
          event.target.documentElement.scrollTop += 20;
          // Untuk keperluan loading skeleton data selanjutnya
          setLoading(true);
          setDataBefore(dataCurrentPage); // Data before
          console.log("setDataBefore : ", dataCurrentPage);
          dispatch(setDataCurrentPage(dataNextPage));
          // Memanggil halaman selanjutnya
          getNextPage();
        }
        console.log("BOTTOM PAGE");
      }
    }
  };

  // ComponentDidMount
  useLayoutEffect(
    () => {
      dispatch(setDataSearch([])); //Reset data dari search
      if (!dataCurrentPage || dataCurrentPage.length === 0) {
        setLoading(true);
        axios
          .get(API_URL + "listPromos?_start=0&_limit=8")
          .then((res) => {
            dispatch(setDataCurrentPage(res.data));
          })
          .catch((error) => {
            console.log(error);
          });
        getNextPage(); // Page selanjutnya
      }
      console.log("ComponentDidMount");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // ComponentDidMount and ComponentDidUpdate Set Time Out untuk Skeleton
  // useEffect tidak berpengaruh kepada selain dari return
  useEffect(() => {
    if (loading) {
      // Jika si loading berubah menjadi true, maka akan set menjadi false dalam kurun waktu 2 detik
      setTimeout(() => setLoading(false), 2000);
    } else {
      console.log("scroll scroll scroll loading ", loading);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <div>
      <NavbarComponent />
      {dataSearch.length > 0 ? (
        <SearchComponent />
      ) : (
          <div>
            {/* Header */}
            <Box className={classes.header}>
              <div className={classes.iconHeader}>
                <img
                  src={"assets/images/hotpromo.png"}
                  className={classes.imageHotPromo}
                  alt="Hot Promo"
                ></img>
              </div>
              <div className={classes.judulHeader}>Promo Terbaik Hari Ini</div>
            </Box>
            {/* Body */}
            <div className={classes.container}>
              {/* If statement untuk skeleton */}
              {!loading && dataCurrentPage.length > 0 ? (
                // Jika tidak loading dan ada listnya
                <Box className={classes.box}>
                  {dataCurrentPage.map((promo) => {
                    return <CardComponent promo={promo} />;
                  })}
                </Box>
              ) : (
                // Jika loading atau belum ada listnya
                <Box className={classes.box}>
                  {dataBefore?.map((promo) => {
                    return <CardComponent promo={promo} />;
                  })}
                  {Array.from(Array(dataLengthRequest), (e, i) => {
                    // Skeleton
                    return <SkeletonComponent i={i} />;
                  })}
                </Box>
              )}
            </div>
          </div>
      )}
    </div>
  );
}

export default Home;
