import { decrement, incrementByAmount } from "../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Container } from "@mui/system";
import { Button } from "@mui/material";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const countValue = useAppSelector((state) => state.counter.value);
  const countJumlah = useAppSelector((state) => state.counter.jumlah);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <div>
        <Button
          variant="contained"
          onClick={() => dispatch(incrementByAmount(2))}
        >
          Increment
        </Button>
        <span>&nbsp;&nbsp;Value: {countValue}</span>
        <span>&nbsp;Jumlah: {countJumlah}&nbsp;&nbsp;</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </Container>
  );
}
