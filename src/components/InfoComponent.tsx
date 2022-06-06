import { FormControl, OutlinedInput } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { ProfileData } from "./ProfileData";

type PropsType = {
  name: string;
  setName: any;
  isLoggedIn: boolean;
  graphData: null | any;
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
    <div>
      <br />
      {props.graphData ? (
        <ProfileData graphData={props.graphData} />
      ) : (
        <h2>
          Anda telah login dengan email <strong>{userEmail}</strong> dan masuk
          ke halaman Dashboard
        </h2>
      )}
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
            sx={{ width: "100%" }}
          />
        </FormControl>
      </form>
      <br />
      <hr />
      <br />
      <h2>Hello {props.name}</h2>
      <h5>Ini InfoComponent</h5>
      <hr />
      <br />
    </div>
  );
};
