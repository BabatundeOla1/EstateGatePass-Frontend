import React, { useState } from 'react';
import styles from './ValidateOtp.module.css'; 
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

export default function ValidateOtp() {
  const [formData, setFormData] = useState({
    otpCode: '',
    name: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateOtp = async (e) => {
    e.preventDefault();

    if (!formData.otpCode || !formData.name || !formData.phoneNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    const otpRegex = /^\d{6}$/;
    if (!otpRegex.test(formData.otpCode)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid OTP',
        text: 'Please enter a valid 6-digit OTP.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/security/validateOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (!data.used) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Validated!',
          html: `
            <p>Visitor Pass Generated!</p>
            <p><strong>Name:</strong> ${data.visitorsPass.name}</p>
            <p><strong>Phone:</strong> ${data.visitorsPass.phoneNumber}</p>
            <p><strong>OtpcCode:</strong> ${data.visitorsPass.otpCode}</p>
            <p><strong>Valid:</strong> ${data.visitorsPass.valid}</p>
            <p><strong>Time In:</strong> ${new Date(data.visitorsPass.timeIn).toLocaleString()}</p>
          `          
        }).then(() => {navigate('/checkOut');}
      );

      } 
      else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid OTP',
            text: 'The OTP you entered is incorrect. Please try again.',
          });
      }
    } 
    catch (error) {
      console.error('Error validating OTP:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message.includes('Expired')
          ? 'The OTP has expired or was already used.'
          : error.message.includes('Failed to fetch')
          ? 'Unable to connect to the server. Please ensure the backend is running.'
          : error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className={styles.validateOTPForm}>
      <p className={styles.validateOtpWord}>VALIDATE OTP</p>

      <div className={styles.newLoginForm}>

        <form onSubmit={validateOtp}>

          <div className={styles.inputBox}>
            <label htmlFor="otpCode">Enter OTP:</label>
            <input type="text" id="otpCode" name="otpCode" value={formData.otpCode} onChange={handleInputChange} placeholder="Enter the OTP" className={styles.inputField} />  
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className={styles.inputField} />  
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter your phone number" className={styles.inputField} />  
          </div>

          <div className={styles.validateOTPButton}>
            <button type="submit">VALIDATE & GENERATE PASS</button>
            <Link className={styles.linkToCheckOut} to={'/checkOut'}>
              <button>Check Out</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}