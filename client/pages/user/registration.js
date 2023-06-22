import { useDispatch } from "react-redux"
import { useEffect } from "react";
import { getCountries, postUser } from "../../data_fetching";
import { RegistrationForm } from "../../components";

const Registration = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
      getCountries(dispatch);
    }, []);

  return (
    <div className="registration">
      <RegistrationForm />
    </div>
  )
}

export default Registration