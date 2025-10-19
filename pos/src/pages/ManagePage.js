import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../api";
import ProductList from "../components/ProductList";

export default function ManagePage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

//tải danh sách sản phẩm
  const fetchData = async () => {
    try {
      const res = await getProducts();
      // ⚠️ Nếu API trả về { data: [...] } thì đổi thành res.data.data
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi tải sản phẩm:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price)
      return alert("Điền đầy đủ thông tin.");

    let imageUrl = form.image;
    if (file) {
      // ✅ Giả lập upload — bạn có thể thay bằng API thật
      imageUrl = URL.createObjectURL(file);
    }

    await addProduct({ ...form, image: imageUrl });
    setForm({ name: "", price: "", image: "" });
    setFile(null);
    setPreview(null);
    fetchData();
  };

  //xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Xoá sản phẩm này?")) {
      await deleteProduct(id);
      fetchData();
    }
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  //Lưu dữ liệu đã chỉnh sửa qua API updateProduct
  const handleSaveEdit = async (id, updatedData) => {
    await updateProduct(id, updatedData);
    setEditingId(null);
    fetchData();
  };
 //hủy chinh sửa
  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🛍️ Quản lý sản phẩm
        </h1>

        {/* Form thêm mới */}
        <form
          onSubmit={handleAdd}
          className="grid md:grid-cols-3 gap-4 border p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 shadow-sm mb-8"
        >
          <div className="col-span-3">
            <h2 className="font-semibold text-lg text-gray-700 mb-2">
              ➕ Thêm sản phẩm mới
            </h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tên sản phẩm
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Nhập tên sản phẩm..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Giá
            </label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Nhập giá..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              URL ảnh
            </label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Dán link ảnh..."
            />
          </div>

          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Hoặc upload ảnh
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setFile(file);
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="w-full border border-gray-300 p-2 rounded-lg bg-white"
            />
            {preview && (
              <img
                src={preview}
                alt="Xem trước"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          <div className="col-span-3 flex justify-end mt-2">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all"
            >
              Thêm sản phẩm
            </button>
          </div>
        </form>

        {/* Danh sách sản phẩm */}
        <ProductList
          products={products}
          editingId={editingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSaveEdit={handleSaveEdit}
          onCancelEdit={handleCancelEdit}
        />
      </div>
    </div>
  );
}
