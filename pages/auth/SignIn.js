import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Signin.module.css";
import {useSession,signIn,signOut} from 'next-auth/react'
import {BsGithub,BsTwitter,BsGoogle} from 'react-icons/bs'
import Head from "next/head";


const providers=[
  {
  name : 'github' ,
  Icon : BsGithub ,
  },
  {
    name : 'twitter' ,
    Icon : BsTwitter ,
  },
  {
    name : 'google' ,
    Icon : BsGoogle ,
    }
]

const SignIn = () => {

  const {data:session,status}=useSession()
  const {push}=useRouter()


  if(status==="loading")
  return <h3>Authenticating...</h3>

  const handleOAuthSignIn=(provider)=>()=>signIn(provider)

  if(session){
    setTimeout(()=>{
push("/")
    },5000)
    return <div>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"></link>
      </Head>
      <div className={styles.signin}><div class="spinner-grow" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>
    </div>
  }
  return (

    <div>
       <Head>
        <title>Pizza Restaurant in Hyderabad</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css"></link>
      </Head>

  
      <div className={styles.signin}>
        <button className="btn btn-large btn-secondary" onClick={handleOAuthSignIn('github')}><i class="bi bi-github"></i>  Sign In With GitHub</button>
        <button className="btn  btn-large btn-primary" onClick={handleOAuthSignIn('twitter')}><i class="bi bi-twitter"></i>  Sign In With Twitter</button>
        <button className="btn  btn-large btn-danger" onClick={handleOAuthSignIn('google')}><i class="bi bi-google"></i>  Sign In With Google</button>

      </div>
    </div>
    
  )
}

export default SignIn
