// src/pages/RegisterPage.tsx
import React, { useState } from "react";

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("https://localhost:7202/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          // role: "User" // bunu istersen gönder, ama gerek yok
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Kayıt başarısız.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      alert("Kayıt başarılı, giriş yapıldı!");
      window.location.href = "/";
    } catch (error: any) {
      console.error("Kayıt hatası:", error);
      setMessage(error.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Kayıt Ol</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">Ad Soyad</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">E-posta</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Şifre</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Kayıt Ol
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
