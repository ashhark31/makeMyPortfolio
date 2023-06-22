import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import AdminDashboardPage from "../../components/admin/dashboard";

const AdminDashboard = () => {
    const [token,setAdminToken] = useState(null);
    const { push } = useRouter();

    useEffect(() => {
        const admin_auth = localStorage.getItem("admin-auth");
        const admin = JSON.parse(admin_auth);
        if(admin?.access_token){
            setAdminToken(admin?.access_token);
        } else {
            push("/admin/login");
        }
    }, []);

  return (
    <div>
        { token ? <AdminDashboardPage />
            : <></>   
        }
    </div>
  )
}

export default AdminDashboard