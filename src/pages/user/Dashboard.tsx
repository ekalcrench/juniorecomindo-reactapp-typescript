import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InfoComponent } from "../../components/InfoComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SearchComponent from "../../components/SearchComponent";
import { setDataSearch } from "../../features/search/searchSlice";
import { setLogout } from "../../features/user/usersSlice";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../authConfig";
import { callMsGraph } from "../../features/user/graph";

const useStyles = makeStyles({
  dashboard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "60%",
  },
});

function handleLogout(instance: any) {
  instance.logoutPopup().catch((e: any) => {
    console.error(e);
  });
}

function Dashboard() {
  // MUI styling
  const classes = useStyles();

  // Redux
  const dataSearch = useAppSelector((state) => state.search.dataSearch);
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  // Outlook
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);

  // Render
  const [name, setName] = useState<string>("");

  // ComponentDidMount
  useLayoutEffect(
    () => {
      dispatch(setDataSearch([]));

      // Jika login menggunakan outlook, maka setGraphData
      if (accounts.length > 0) {
        const request = {
          ...loginRequest,
          account: accounts[0],
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        instance
          .acquireTokenSilent(request)
          .then((response) => {
            callMsGraph(response.accessToken).then((response: any) => {
              setGraphData(response);
              console.log("response.accessToken 1 : ", response.accessToken);
            });
          })
          .catch((e) => {
            instance.acquireTokenPopup(request).then((response: any) => {
              callMsGraph(response.accessToken).then((response: any) => {
                setGraphData(response);
                console.log("response.accessToken 2 : ", response.accessToken);
              });
            });
          });
      }
      console.log("accounts : ", accounts);
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
        <div className={classes.dashboard}>
          <div className={classes.container}>
            <InfoComponent
                graphData={graphData}
                name={name}
                setName={setName}
                isLoggedIn={userIsLoggedIn}
              />
            <h2>Hello {name}</h2>
            <h5>Ini Dashboard</h5>
            <hr />
            <br />
            {/* Logout jika menggunakan redux maka dispatch, else maka handlelogout*/}
            {userIsLoggedIn ? (
              <Button
                onClick={() => dispatch(setLogout())}
                sx={{
                  backgroundColor: "#fe5b2c",
                  borderRadius: "15px",
                  boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
                  color: "white",
                  height: "40px",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "rgb(247, 247, 247)",
                    color: "#fe5b2c",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => handleLogout(instance)}
                sx={{
                  backgroundColor: "#fe5b2c",
                  borderRadius: "15px",
                  boxShadow: "1px 1px 2px 2px rgb(0 0 0 / 10%)",
                  color: "white",
                  height: "40px",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "rgb(247, 247, 247)",
                    color: "#fe5b2c",
                  },
                }}
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
