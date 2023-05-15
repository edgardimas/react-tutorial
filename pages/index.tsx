import Image from "next/image";
import MyButton from "../components/button";
import Profile from "../components/user";

export default function Home() {
  return (
    <>
      <h1>Hello</h1>
      <MyButton />
      <Profile />
    </>
  );
}
