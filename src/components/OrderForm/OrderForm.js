import { useState } from "react";
import { addOrder } from "../../apiCalls";

function OrderForm({ setOrders, orders, setError }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && ingredients.length) {
      setIsSubmitting(true);
      try {
        const newOrder = await addOrder({ name, ingredients });
        setOrders([...orders, newOrder]);
        clearInputs();
        setError("");
      } catch (error) {
        setError(error.message);
      }finally {
        setIsSubmitting(false);
    }
    }
  };

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];

  const addIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={() => addIngredient(ingredient)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button type="submit" disabled={!name || ingredients.length === 0 || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Order"}
      </button>
    </form>
  );
}

export default OrderForm;
