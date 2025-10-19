export default function ProductList({ products, onAddToCart }) {
  return (
    <div className="border p-4 rounded shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-2">Danh sách sản phẩm</h2>
      {products.length === 0 ? (
        <p>Đang tải sản phẩm...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded p-3 flex flex-col justify-between shadow-sm hover:shadow-md transition"
            >
              <div>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-gray-500 text-sm">
                  {p.price.toLocaleString()} ₫
                </p>
              </div>
              <button
                onClick={() => onAddToCart(p)}
                className="mt-3 bg-green-600 text-white py-1 px-2 rounded hover:bg-green-700"
              >
                + Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
