import { useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "./dashboard";
import { useLogin } from "../hooks/useLogin";

const Index = () => {
  return <Dashboard />;
};

export default Index;
