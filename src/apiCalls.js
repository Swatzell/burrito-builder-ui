export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.orders;
};

export const addOrder = async (order) => {
  const response = await fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const newOrder = await response.json();
  return newOrder;
};

