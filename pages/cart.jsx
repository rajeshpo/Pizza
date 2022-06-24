import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession,useSession } from "next-auth/react";
import {reset} from '../redux/cartSlice'
import CashOrder from "../components/CashOrder";
const Cart = () => {
  
  const {data:session,status}=useSession()

  if(status==='unauthenticated') return <cenetr>Please Login to Proceed.</cenetr>
  
  else{

    const cart=useSelector(state=>state.cart)
    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    
    const [open,setOpen]=useState(false);
    const [cash,setCash]=useState(false);
    const dispatch=useDispatch()
  
    const router=useRouter()
  
    const createOrder =async(data)=>{
     
       try{
        const res=await axios.post("http://localhost:3000/api/orders",data)
        console.log(res)
        res.status===200 && router.push("/orders/"+res.data._id)
        
        dispatch(reset())
       }
       catch(err){
        console.log(err)
       }
    }
  
    const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  
      useEffect(() => {
          dispatch({
              type: "resetOptions",
              value: {
                  ...options,
                  currency: currency,
              },
          });
      }, [currency, showSpinner]);
  
  
      return (<>
              { (showSpinner && isPending) && <div className="spinner" /> }
              <PayPalButtons
                  style={style}
                  disabled={false}
                  forceReRender={[amount, currency, style]}
                  fundingSource={undefined}
                  createOrder={(data, actions) => {
                      return actions.order
                          .create({
                              purchase_units: [
                                  {
                                      amount: {
                                          currency_code: currency,
                                          value: amount,
                                      },
                                  },
                              ],
                          })
                          .then((orderId) => {
                              // Your code here after create the order
                              return orderId;
                          });
                  }}
                  onApprove={function (data, actions) {
                      return actions.order.capture().then(function (details) {
                       const shipping=details.purchase_units[0].shipping;
                       console.log(details)
                       createOrder({
                         customer:shipping.name.full_name,
                         total:cart.total,
                         address:shipping.address.address_line_1,
                         method:1
                        
              
                       })
  
  
                      });
                  }}
              />
          </>
      );
  }
  
    
   
    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <table className={styles.table}>
            <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            </tbody>
           {cart.products.map((product,i)=>{
             return <tbody>
               <tr key={i} className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src={product.img}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>{product.title}</span>
              </td>
              <td>
                <span className={styles.extras}>
                {product.extras.map(product=>{
               return <div>
                 <span key={product._id}>{product.text}</span>
                 <br></br>
               </div>
  
                })}
                </span>
              </td>
              <td>
                <span className={styles.price}>{product.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>{product.price*product.quantity}</span>
              </td>
            </tr>
             </tbody>
           })}
           
          </table>
        </div>
        <div className={styles.right}>
          <div className={styles.wrapper}>
            <h2 className="text-white">CART TOTAL</h2>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Subtotal:</b>$ {cart.total}
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Discount:</b>$0.00
            </div>
            <div className={styles.totalText}>
              <b className={styles.totalTextTitle}>Total:</b>$ {cart.total}
            </div>
            {open?(<div style={{ maxWidth: "750px", minHeight: "200px"}}>
              <button onClick={()=>setCash(true)} className={styles.buttonCash}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                  options={{
                      "client-id": "AfC9arXlETbRI6XEm5gKy052Nn7z10ujNdkGPO-TJCcAIGtplnYEs6aIIzv7pKn0L74jNdMfv-wF08rj",
                      components: "buttons",
                      currency: "USD",
                      "disable-funding":"credit,card,p24"
                  }}
              >
          <ButtonWrapper
                      currency={currency}
                      showSpinner={false}
                  />
        </PayPalScriptProvider>
      </div>):(<button className={styles.button} onClick={()=>setOpen(true)}>CHECKOUT NOW!</button>)}
          </div>
          {cash && (<CashOrder total={cart.total} setCash={setCash} createOrder={createOrder}/>)}
        </div>
        
      </div>
    );
  };
  
}
export const getServerSideProps=async(ctx)=>{

  const session= await getSession(ctx)

  if(!session){
    return {
      redirect:{
        destination:"/auth/SignIn"
      }
    }
  }

  return {
    props:{session}
  }

}

export default Cart;
