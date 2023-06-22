import { useEffect } from "react";
import { Content, Layout, Nav } from "../components";
import { useDispatch } from "react-redux";
import { setLoggedTrue } from "../redux/user/user.auth";

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
      const user_auth = localStorage.getItem("user-auth");
      const user = JSON.parse(user_auth);
      if(user?.access_token){
        dispatch(setLoggedTrue());
      }
    }, []);
    
  return (
    <Layout>
      <Nav />
      <Content />
    </Layout>
  )
}
