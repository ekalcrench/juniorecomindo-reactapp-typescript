import { Card, CardContent, Skeleton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  item: {
    marginTop: "20px",
    marginLeft: "21px",
    marginRight: "21px",
  },
  promo: {
    width: "145px",
    height: "260px",
    borderRadius: "10px",
  },
  brand: {
    height: "15%",
    width: "100%",
    marginBottom: "3px",
    display: "flex",
    flexDirection: "row",
  },
  imageBrand: {
    height: "100%",
    width: "50%",
    objectFit: "scale-down",
  },
  cardHeader: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "700",
    borderTopLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    width: "50%",
    height: "25%",
    fontSize: "10px",
    margin: "auto 0px 5px",
  },
  cardContent: {
    height: "auto",
    width: "100%",
    padding: "0px 9px",
    fontSize: "13px",
  },
  cardImage: {
    display: "flex",
    height: "70%",
    width: "100%",
    overflow: "hidden",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  cardImageDetail: {
    height: "100%",
    maxWidth: "100%",
    objectFit: "cover",
    margin: "0px auto",
  },
  bottomCard: {
    display: "flex",
    marginTop: "2px",
    flexDirection: "row",
    overflow: "hidden",
  },
  imageWaktuBerakhir: {
    height: "12px",
    margin: "0px 5px 0px 0px",
    verticalAlign: "center",
  },
  waktuBerakhir: {
    fontSize: "9px",
    fontWeight: "700",
    marginTop: "6px",
  },
});

type PropsCard = {
  promo: any;
};

export const CardComponent = (props: PropsCard) => {
  // Styling MUI
  const classes = useStyles();

  return (
    <div className={classes.item} key={props.promo.id}>
      <div className={classes.promo}>
        {/* Image Brand */}
        <div className={classes.brand}>
          <img
            src={"assets/images/brand/" + props.promo.imageBrand}
            className={classes.imageBrand}
            alt={props.promo.brand}
          ></img>
        </div>
        {/* Card */}
        <Card
          sx={{
            height: "85%",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
          }}
        >
          {/* Thumbnail Card */}
          <CardContent sx={{ height: "30%", width: "100%", padding: "0px" }}>
            <div
              className={classes.cardHeader}
              style={{ backgroundColor: props.promo.color }}
            >
              Hot Promo
            </div>
            <div className={classes.cardContent}>
              <div style={{ fontWeight: "normal" }}>{props.promo.jenis}</div>
              <div style={{ fontWeight: "bold", marginTop: "1px" }}>
                {props.promo.subjenis}
              </div>
            </div>
          </CardContent>
          {/* Image Card */}
          <div
            className={classes.cardImage}
            style={{ backgroundColor: props.promo.color }}
          >
            <img
              src={"assets/images/" + props.promo.imageJenis}
              alt={"assets/images/" + props.promo.imageJenis}
              className={classes.cardImageDetail}
            ></img>
          </div>
        </Card>
      </div>
      {/* Timer Discount */}
      <div className={classes.bottomCard}>
        <div>
          <img
            src="assets/images/hours_glass.png"
            className={classes.imageWaktuBerakhir}
            alt="Waktu Berakhir"
          ></img>
        </div>
        <div className={classes.waktuBerakhir}>{props.promo.waktuBerakhir}</div>
      </div>
    </div>
  );
};

type PropsSkeleton = {
  i: number;
};

export const SkeletonComponent = (props: PropsSkeleton) => {
  // Styling MUI
  const classes = useStyles();

  return (
    <div className={classes.item} key={props.i}>
      <div className={classes.promo}>
        {/* Image Brand */}
        <Skeleton
          variant="rectangular"
          sx={{
            height: "11%",
            width: "50%",
            marginTop: "8px",
            marginBottom: "8px",
            borderRadius: "20px",
          }}
        />
        {/* Card */}
        <Card
          sx={{
            height: "85%",
            width: "100%",
            borderRadius: "10px",
            boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
          }}
        >
          <CardContent
            sx={{
              height: "30%",
              width: "100%",
              paddingTop: "0px",
              paddingLeft: "9px",
            }}
          >
            <div>
              <Skeleton
                variant="text"
                sx={{ width: "50%", height: "25%", marginBottom: "5px" }}
              />
            </div>
            <div>
              <Skeleton variant="text" sx={{ width: "40%", height: "20%" }} />
              <Skeleton
                variant="text"
                sx={{ height: "15px", marginTop: "1px" }}
              />
            </div>
          </CardContent>
          {/* Card Image Skeleton */}
          <Skeleton variant="rectangular" sx={{ height: "70%" }} />
        </Card>
      </div>
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
};
