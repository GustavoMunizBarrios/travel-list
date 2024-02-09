import { useState } from "react";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
]; */

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    //Add the newItem (item) to the array
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    //.filter creates a new array with the elements that meet the condition "item.id !== id"
    //In other words exclude the object with the id of the parameter
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    //Change the value of packed (true or false) of an object
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>✈ Packing List ✈</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault(); // for avoiding reload the page

    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    //Set form to its initial state
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {/* Create an array from 1 to 20, and mapping 20 times "option" */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            i={item}
            onDeleteItem={onDeleteItem}
            key={item.id}
            onToggleItems={onToggleItems}
          />
          //<li>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

function Item({ i, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={i.packed}
        onChange={() => {
          onToggleItems(i.id);
        }}
      ></input>
      <span style={i.packed ? { textDecoration: "line-through" } : {}}>
        {i.quantity} {i.description}
      </span>
      <button onClick={() => onDeleteItem(i.id)}>✖</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>You got everything! Ready to go ✈</em>
      ) : (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {numPacked} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
