import React, {useState} from 'react'
import styles from "./GenerateOTP.module.css" 
import Swal from 'sweetalert2';
import {Link, useNavigate} from 'react-router-dom'

export default function GenerateOTP() {

  const [otp, setOtp] = useState();

  const fetchOtpCode = async () => {
        try {
          const response = await fetch("http://localhost:9090/tenant/generateOTP", {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(otp),
              }
            );              

            if(!response.ok) throw new Error("Request failed")

              const data = await response.json();
              console.log(data.otpCode)
  
                // Swal.fire(data.otpCode)
                setOtp(data.otpCode)
        }
        catch (error) {
          console.error(error);
        }
      }

  return (
    <div className={styles.generateOTPForm}>
      <p className={styles.generateOtpWord}>GENERATE OTP</p>
      
          <div className={styles.newLoginForm}>
           
            <div className={styles.otpGeneratorBox}>
              {/* <h2 className={styles.code}>CODE: </h2> */}
              <p >{otp}</p>
            </div>
                                 
                <div className= {styles.generateOTPButton}>
                    <button onClick={fetchOtpCode} type='submit' >GENERATE</button> 
                    <Link className={styles.linkToLogOut} to={'/login'}> Click to  LOG OUT </Link>
                </div>
          </div>
    </div>
  )

}
