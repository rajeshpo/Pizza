import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

const Signup = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
     const res= await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        password,
      });
      console.log(res)
      router.push("/login");
    } catch (error) {
    console.log(  error.response.data.errorMessage.message)
      setError(error.response.data.errorMessage.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Sign Up Form</h1>
        <input
          placeholder="FullName"
          className={styles.input}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="email"
          type={email}
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign In
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};

export default Signup;
