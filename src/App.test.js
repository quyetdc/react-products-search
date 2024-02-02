import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Vegetables", price: "$2", stocked: false, name: "Spinach" },
]

test("renders search bar", () => {
  render(<App products={PRODUCTS} />);

  const searchField = screen.getByPlaceholderText(/Search/i);
  const inStockCheckbox = screen.getByLabelText(/Only show products in stock/i);

  expect(searchField).toBeInTheDocument();
  expect(inStockCheckbox).toBeInTheDocument();
});

test("renders Categories", () => {
  render(<App products={PRODUCTS} />);

  PRODUCTS.forEach(product => {
    const category = product.category;
    expect(screen.getByText(category)).toBeInTheDocument();
  });
});

test("renders products", () => {
  render(<App products={PRODUCTS} />);

  PRODUCTS.forEach(product => {
    const name = product.name;
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test("renders stocked products", () => {
  render(<App products={PRODUCTS} />);

  const stockOnlyCheckbox = screen.getByRole("checkbox");
  fireEvent(stockOnlyCheckbox, new MouseEvent("click", { bubbles: true }));

  PRODUCTS.forEach(product => {
    const name = product.name;
    if (product.stocked) {
      expect(screen.getByText(name)).toBeInTheDocument();
    } else {
      expect(screen.queryAllByText(name)).tobeNull;
    }
  });
});

test("renders filtered products", () => {
  render(<App products={PRODUCTS} />);

  const searchText = "Apple";
  const filterTextBox = screen.getByPlaceholderText(/Search/i);

  fireEvent.change(filterTextBox, { target: { value: searchText }});

  PRODUCTS.forEach(product => {
    const name = product.name;

    if (product.name.includes(searchText)) {
      expect(screen.getByText(name)).toBeInTheDocument();
    } else {
      expect(screen.queryAllByText(name)).tobeNull;
    }
  });
});


