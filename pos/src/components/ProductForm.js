import { useState } from "react";

export default function ProductForm({ onSave, product }) {
  const [form, setForm] = useState(product || { name: "", price: "", image: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", price: "", image: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Tên sản phẩm"
        required
      />
      <input
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        placeholder="Giá"
        required
      />
      <input
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        placeholder="URL ảnh"
      />
      <button type="submit">{product ? "Cập nhật" : "Thêm"}</button>
    </form>
  );
}
