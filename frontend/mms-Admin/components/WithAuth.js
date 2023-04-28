import Layout from "./Layout/Layout";

const WithAuth = ({ component, route }) => {
  const authRoutes = ["/login", "/reset-password"];

  return authRoutes.includes(route) ? component : <Layout>{component}</Layout>;
};

export default WithAuth;
