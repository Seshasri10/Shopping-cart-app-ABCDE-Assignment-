export default function Navbar({ setView }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-200">
      <button onClick={() => setView("items")}>Items</button>
      <button onClick={() => setView("cart")}>Cart</button>
      <button onClick={() => setView("orders")}>Order History</button>
    </div>
  );
}
