import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import authorizedFetch from '../utils/authFetch';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const[newPassword, setNewPassword] = useState('');
  const[confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');


  const [showPasswords, setShowPasswords] = useState(false); //Added by Frida

  const navigate = useNavigate(); //Added by Frida, do we want to navigate to login after successfully changed passwords?

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);

    console.log("changePassword function called");
    console.log("newPassword:", newPassword);
    console.log("Testing if API URL works: ", apiUrl);

    const fetchUserProfile = async () => {
      try {
        const response = await authorizedFetch(`${apiUrl}/users/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the token in the request headers
          },
        });
        const data = await response.json();
        console.log(data); // see success message from backend
        setUsername(data.username);
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);

      } catch (err) {
        console.error('Error:', err);
      }
    };
    fetchUserProfile();
  }, []);


  let handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  let changePassword = async (e) => {
    e.preventDefault(); //Web reader plz don't do default action of the form. Let me handle it.
    const apiUrl = import.meta.env.VITE_API_URL; //This points to the backend.
    console.log("Testing if API URL works: ", apiUrl);   

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length <= 8) {
      alert("New password must be at least 8 characters long and include:\n- at least one lowercase letter\n- at least one number\n- at least one special character (!@#$%^&*)\n- only letters, numbers, and these special characters are allowed");
      return;
    }

    if (newPassword === '') {
      alert("New password cannot be empty.");
      return;
    }

    if (confirmPassword === '') {
      alert("Confirm password cannot be empty.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert("Password must be at least 8 characters long and include:\n- at least one lowercase letter\n- at least one number\n- at least one special character (!@#$%^&*)\n- only letters, numbers, and these special characters are allowed");
      return;
}

    try {
      const response = await authorizedFetch(`${apiUrl}/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Include the token in the request headers
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ currentPassword, newPassword }),

      });
      const data = await response.json();
      console.log(data); // see success message from backend
      if (response.ok) {
        alert('Password changed successfully!');
         // empty the password fields
         setNewPassword('');
         setConfirmPassword('');
         setCurrentPassword('');
         //localStorage.removeItem('accessToken'); // log
         navigate('/login'); // send to login

      } else {
        alert(data.message || 'Password change failed');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  return (
    <div className="profile-page">
      <h2>Profile Page</h2>
      <div className="profile-info">
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Full Name:</strong> {firstname}</p>
        <p><strong>Last Name:</strong> {lastname}</p>
        <p><strong>Email:</strong> {email}</p>
        

        <p><strong>Change Password:</strong></p>
        <form onSubmit={changePassword}>
        
        <input
        type={showPasswords ? "text" : "password"}
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        name="currentPassword"
        required
        />
     
        <input
          type={showPasswords ? "text" : "password"}
          placeholder="New Password"
          value={newPassword}
          onChange={handlePasswordChange}
          name="newPassword"
          required
        /> 
        <input
          type={showPasswords ? "text" : "password"}
          placeholder="Re-enter New Password"
          value={confirmPassword}
          onChange={handlePasswordChange}
          name="confirmPassword"
          required
        /> 
        <button type="button" onClick={() => setShowPasswords(!showPasswords)}>
          {showPasswords ? "🙈" : "👁️"} </button>

        <button type="submit">Change Password</button>
        </form>

    </div>
    </div>
  );
}