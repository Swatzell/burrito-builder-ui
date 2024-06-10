export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders")
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.orders;
};
