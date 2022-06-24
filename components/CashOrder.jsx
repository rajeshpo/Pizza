import React, { useState } from 'react'
import Head from "next/head";
import styles from "../styles/CashOrder.module.css";

const cashOrder = ({total,createOrder,setCash}) => {

  const [customer,setCustomer]=useState()
  const [address,setAddress]=useState()

   const handleOrder=(e)=>{
   e.preventDefault();
     createOrder({customer,address,total,method:0})
   }
  
  return (
    <div className={styles.modal}>
      <Head>
       
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      </Head>

<div className={styles.wrapper}>
<div onClick={()=>setCash(false)} className={styles.cross}><button type="button" className="close mr-1" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button></div>
<form>

<div class="mb-3">

<h2 className="text-center">You will pay $12 for delivery!</h2>
    <label  className="form-label">Full Name</label>
    <input type="text" className="form-control" onChange={(e)=>setCustomer(e.target.value)} aria-describedby="emailHelp"/>
    </div>
  <div class="mb-3">
    
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label for="address" className="form-label">Address</label>
    <textarea rows={3} type="text" className="form-control" onChange={(e)=>setAddress(e.target.value)}  id="description"/>
  </div>  
  <button type="submit" onClick={(e)=>handleOrder(e)} className="btn btn-primary">Order</button>
</form>
</div>
  </div>
  )
}

export default cashOrder