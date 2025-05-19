import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* ÜST MENÜ */}
            <div className="bg-gray-800 text-white flex items-center px-6 py-4">
  <h1 className="text-xl font-bold mr-6">Admin Paneli</h1>

  <div className="flex gap-3">
    <button
      onClick={() => navigate("/admin/dashboard")}
      className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
    >
      Dashboard
    </button>
    <button
      onClick={() => navigate("/admin/books")}
      className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
    >
      Kitaplar
    </button>
    <button
      onClick={() => navigate("/admin/categories")}
      className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded"
    >
      Kategoriler
    </button>
  </div>

  {/* Çıkış butonu en sağa yaslanır */}
  <button
    onClick={handleLogout}
    className="ml-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded border border-white text-white font-bold"
  >
    Çıkış Yap
  </button>
</div>

            {/* SAYFA İÇERİĞİ */}
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;

