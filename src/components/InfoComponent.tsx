import { Container } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";

type PropsType = {
  name: string,
  isLoggedIn: boolean,
};

export const InfoComponent = (props: PropsType) => {
  const userEmail = useAppSelector((state) => state.users.email);

  return (
    <Container>
      <br />
      <h2>Hello {props.name}</h2>
      <h5>
        Anda telah login dengan email <strong>{userEmail}</strong> dan masuk ke
        halaman Dashboard
      </h5>
      <hr />
      <br />
    </Container>
  );
};
