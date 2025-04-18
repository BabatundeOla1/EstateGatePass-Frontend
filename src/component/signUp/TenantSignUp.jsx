import React, {useEffect, useState} from 'react'
import styles from './TenantSignUp.module.css'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function TenantSignUp() {
  const navigate = useNavigate();

  const tenantProfile = {
    "name": "",
    "roomId": "",
    "email": "",
    "password": "",
    "confirmPassword": ""
  };
  const [profile, setProfile] = useState(tenantProfile);
  const [error, setError] = useState("");
  
  const handleTenantInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }


  const handleTenantSubmit = (event) => {
    event.preventDefault();

    const {password, confirmPassword} = profile;

    if (password === confirmPassword && password !== "") {
      Swal.fire('Tenant registered successfully!');
      navigate("/generateOTP");
      fetchData();     
    } else {
      if (password === "") {

        setError('Password cannot be empty!');
        Swal.fire('Password cannot be empty!');
      } else {

        setError('Password does not match!');
        Swal.fire('Password does not match');
      }
    }
  }


  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:9090/tenant/register", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(profile),
    });

          if(!response.ok){
            const data = await response.text(); 

            try{
              const jsonData = JSON.parse(data);
              // setError(jsonData.message);
              Swal.fire(jsonData.message); 
              navigate("/")

            }catch (error) {
              setError(data);
              Swal.fire(data);
            }
          } 
          else {
            const data = await response.json();
            const localStorageData = localStorage.setItem('tenant', JSON.stringify(data))
            console.log(localStorageData)
            Swal.fire(data.message || 'Tenant registered successfully!');
            navigate('/generateOTP');
          }
        } catch (error) {
          console.error(error);
          setError('An error occurred!');
          Swal.fire('An error occurred!');
        }
  };

  return (
    <div className={styles.signUpForm}>
    <p className={styles.signUp}>Estate Gate Pass App</p>

    <div className={styles.newSignUpForm}>
      <form onSubmit = {handleTenantSubmit}>
        <label htmlFor="Name" > Name:</label> <br />
        <input name='name' onChange={handleTenantInput}  type="text" placeholder="Name"   className={styles.firstName}  required/><br />
    

        <label htmlFor="email">Email:</label><br />
        <input name='email' onChange={handleTenantInput}  type="email" placeholder="email" className={styles.email}  required/><br />

        <label htmlFor="roomId">RoomID:</label><br />
        <input name = "roomId" onChange={handleTenantInput}  type="name" placeholder="roomID" className={styles.roomID} required/><br />
     
        <label htmlFor="password">Password:</label><br />
        <input name="password" onChange={handleTenantInput}  type="password" placeholder="password" className={styles.password} required/><br />
           
        <label htmlFor="confirmPassword">Confrim Password:</label><br />
        <input name="confirmPassword" onChange={handleTenantInput}  type="password" placeholder="Confirm password" className={styles.confirmPassword} required /><br />

         
          <div className= {styles.alreadyHaveAnAccount}>
              <button  type='submit' >SIGN UP</button> 
            <p>Already have an Account? 
              <Link className={styles.linkToLogin} to={'/Login'}> LOGIN </Link> 
            </p> <br />

            <p className={styles.securityLinkToLogin} >Security? 
              <Link className={styles.clickToRegister} to={'/securitySignup'}> Click to Register </Link> 
            </p>
          </div>

      </form>        
    </div>
     
  </div>
   
  )
  }