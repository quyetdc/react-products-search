import logo from './logo.svg';
import './App.css';

function App() {
  const products = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

  return (
    <div className="App">
      <FilterableProductTable />
    </div>
  );
}

export function FilterableProductTable() {
  return (
    <div>
      <SearchBar />
      <ProductTable />
    </div>
  )
}

export function SearchBar() {
  return (
    <div>
      Search box
    </div>
  )
}

export function ProductTable() {
  return (
    <div>
      <ProductCategoryRow />
      <ProductRow />
    </div>
  )
}

export function ProductRow() {
  return (
    <div>
      Product row
    </div>
  )
}

export function ProductCategoryRow() {
  return (
    <div>
      Product Category row
    </div>
  )
}

export default App;
