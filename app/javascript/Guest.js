import React, { useState } from 'react';

const Guest = () => {
  //states: what to take in
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  //post request handler (all checks in the backend for programming convention)
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/v1/guests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ guest: { full_name: fullName, phone_number: phoneNumber } }),
    })
      .then(response => response.json().then(data => ({ status: response.status, body: data })))
      .then(({ status, body }) => {
        if (status === 201) {
          alert(`Success! Welcome, ${fullName}.`);
          setFullNameError('');
          setPhoneNumberError('');
        } else if (status === 400) {
          // Handle validation errors sent from the backend
          setFullNameError(body.errors.full_name ? body.errors.full_name.join(', ') : '');
          setPhoneNumberError(body.errors.phone_number ? body.errors.phone_number.join(', ') : '');
        } else {
          alert('Validation failed, please check your input.');
        }
      })
      .catch(error => {
        alert(`Error: ${error.message}`);
      });
  };
  //
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '50px',
      fontFamily: 'Arial, sans-serif'
    },
    input: {
      margin: '10px',
      height: '40px',
      width: '300px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px'
    },
    button: {
      width: '320px',
      height: '40px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginBottom: '5px'
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome</h1>
      <p>Please provide your full name and phone number.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={styles.input}
          />
          {fullNameError && <p style={styles.error}>{fullNameError}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={styles.input}
          />
          {phoneNumberError && <p style={styles.error}>{phoneNumberError}</p>}
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Guest;
