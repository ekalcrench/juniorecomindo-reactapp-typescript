import {
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { promos } from "../components/ListPromos";

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

function Home() {
  const classes = useStyles();
  let lists = null;
  return (
    <div>
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
      <div className={classes.container}>
        <Box className={classes.box}>
          {lists ? <h3>Ada Promo</h3> : <h3>Tidak Ada Promo</h3>}
          {/* {setTimeout(() => console.log("TIMEOUT"), 2000)} */}
          {lists ? <h3>Ada Promo</h3> : <h3>Tidak Ada Promo</h3>}
          {promos.map((promo) => {
            return (
              <div className={classes.item}>
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
      </div>
    </div>
  );
}

export default Home;
