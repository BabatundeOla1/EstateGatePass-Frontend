import React, {useEffect, useState} from 'react'
import styles from './SecuritySignUp.module.css'
import { Link, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function SecuritySignUp() {

  const navigate = useNavigate();

  const securityProfile = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
  };
  const [profile, setProfile] = useState(securityProfile);
  const [error, setError] = useState("");
  
  const handleSecurityInput = (event) => {
    const { name, value } = event.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  const handleSecuritySubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword && password !== "") {
          Swal.fire('Security registered successfully!');
          navigate('/validateOtp');
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
        const response = await fetch("http://localhost:9090/security/securityRegister", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(profile),
      });       
  
            if(data.success){
              Swal.fire('Security registered successfully!');
            }
            else{
              setError(data.message);
              Swal.fire(data.message);
            }
            console.log(data)
      }
      catch (error) {
        console.error(error);
        Swal.fire(error)
      }
    }
  
  return (
    <div className={styles.signUpForm}>
    <p className={styles.signUp}>Estate Gate Pass App</p>

    <div className={styles.newSignUpForm}>
      <form onSubmit = {handleSecuritySubmit}>
        <label htmlFor="firstName" > Name:</label> <br />
        <input name='firstName' onChange={handleSecurityInput}  type="text" placeholder="firstName"   className={styles.firstName}  required/><br />

        <label htmlFor="lastName" > Name:</label> <br />
        <input name='lastName' onChange={handleSecurityInput}  type="text" placeholder="lastName"   className={styles.lastName}  required/><br />
    
        <label htmlFor="email">Email:</label><br />
        <input name='email' onChange={handleSecurityInput}  type="email" placeholder="email" className={styles.email}  required/><br />

        <label htmlFor="password">Password:</label><br />
        <input name="password" onChange={handleSecurityInput}  type="password" placeholder="password" className={styles.password} required/><br />
         
          <div className= {styles.alreadyHaveAnAccount}>
              <button  type='submit' >SIGN UP</button> 
            <p>Already have an Account? 
              <Link className={styles.linkToLogin} to={'/Login'}> LOGIN </Link> 
            </p>
          </div>

      </form>        
    </div>
     
  </div>
   
  )
}
