import { useState } from "react";
import Login from "./components/Login";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [view, setView] = useState("items");

  const checkout = async () => {
    await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    alert("Order placed successfully");
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <>
      <Navbar setView={setView} />

      {view === "items" && <ItemList />}
      {view === "cart" && (
        <div className="p-6">
          <button
            onClick={checkout}
            className="bg-purple-600 text-white px-4 py-2"
          >
            Checkout
          </button>
        </div>
      )}
    </>
  );
}
