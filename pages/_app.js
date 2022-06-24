import { Provider } from "react-redux";
import Layout from "../components/Layout";
import store from "../redux/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
function MyApp({ Component, pageProps:{
  session,...pageProps
} }) {
  return (
  <SessionProvider session={session}>
     <Provider store={store}>
      <Layout>
      <Component {...pageProps} />
    </Layout>
   </Provider>
  </SessionProvider>
  );
}

export default MyApp;
