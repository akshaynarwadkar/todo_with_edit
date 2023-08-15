import { useState } from "react";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [isEditItem, setIsEditItem] = useState();

  function submitHandler(e) {
    e.preventDefault();
  }

  function addHandler() {
    if (!input) {
      alert("Add an item first");
    } else if (toggle && input) {
      setItems(
        items.map((item) => {
          if (item.id === isEditItem) {
            return { ...item, value: input };
          }
          return item;
        })
      );
      setInput("");
      setToggle(false);
    } else {
      setItems([
        ...items,
        { id: new Date().getTime().toString(), value: input },
      ]);
      setInput("");
    }
  }

  function editHandler(id) {
    const editingItem = items.find((item) => {
      return item.id === id;
    });
    setInput(editingItem.value);
    setToggle(true);
    setIsEditItem(id);
  }

  function deleteHandler(id) {
    const updateList = items.filter((item) => item.id !== id);
    setItems(updateList);
  }

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
        ></input>
        <button onClick={addHandler}>Add </button>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <p>
                {item.value}
                <button onClick={() => editHandler(item.id)}>Edit</button>{" "}
                <button onClick={() => deleteHandler(item.id)}>Delete</button>
              </p>
            </div>
          );
        })}
      </form>
    </div>
  );
};
export default App;
