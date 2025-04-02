import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "../../components/UI/button/MyButton";
import MyInput from "../../components/UI/input/MyInput";
import styles from "./RegisterPage.module.css"


const RegisterPage = () => {
  const [formData, setFormData] = useState({username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

interface FormData {
    email: string;
    password: string;
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name as keyof FormData]: e.target.value });
};

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(""); // Очистка помилок

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Щось пішло не так");
      }

      localStorage.setItem("token", data.token);
      navigate("/games"); // Перенаправлення після реєстрації
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.formContainer}>
      
      <form className= {styles.form}
      onSubmit={handleSubmit}
       >
        <h2 className={styles.title}>Реєстрація</h2>

        {error && <p >{error}</p>}
        <div className={styles.registrationInputes__container}>
        <MyInput
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
      
        />

        <MyInput
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
      
        />

        <MyInput
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
         />
        </div>

        <div className={styles.registrationBtn__container}>
        <MyButton
          type="submit"
          className={styles.registrationBtn}
          >
          Зареєструватися
        </MyButton>
        </div>
        <p className={styles.registration_subtitle}>Вже маєш аккаунт?</p>
        <div className={styles.registrationBtn__container}>
          <MyButton
            type="button"
            onClick={() => navigate("/login")}
            style={{ width: "50%", alignSelf: "center"}}
          >
            Увійти
          </MyButton>
          </div>
      </form>
    </div>
  );
};

export default RegisterPage;