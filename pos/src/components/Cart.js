export default function Cart({ cart, onRemove, onQuantityChange }) {
  return (
    <div className="border p-4 rounded shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-2">Giỏ hàng</h2>
      {cart.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.name}</td>
                <td className="text-center">
                  <button
                    onClick={() => onQuantityChange(item.id, -1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.qty}</span>
                  <button
                    onClick={() => onQuantityChange(item.id, 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="text-right">{item.price.toLocaleString()} ₫</td>
                <td className="text-right">
                  {(item.qty * item.price).toLocaleString()} ₫
                </td>
                <td className="text-center">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
