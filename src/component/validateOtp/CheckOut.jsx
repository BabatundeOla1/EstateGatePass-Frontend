import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import styles from './CheckOut.module.css'

export default function CheckOut() {

  const [formData, setFormData] = useState({
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();

    if (!formData.phoneNumber) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter the visitor phoone number!',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/security/visitorCheckOut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      console.log('Checkout response:', data);

      Swal.fire({
        icon: 'success',
        title: 'Visitor Checked Out!',
        html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Phone Number:</strong> ${data.phoneNumber}</p>
          <p><strong>Time In:</strong> ${new Date(data.timeIn).toLocaleString()}</p>
          <p><strong>Time Out:</strong> ${new Date(data.timeOut).toLocaleString()}</p>
          <p><strong>Status:</strong> ${data.valid ? 'True' : 'Used'}</p>
        `,
      }).then(() => {
        navigate('/validateOtp'); 
      });
    } catch (error) {
      console.error('Error checking out visitor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message.includes('Failed to fetch')
          ? 'Unable to connect to the server. Please ensure the backend is running.'
          : error.message || 'Failed to check out visitor. Please try again.',
      });
    }
  };

  return (
    <div className={styles.visitorsCheckOutForm}>
      <p className={styles.visitorsCheckOutWord}>CHECK OUT VISITOR</p>

      <div className={styles.newLoginForm}>
        <form onSubmit={handleCheckOut}>
          <div className={styles.inputBox}>
            <label htmlFor="passId">Visitor Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Enter your phone number" className={styles.inputField} />  
          </div>

          <div className={styles.checkOutButton}>
            <button type="submit">CHECK OUT</button>
            <Link className={styles.linkToCheckIn} to={'/validateOtp'}>
              <button>Validate OTP</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}