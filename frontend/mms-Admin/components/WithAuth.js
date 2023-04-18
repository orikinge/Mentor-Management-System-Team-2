import Layout from "./Layout/Layout";

const WithAuth = ({ component, route }) => {
  const authRoutes = ["/login"];

  return authRoutes.includes(route) ? component : <Layout>{component}</Layout>;
};

export default WithAuth;
