import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import AddPizza from "../components/AddPizza";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import {useSession,signIn} from 'next-auth/react'
import { useRouter } from "next/router";

export default function Home({pizzaList,admin}) {

const {push,asPath}=useRouter();


  const {data:session}=useSession()
  
  const [close,setClose]=useState(true)



  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in Hyderabad</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      </Head>

      <div >
  
      {session?(""):( <center style={{color:"red" ,fontSize:"bold",backgroundColor: "#d1411e",color:"white", padding:"10px",}}>Please Sign In !</center>)}
        <Featured/>
      {admin?(<button className="btn btn-danger mt-3 ml-3" onClick={()=>setClose(false)}>Add New Pizza</button>):""}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <AddPizza setClose={setClose}/> }</div>
      
      
    </div>
  );
}


export const getServerSideProps=async(ctx)=>{

  const myCookie = ctx.req?.cookies || "";
  let admin=false;
  if (myCookie.token === process.env.TOKEN) {
      admin=true;
  }

  const res=await axios.get("http://localhost:3000/api/products");
  return{
    props:{
      pizzaList:res.data,
      admin
    }
  }
}