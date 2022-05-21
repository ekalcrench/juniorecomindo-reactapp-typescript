import { useState, useEffect } from "react";

const delay = 5;

export default function PercobaanDua() {
  const [show, setShow] = useState(false);
  const countList = 8;

  useEffect(
    () => {
      let timer1 = setTimeout(() => setShow(!show), delay * 1000);

      // this will clear Timeout
      // when component unmount
      return () => {
        clearTimeout(timer1);
      };
    },
    // Array ini berisi sebuah props, jadi ketika nilai dari arary ini berubah, maka akan re-run kembali useEffect ini
    [show]
  );

  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      {show ? (
        <div>show is true, {delay}seconds passed</div>
      ) : (
        <div>show is false, wait {delay}seconds</div>
      )}
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <ul>
        {Array.from(Array(countList), (e, i) => {
          return <li key={i}>{i}</li>;
        })}
      </ul>
    </div>
  );
}
