import { useState, useEffect } from "react";
import { getProducts } from "../api";
import ProductList from "../components/ProductList";
import Cart from "../components/Cart";

export default function PosPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [taxPercent, setTaxPercent] = useState(8);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [cashGiven, setCashGiven] = useState("");
  const [change, setChange] = useState(0);

  useEffect(() => {
    getProducts().then((res) => setProducts(res.data));
  }, []);

  // ====== GIỎ HÀNG ======
  const addToCart = (p) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === p.id);
      return exists
        ? prev.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { ...p, qty: 1 }];
    });
  };

  const changeQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  // ====== TÍNH TOÁN ======
  //subtotal: tổng giá chưa thuế.
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  //tax: tiền thuế theo phần trăm.
  const tax = (subtotal * taxPercent) / 100;
  //discount: số tiền giảm giá.
  const discount = (subtotal * discountPercent) / 100;
  //total: tổng cuối cùng phải trả.
  const total = subtotal + tax - discount;

  // ====== THANH TOÁN ======
  //Xử lý nhập tiền mặt & tính tiền thối
  const handleCashChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setCashGiven(value);
    setChange(value - total);
  };

  //Xử lý thanh toán
  const checkout = () => {
    if (cart.length === 0) {
      alert("Giỏ hàng đang trống!");
      return;
    }
    if (cashGiven < total) {
      alert("Số tiền khách đưa không đủ!");
      return;
    }

    alert("Thanh toán thành công!");
    window.print(); // In hóa đơn

    setCart([]);
    setCashGiven("");
    setChange(0);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4">💳 POS Bán Hàng</h1>

      {/* Danh sách sản phẩm */}
      <ProductList products={products} onAddToCart={addToCart} />

      {/* Giỏ hàng */}
      <Cart
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={checkout}
        onQuantityChange={changeQuantity}
      />

      {/* Thanh toán */}
      <div className="mt-6 border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Tính toán thanh toán</h2>

        <div className="grid grid-cols-2 gap-4 max-w-md">
          <div>Tạm tính:</div>
          <div className="text-right">{subtotal.toLocaleString()} ₫</div>

          <div>
            Thuế (%):
            <input
              type="number"
              value={taxPercent}
              onChange={(e) => setTaxPercent(parseFloat(e.target.value) || 0)}
              className="border px-2 py-1 ml-2 w-16"
            />
          </div>
          <div className="text-right">{tax.toLocaleString()} ₫</div>

          <div>
            Giảm giá (%):
            <input
              type="number"
              value={discountPercent}
              onChange={(e) =>
                setDiscountPercent(parseFloat(e.target.value) || 0)
              }
              className="border px-2 py-1 ml-2 w-16"
            />
          </div>
          <div className="text-right">- {discount.toLocaleString()} ₫</div>

          <div className="font-bold">Tổng cộng:</div>
          <div className="text-right font-bold text-lg text-green-600">
            {total.toLocaleString()} ₫
          </div>

          <div>Khách đưa:</div>
          <div className="text-right">
            <input
              type="number"
              value={cashGiven}
              onChange={handleCashChange}
              className="border px-2 py-1 w-32 text-right"
            />{" "}
            ₫
          </div>

          <div>Tiền thối:</div>
          <div className="text-right text-blue-600">
            {change >= 0 ? change.toLocaleString() : 0} ₫
          </div>
        </div>

        <button
          onClick={checkout}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thanh toán & In hóa đơn
        </button>
      </div>

      {/* Hóa đơn in */}
      <div className="hidden print:block mt-8 border-t pt-4 text-sm">
        <h2 className="text-center font-bold text-lg mb-2">HÓA ĐƠN BÁN HÀNG</h2>
        <p>Ngày: {new Date().toLocaleString()}</p>
        <table className="w-full border mt-2">
          <thead>
            <tr className="border-b">
              <th className="text-left px-2">Sản phẩm</th>
              <th>Số lượng</th>
              <th>Đơn giá</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((i) => (
              <tr key={i.id} className="border-b">
                <td className="px-2">{i.name}</td>
                <td className="text-center">{i.qty}</td>
                <td className="text-right">{i.price.toLocaleString()} ₫</td>
                <td className="text-right">
                  {(i.qty * i.price).toLocaleString()} ₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 text-right">
          <p>Tạm tính: {subtotal.toLocaleString()} ₫</p>
          <p>Thuế: {tax.toLocaleString()} ₫</p>
          <p>Giảm giá: -{discount.toLocaleString()} ₫</p>
          <p className="font-bold text-lg">Tổng cộng: {total.toLocaleString()} ₫</p>
          <p>Khách đưa: {cashGiven.toLocaleString()} ₫</p>
          <p>Tiền thối: {change.toLocaleString()} ₫</p>
        </div>
      </div>
    </div>
  );
}
