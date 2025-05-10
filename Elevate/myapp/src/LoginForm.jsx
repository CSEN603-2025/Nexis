import React, { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validCredentials = {
    email: 'user@example.com',
    password: 'password123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (email === validCredentials.email && password === validCredentials.password) {
      // Successful login
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-header">
        <h2> Welcome to  Elevate </h2>
        <p>  </p>
        <p>log in using your Guc credientials</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
  {/* Email Input Section */}
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="your@email.com"
      required
    />
  </div>

  {/* Password Input Section */}
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <div className="password-wrapper">
      <input
        id="password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
      />
      <span
        className="toggle-password material-icons"
        onClick={togglePasswordVisibility}
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? "visibility_off" : "visibility"}
      </span>
    </div>
  </div>

  {/* Remember Me Checkbox */}
  <div className="remember-me">
    <input
      id="remember"
      type="checkbox"
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
    />
    <label htmlFor="remember">Remember me</label>
  </div>

  {/* Error Message (appears when login fails) */}
  {error && <div className="error-message">{error}</div>}

  {/* Submit Button */}
  <button type="submit" className="login-button">
    Log In
  </button>
</form>

      {/* Footer Link */}
      <div className="login-footer">
        <p>Don't have an account? <a href="">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginForm;