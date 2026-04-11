import { useState } from "react";
import "./FormValidation.css";

type ErrorType = {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};

const FormValidation = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<ErrorType>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      setError((prevCount) => ({ ...prevCount, name: true }));
    }

    if (!email.trim().includes("@") || !email.trim().includes(".")) {
      setError((prevCount) => ({ ...prevCount, email: true }));
    }

    const hasNumber = /\d/.test(password.trim());

    if (password.length < 8 || !hasNumber) {
      setError((prevCount) => ({ ...prevCount, password: true }));
    }

    if (password !== confirmPassword) {
      setError((prevCount) => ({ ...prevCount, confirmPassword: true }));
    }
  };

  return (
    <div className="form-container">
      <h1>Create Account</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          onBlur={() => {
            if (name.trim().length < 3) {
              setError((prevCount) => ({ ...prevCount, name: true }));
            }
          }}
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError((prevCount) => ({ ...prevCount, name: false }));
          }}
        />
        {error.name && <p>Error with name</p>}

        <input
          onBlur={() => {
            if (!email.trim().includes("@") || !email.trim().includes(".")) {
              setError((prevCount) => ({ ...prevCount, email: true }));
            }
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError((prevCount) => ({ ...prevCount, email: false }));
          }}
        />
        {error.email && <p>Error with email</p>}
        <input
          type="password"
          onBlur={() => {
            const hasNumber = /\d/.test(password.trim());

            if (password.length < 8 || !hasNumber) {
              setError((prevCount) => ({ ...prevCount, password: true }));
            }
          }}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError((prevCount) => ({ ...prevCount, password: false }));
          }}
        />
        {error.password && <p>Error with password</p>}
        <input
          type="password"
          onBlur={() => {
            if (password !== confirmPassword) {
              setError((prevCount) => ({
                ...prevCount,
                confirmPassword: true,
              }));
            }
          }}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setError((prevCount) => ({ ...prevCount, confirmPassword: false }));
          }}
        />
        {error.confirmPassword && <p>Error with confirm password</p>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default FormValidation;
