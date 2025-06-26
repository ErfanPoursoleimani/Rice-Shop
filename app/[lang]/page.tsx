'use client'
import { useParams } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";
import { HomePage, NavBar } from "./components";
import { DataProvider, useData } from "../contexts/DataContext";

const Home = () => {
  const { lang } = useParams()
  const { userId } = useAuth()
  const { user } = useData()

  let cartId = null
  if(user){
    cartId = user.cartId!
  }

  return (
    <>
      <DataProvider lang={lang as string} cartId={cartId} userId={userId}>
        <NavBar />
        <HomePage />
      </DataProvider>
    </>
  )
}

export default Home