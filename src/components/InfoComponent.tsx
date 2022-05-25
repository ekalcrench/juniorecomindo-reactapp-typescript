import { FormControl, OutlinedInput } from "@mui/material";
import { Container } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";

type PropsType = {
  name: string;
  setName: any;
  isLoggedIn: boolean;
};

export const InfoComponent = (props: PropsType) => {
  const userEmail = useAppSelector((state) => state.users.email);
  const handleChange = (event: any) => {
    props.setName(event.target.value);
    console.log("search : ", event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("handleSubmit");
  };

  return (
    <Container>
      <br />
      <form onSubmit={handleSubmit}>
        <FormControl>
          <OutlinedInput
            id="name"
            type="text"
            name="props.name"
            value={props.name}
            placeholder="Searching..."
            onChange={(event) => handleChange(event)}
          />
        </FormControl>
      </form>
      <h2>Hello {props.name}</h2>
      <h5>Ini InfoComponent</h5>
      <h5>
        Anda telah login dengan email <strong>{userEmail}</strong> dan masuk ke
        halaman Dashboard
      </h5>
      <hr />
      <br />
    </Container>
  );
};
