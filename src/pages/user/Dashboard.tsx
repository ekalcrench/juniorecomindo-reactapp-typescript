import { Button } from '@mui/material'
import { Container } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { InfoComponent } from '../../components/InfoComponent'
import { setLogout } from '../../features/lainnya/usersSlice';

function Dashboard() {
  const userIsLoggedIn = useAppSelector((state) => state.users.isLoggedIn);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <InfoComponent name="Haekal Azmi" isLoggedIn={userIsLoggedIn} />
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
  );
}

export default Dashboard