import { useEffect, useState } from "react";
import "./App.css";
import { getOrders } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const fetchedOrders = await getOrders();
          setOrders(fetchedOrders);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchOrders().then(() => {
        console.log("Orders fetched successfully");
      });
    }, []);
  
  

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
      </header>
      {error && <p className="error">{error}</p>}
      <OrderForm setOrders={setOrders} orders={orders} setError={setError} />
      <Orders orders={orders} />
    </main>
  );
}
export default App;
