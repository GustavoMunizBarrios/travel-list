const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>✈ Packing List ✈</h1>;
}

function Form() {
  function handleSubmit(event) {
    event.preventDefault(); // for avoiding reload the page
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select>
        {/* Create an array from 1 to 20, and mapping 20 times "option" */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item i={item} key={item.id} />
          //<li>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

function Item({ i }) {
  return (
    <li>
      <span style={i.packed ? { textDecoration: "line-through" } : {}}>
        {i.quantity} {i.description}
      </span>
      <button onClick={() => alert("Eliminate Item?")}>✖</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
