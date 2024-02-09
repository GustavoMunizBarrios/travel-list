import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
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

  function handleClearList() {
    //When the user confirmed then const confirmed will be true, otherwise will be false
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
