import { useState } from "react";
import './App.css';

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}

export function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="flex flex-col items-center mt-10">
      <SearchBar
        filterText={filterText}
        setFilterText={setFilterText}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        />

      <ProductTable products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  )
}

function SearchBar({
  filterText,
  inStockOnly,
  setFilterText,
  setInStockOnly
}) {

  function onFilterTextChange(event) {
    setFilterText(event.target.value);
  }

  function onSetInStockOnlyChange(event) {
    setInStockOnly(event.target.checked);
  }

  return (
    <form style={{ textAlign: "left"}}>
      <input type="text" placeholder="Search..." value={filterText} onChange={onFilterTextChange}/>
      <br />
      <label className="mt-5 block">
        <input type="checkbox" checked={inStockOnly} onChange={onSetInStockOnlyChange} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

export function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product, index) => {
    if(lastCategory != product.category){
      lastCategory = product.category;

      rows.push(<ProductCategoryRow category={product.category} key={`category-${index}`} />);
    }

    if (filterText.length == 0 || product.name.toLowerCase().includes(filterText.toLowerCase())){
      if (!inStockOnly || product.stocked) {
        rows.push(<ProductRow product={product} index={index} key={`product-${index}`} />);
      }
    }
  });

  return (
    <div className="mt-10">
      <table className="min-w-xl">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          { rows }
        </tbody>
      </table>
    </div>
  )
}

export function ProductRow({ product, index }) {
  const name = product.stocked ? product.name :
              <span style={{ color: 'red' }}> { product.name } </span>
  return (
    <tr>
      <td>{ name }</td>
      <td>{ product.price }</td>
    </tr>
  )
}

export function ProductCategoryRow({ category, index }) {
  return (
    <tr>
      <th colSpan="2">
        { category }
      </th>
    </tr>
  )
}

export default App;
