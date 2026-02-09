import { useEffect, useState } from "react";

export default function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/items")
      .then(res => res.json())
      .then(setItems);
  }, []);

  const addToCart = async (itemId) => {
    await fetch("http://localhost:5000/carts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ itemId }),
    });

    alert("Item added to cart");
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {items.map(item => (
        <div key={item._id} className="border p-4">
          <h3 className="font-bold">{item.name}</h3>
          <p>₹{item.price}</p>
          <button
            onClick={() => addToCart(item._id)}
            className="bg-green-600 text-white px-3 py-1 mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
