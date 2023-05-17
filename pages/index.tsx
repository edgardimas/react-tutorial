import { useState } from "react";

import Image from "next/image";
import MyButton from "../components/button";
import Profile from "../components/user";
import ShoppingList from "../components/shppping";

export default function Home() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Hello</h1>
      <MyButton count={count} onClick={handleClick} />
      <h1></h1>
      <MyButton count={count} onClick={handleClick} />
      <Profile />
      <ShoppingList />
    </>
  );
}
