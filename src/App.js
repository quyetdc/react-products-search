import { useState } from "react";
import './App.css';

function App({ products }) {
  return (
    <div className="App">
      <FilterableProductTable products={products} />
    </div>
  );
}

function FilterableProductTable({ products }) {
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
      <input type="text" id="search-field" placeholder="Search..." value={filterText} onChange={onFilterTextChange} />
      <br />
      <label className="mt-5 block">
        <input type="checkbox" checked={inStockOnly} onChange={onSetInStockOnlyChange} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

function ProductTable({ products, filterText, inStockOnly }) {
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

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
              <span style={{ color: 'red' }}> { product.name } </span>
  return (
    <tr>
      <td>{ name }</td>
      <td>{ product.price }</td>
    </tr>
  )
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        { category }
      </th>
    </tr>
  )
}

export default App;
