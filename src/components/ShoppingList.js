import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const[search,setSearchText]=useState("")
  
  const [list,setList]=useState([])

  function onSearchChange(event){
    setSearchText(event.target.value)
  }

  
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function onCategoryChange(newItem){
    setList([...list, newItem]);
  }

  const itemsToDisplay = [...items, ...list].filter((item) => {
  const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
  const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
  return matchesCategory && matchesSearch;
});

  return (
    <div className="ShoppingList">
      <ItemForm     onItemFormSubmit ={onCategoryChange}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={onSearchChange} search={search}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
