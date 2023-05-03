import Layout from "./Layout/Layout";
import { useRouter } from 'next/router'
import { useLogin } from '../hooks/useLogin'
import { useEffect } from 'react'

const WithAuth = ({ component, route }) => {
  const authRoutes = ["/login", "/reset-password"];
  const router = useRouter();
  const {token} = useLogin()
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")

  useEffect(() => {
    console.log("#################################")

    if (!authRoutes.includes(route) && !token) {

      console.log("****************************")
      console.log("****************************")

      router.push("/login");
    }
  }, [token]);

  return authRoutes.includes(route) ? component : <Layout>{component}</Layout>;
};

export default WithAuth;
