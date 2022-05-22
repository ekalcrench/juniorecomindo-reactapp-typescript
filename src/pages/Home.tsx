import { Card, CardContent, CardMedia, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";

const useStyles = makeStyles({
  header: {
    display: "flex",
    height: "70px",
    width: "700px",
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
    fontSize: "20px",
    fontWeight: "bold",
    marginLeft: "20px",
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
  item: {
    marginTop: "30px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  imageHotPromo: {
    width: "30px",
  },
  imageBrand: {
    height: "25px",
    marginBottom: "15px",
    marginLeft: "5px",
  },
  imageJenis: {
    height: "150px",
    marginTop: "-10px",
  },
  imageWaktuBerakhir: {
    height: "12px",
  },
  cardHeader: {
    fontSize: "10px",
    fontWeight: "bold",
    marginTop: "-15px",
    marginBottom: "10px",
    marginLeft: "-3px",
  },
  cardContent: {
    fontSize: "12px",
    marginLeft: "-3px",
  },
  waktuBerakhir: {
    fontSize: "8px",
    fontWeight: "bold",
    marginTop: "-10px",
    marginLeft: "5px",
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

  // Untuk tampilan
  let start = 0;
  const countList = 8;
  let currentPage: any[] = [];
  let nextPage: any[] = [];
  const [list, setList] = useState<List[] | Array<any> | undefined>();
  const [listBefore, setListBefore] = useState<
    List[] | Array<any> | undefined
  >();
  const [offset, setOffset] = useState<number>(8);
  const [loading, setLoading] = useState(false);

  // Ini hanya dipakai ketika mounting saja
  // Mounting 12 list
  const getPromoList = () => {
    axios
      .get(API_URL + "listPromos?_start=" + start + "&_limit=" + countList)
      .then((res) => {
        currentPage = res.data;
        setList(currentPage);
        console.log("res.data : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    start += countList;
  };

  // Store data dari next page ketika yang nantinya akan discrolling
  const getNextPage = () => {
    axios
      .get(API_URL + "listPromos?_start=" + start + "&_limit=" + countList)
      .then((res) => {
        nextPage = res.data;
        console.log("next page : ", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    start += countList;
  };

  const handleScroll = (event: any) => {
    if (
      window.innerHeight + event.target.documentElement.scrollTop + 0.3 >
      event.target.documentElement.offsetHeight
    ) {
      // Jika masih ada page selanjutnya
      if (nextPage.length !== 0) {
        // Disaring dulu agar tidak double datanya
        let find = false;
        currentPage.filter((page) => {
          if (page.id === nextPage[0].id) {
            find = true;
            return find;
          }
          return false;
        });
        if (find === false) {
          // Untuk keperluan loading skeleton data selanjutnya
          setLoading(false);
          setOffset(countList);
          setListBefore(currentPage);
          console.log("setListBefore : ", currentPage);

          // Untuk keperluan tampilan semua data
          currentPage = [...currentPage, ...nextPage];
          setList(currentPage);
          console.log("setList : ", currentPage);
          
          // Memanggil halaman selanjutnya
          getNextPage();
        } else {
          console.log("Data double BROH !!!");
        }
      }
      console.log("At the bottom of the page");
    }
  };

  // Set Time Out untuk Skeleton
  useEffect(() => {
    let timer = setTimeout(() => setLoading(true), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [loading]);

  // ComponentDidMount
  useEffect(
    () => {
      getPromoList(); // Page sekarang
      getNextPage(); // Page selanjutnya
      window.addEventListener("scroll", handleScroll);
      console.log("ComponentDidMount");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      {/* Header */}
      <div>
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
      </div>
      {/* Body */}
      <div className={classes.container}>
        {/* If statement untuk skeleton */}
        {loading && list ? (
          // Jika tidak loading dan ada listnya
          <Box className={classes.box}>
            {list?.map((promo) => {
              return (
                <div className={classes.item} key={promo.id}>
                  {/* Image Brand */}
                  <img
                    src={"assets/images/brand/" + promo.imageBrand}
                    className={classes.imageBrand}
                    alt={promo.brand}
                  ></img>
                  {/* Card */}
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
                    }}
                  >
                    <CardContent>
                      <div className={classes.cardHeader}>Hot Promo</div>
                      <div className={classes.cardContent}>{promo.jenis}</div>
                      <div className={classes.cardContent}>
                        <strong>{promo.subjenis}</strong>
                      </div>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={"assets/images/" + promo.imageJenis}
                      className={classes.imageJenis}
                      alt={"assets/images/" + promo.imageJenis}
                    />
                  </Card>
                  {/* Timer Discount */}
                  <div>
                    <Box component="div" sx={{ display: "inline" }}>
                      <img
                        src="assets/images/hours_glass.png"
                        className={classes.imageWaktuBerakhir}
                        alt="Waktu Berakhir"
                      ></img>
                    </Box>
                    <Box
                      className={classes.waktuBerakhir}
                      component="div"
                      sx={{ display: "inline" }}
                    >
                      {promo.waktuBerakhir}
                    </Box>
                  </div>
                </div>
              );
            })}
          </Box>
        ) : (
          // Jika loading atau belum ada listnya
          <Box className={classes.box}>
            {listBefore?.map((promo) => {
              return (
                <div className={classes.item} key={promo.id}>
                  {/* Image Brand */}
                  <img
                    src={"assets/images/brand/" + promo.imageBrand}
                    className={classes.imageBrand}
                    alt={promo.brand}
                  ></img>
                  {/* Card */}
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
                    }}
                  >
                    <CardContent>
                      <div className={classes.cardHeader}>Hot Promo</div>
                      <div className={classes.cardContent}>{promo.jenis}</div>
                      <div className={classes.cardContent}>
                        <strong>{promo.subjenis}</strong>
                      </div>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image={"assets/images/" + promo.imageJenis}
                      className={classes.imageJenis}
                      alt={"assets/images/" + promo.imageJenis}
                    />
                  </Card>
                  {/* Timer Discount */}
                  <div>
                    <Box component="div" sx={{ display: "inline" }}>
                      <img
                        src="assets/images/hours_glass.png"
                        className={classes.imageWaktuBerakhir}
                        alt="Waktu Berakhir"
                      ></img>
                    </Box>
                    <Box
                      className={classes.waktuBerakhir}
                      component="div"
                      sx={{ display: "inline" }}
                    >
                      {promo.waktuBerakhir}
                    </Box>
                  </div>
                </div>
              );
            })}
            {Array.from(Array(offset), (e, i) => {
              // Skeleton
              return (
                <div className={classes.item} key={i}>
                  {/* Image Brand */}
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "25px",
                      width: "70%",
                      marginBottom: "18px",
                      marginLeft: "5px",
                      borderRadius: "20px",
                    }}
                  />
                  {/* Card */}
                  <Card
                    sx={{
                      borderRadius: "10px",
                      boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
                    }}
                  >
                    <CardContent>
                      <div className={classes.cardHeader}>
                        <Skeleton
                          variant="text"
                          sx={{ width: "50px", height: "12px" }}
                        />
                      </div>
                      <div className={classes.cardContent}>
                        <Skeleton
                          variant="text"
                          sx={{ width: "40px", height: "15px" }}
                        />
                      </div>
                      <div className={classes.cardContent}>
                        <Skeleton
                          variant="text"
                          sx={{ height: "15px", marginTop: "-2px" }}
                        />
                      </div>
                    </CardContent>
                    <Skeleton
                      variant="rectangular"
                      sx={{ height: "150px", marginTop: "-10px" }}
                    />
                  </Card>
                  {/* Timer Discount */}
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: "12px",
                      width: "65%",
                      marginTop: "10px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              );
            })}
          </Box>
        )}
      </div>
    </div>
  );
}

export default Home;
