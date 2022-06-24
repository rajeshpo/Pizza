import React, { useState } from 'react'
import Head from "next/head";
import styles from "../styles/AddPizza.module.css";
import axios from 'axios';

const AddPizza = ({setClose}) => {

  const [file,setFile]=useState(null)
  const [title,setTitle]=useState(null)
  const [desc,setDesc]=useState(null)
  const [prices,setPrices]=useState([])
  const [extras,setExtras]=useState(null)
  const [extraOptions,setExtraOptions]=useState([])

  const changePrice=(e,index)=>{
       let currentPrices=prices;
       currentPrices[index]=e.target.value;
       setPrices(currentPrices)
  }
  
  const handleExtraInput=(e)=>{
    setExtras({...extras,[e.target.name]:e.target.value})
  }
  
  const handleExtra=(e)=>{
e.preventDefault()
setExtraOptions((prev)=>[...prev,extras])
  }

  
  
  const handleCreate = async (e) => {
    e.preventDefault()
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duk9xkcp5/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newProduct = {
        title,
        desc,
        prices,
        extraOptions,
        img: url,
      };

     let res= await axios.post("http://localhost:3000/api/products", newProduct);
     console.log(res)
      setClose(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.modal}>
      <Head>
       
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      </Head>

<div className={styles.wrapper}>
<button type="button" className="close mr-1" onClick={()=>setClose(true)} aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
<form>

<div class="mb-3">
    <h3 class="mt-1 mb-1 text-center">Add a Pizza</h3>
    <label  className="form-label">Choose an Image</label>
    <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])}/>
    </div>
  <div class="mb-3">
    
    <label for="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" aria-describedby="title"  onChange={(e)=>setTitle(e.target.value)}/>

  </div>
  <div className="mb-3">
    <label for="description" className="form-label">Description</label>
    <textarea rows={3} type="text" className="form-control" onChange={(e)=>setDesc(e.target.value)}  id="description"/>
  </div>  
  <div class="mb-3">
    
    <label for="prices" className="form-label mr-1">Prices</label>
    <input type="number" className="" id="price0" placeholder="Small" aria-describedby="title"  onChange={(e)=>changePrice(e,0)}/>
    <input type="number" className="" id="price1" placeholder="Medium" aria-describedby="title"  onChange={(e)=>changePrice(e,1)}/>
    <input type="number" className="" id="price2" placeholder="small" aria-describedby="title"  onChange={(e)=>changePrice(e,2)}/>

  </div>
  <div class="mb-3">
    
    <label for="title" className="form-label">Extras</label>
    <input type="text" className="form-control m-1" id="extras" aria-describedby="extras" name="text" onChange={handleExtraInput}/>
    <input type="number" className="form-control m-1" id="extras1" aria-describedby="extras1" name="price"  onChange={handleExtraInput}/>
  <button onClick={handleExtra} className="btn btn-primary">Add</button>
  <div ></div>
  </div>
  <button type="submit" onClick={handleCreate} className="btn btn-primary mb-2">Add Pizza</button>
</form>
{extraOptions.map((option,i)=>{return <span className='text-success' key={i}>{option.text}</span>})}
</div>
  </div>
  )
}

export default AddPizza