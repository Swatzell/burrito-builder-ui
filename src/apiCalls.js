export const getOrders = async () => {
  return fetch("http://localhost:3001/api/v1/orders")
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to get orders');
    }
    return response.json();
  })
  .then((data) => data.orders)
  .catch((error) => {
    console.error("Error getting orders:", error);
    throw error;
  });
};
