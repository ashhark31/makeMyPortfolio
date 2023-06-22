import { DashboardPage } from '../../components'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [token, setToken] = useState(null);
    const {push} = useRouter();

    useEffect(() => {
      const user_auth = localStorage.getItem("user-auth");
      const user = JSON.parse(user_auth);
      setToken(user.access_token);
      if(!user.access_token){
        push('/user/login');
      }
    }, []);

  return (
    <div className='dashboard'>
      { token ? <DashboardPage />
        : <></>
      }
    </div> 
  )
}

export default Dashboard