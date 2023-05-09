import Layout from "./Layout/Layout";
import { useRouter } from "next/router";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";

const WithAuth = ({ component, route }) => {
  const authRoutes = ["/login", "/reset-password"];
  const router = useRouter();
  const { token } = useLogin();

  useEffect(() => {
    if (!authRoutes.includes(route) && !token) {
      router.push("/login");
    }
  }, [token]);

  return authRoutes.includes(route) ? component : <Layout>{component}</Layout>;
};

export default WithAuth;
