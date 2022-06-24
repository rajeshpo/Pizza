import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import {useSession,signIn,signOut} from 'next-auth/react'
import Router, { useRouter } from "next/router";


const Navbar = () => {

  const {push,asPath}=useRouter();

  const {data:session}=useSession()

  const handleSignIn=()=>push(`/auth/SignIn?callbackUrl=${asPath}`)

  const quantity=useSelector(state=>state.cart.quantity)

  const handleSignOut= async()=>{
    
    const data=await signOut({redirect:false,callbackUrl:"/"})
    push(data.url)
  
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>8919788492</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref><li className={styles.listItem} style={{cursor:"pointer"}}>Homepage</li></Link>
          
          <Link href="/cart" passHref><li className={styles.listItem} style={{cursor:"pointer"}}>Cart</li></Link>
          <Image src="/img/raj.png" alt="" width="160px" height="69px" />
         
          {session?(<li style={{cursor:"pointer"}}  onClick={handleSignOut} className={styles.listItem}>Signout</li>):(<li onClick={handleSignIn} style={{cursor:"pointer"}} className={styles.listItem}>SignIn</li>)}
          <li className={styles.listItem}>Contact Us</li>
        </ul>
      </div>
     <Link href="/cart" passHref>
     <div className={styles.item}>
        <div className={styles.cart}>
          <Image src="/img/cart.png" alt="" width="30px" height="30px" />
          <div className={styles.counter}>{quantity}</div>
        </div>
      </div></Link>
    </div>
  );
};

export default Navbar;
