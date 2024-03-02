export default function Item({ i, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        /* style={{ borderRadius: 50 + "%" }} */
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
