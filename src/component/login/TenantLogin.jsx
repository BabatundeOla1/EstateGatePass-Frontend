import React, {useState} from 'react'
import styles from './TenantLogin.module.css'
import {Link, useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
export default function TenantLogin() {

const navigate = useNavigate();

const tenantLoginProfile = {
    "email": "",
    "password": ""
  };

  const [profile, setProfile] = useState(tenantLoginProfile);

  const handleTenantInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

    const handleTenantSubmit = (event) => {
      event.preventDefault();
        fetchData();
    }

    console.log(profile);


    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9090/tenant/login", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(profile),
            });
            if(!response.ok) throw new Error("Request failed")
            const data = await response.json();
            // console.log(data)

            if(data.success){ 
                Swal.fire('Login successful!');
                navigate("/generateOTP")
            }
            else{
                setError(data.message);
                // Swal.fire(data.message);
            }
            console.log(data);
      }
      catch (error) {
        console.error(error);
        Swal.fire('Invalid login details')
      }
    }

  return (
    <div className={styles.loginForm}>
      <p className={styles.login}>LOGIN</p>
      
          <div className={styles.newLoginForm}>
            <form onSubmit = {handleTenantSubmit}>        
      
              <label htmlFor="email">Email:</label><br />
              <input name='email' onChange={handleTenantInput} required type="email" placeholder="email" className={styles.email} /><br />
      
              <label htmlFor="password">Password:</label><br />
              <input name="password" onChange={handleTenantInput} required type="password" placeholder="password" className={styles.password} /><br />
                           
                <div className= {styles.alreadyHaveAnAccount}>
                    <button  type='submit' >LOGIN</button> 
                  <p>Don't have an Account? 
                    <Link className={styles.linkToSignUp} to={'/'}> SIGN UP </Link> 
                  </p>
                </div>
      
            </form>        
          </div>
    </div>
  )
}
