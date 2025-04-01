import { useState } from "react";
import { useNavigate } from "react-router-dom";


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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4">Реєстрація</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded mb-3"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded"
        >
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;