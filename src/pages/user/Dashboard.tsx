import { Button } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { InfoComponent } from "../../components/InfoComponent";
import NavbarComponent from "../../components/NavbarComponent";
import SearchComponent from "../../components/SearchComponent";
import { setDataSearch } from "../../features/search/searchSlice";
import { setLogout } from "../../features/user/usersSlice";

function Dashboard() {
  // Redux
  const dataSearch = useAppSelector((state) => state.search.dataSearch);
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");

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
        <Container>
          <InfoComponent
            name={name}
            setName={setName}
            isLoggedIn={userIsLoggedIn}
          />
          {name ? <h3>Ada namanya</h3> : <h3>Ga ada namanya</h3>}
          <h2>Hello {name}</h2>
          <h5>Ini Dashboard</h5>

          {/* Logout */}
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
            Logout Bor
          </Button>
        </Container>
      )}
    </div>
  );
}

export default Dashboard;
