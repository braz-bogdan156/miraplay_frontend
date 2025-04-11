import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/auth/authSlice";
import { useMutation } from "@tanstack/react-query";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";
import MyInput from "../../components/UI/input/MyInput";
import styles from "./LoginPage.module.css"
import MyButton from "../../components/UI/button/MyButton";



const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post("/auth/login", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(login({ email: data.email, token: data.token }));
      localStorage.setItem("token", data.token);
      navigate("/games");
    },
    onError: () => {
      setError("Невірний email або пароль.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    mutation.mutate();
  };

  return (
    <div className={styles.form_LoginContainer}>
      <form className= {styles.form}
      onSubmit={handleSubmit}>
        <h2 className={styles.title}>Увійти</h2>
        {error && <p >{error}</p>}
        <MyInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
           />
        <MyInput
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <div className = {styles.loginBtn__container}>
        <MyButton
          type="submit"
          disabled={mutation.status === 'pending'}
        >
          {mutation.status === 'pending' ? "Завантаження..." : "Увійти"}
        </MyButton>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;