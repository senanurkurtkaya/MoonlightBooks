import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";



const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [monthlySales, setMonthlySales] = useState<{ Month: string; Total: number }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("https://localhost:7202/api/admin/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Yetkisiz erişim!");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => console.error("Dashboard verisi alınamadı:", err));
  
    fetch("https://localhost:7202/api/admin/monthly-sales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Yetkisiz erişim!");
        return res.json();
      })
      .then((data) => setMonthlySales(data))
      .catch((err) => console.error("Aylık satış verisi alınamadı:", err));
  }, []);

  return (

    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard title="Toplam Kitap" value={stats.totalBooks} />
        <StatCard title="Toplam Sipariş" value={stats.totalOrders} />
        <StatCard title="Toplam Kullanıcı" value={stats.totalUsers} />
        <StatCard title="Toplam Gelir" value={`${stats.totalRevenue.toLocaleString("tr-TR")} ₺`} />
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Aylık Satışlar</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Total" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: any }) => (
  <div className="bg-white rounded-xl shadow-md p-5 text-center">
    <h3 className="text-gray-600 text-sm">{title}</h3>
    <p className="text-3xl font-semibold text-indigo-600">{value}</p>
  </div>
);

export default DashboardPage;
