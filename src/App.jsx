import Header from "./Header.jsx";
import Contents from "./Contents.jsx";
import Footer from "./Footer.jsx";
import { useEffect, useState } from "react";
import AddItem from "./AddItem.jsx";
import SearchItem from "./SearchItem.jsx";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppingList")) || []
  );

  const [newItems, setNewItems] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items))
  }, [items])

  

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItems) return;
    addItem(newItems);
    setNewItems("");
  };

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItems={newItems}
        setNewItems={setNewItems}
        handleSubmit={handleSubmit}
      />
      <SearchItem 
        search={search} 
        setSearch={setSearch} 
      />
      <Contents
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;







 