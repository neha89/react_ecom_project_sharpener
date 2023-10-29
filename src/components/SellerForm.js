import React, { useState, useEffect } from "react";

const SellerForm = () => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({
    productId: "",
    sellingPrice: 0,
    productName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: name === "sellingPrice" ? parseFloat(value) : value,
    });
  };

  const handleAddProduct = () => {
    setProducts([...products, productDetails]);
    setProductDetails({
      productId: "",
      sellingPrice: 0,
      productName: "",
    });
  };

  const handleDeleteProduct =(index)=>{
    const updatedProducts = [...products];
    const deletedProduct = updatedProducts.splice(index,1)[0];
    setProducts(updatedProducts);

    //update total selling price and local storage after deleting the product
    const updatedTotalSellingPrice = updatedProducts.reduce(
      (total, product) => total + product.sellingPrice, 0
    );

    localStorage.setItem('products', JSON.stringify(updatedProducts));
    localStorage.setItem('totalSellingPrice', updatedTotalSellingPrice.toFixed(2));

  };

  useEffect(() => {
    //Calculate total selling price whenever products change

    const totalSellingPrice = products.reduce(
      (total, product) => total + product.sellingPrice,
      0
    );

    //store products in localStorage

    localStorage.setItem("products", JSON.stringify(products));

    //store total selling price in localStorage

    localStorage.setItem("totalSellingPrice", totalSellingPrice.toFixed(2));
  }, [products]);

  return (
    <div>
      <label htmlFor="productId">Product ID</label>
      <input
        type="text"
        name="productId"
        placeholder="Product ID"
        value={productDetails.productId}
        onChange={handleInputChange}
      />

      <label htmlFor="sellingPrice">Selling Price</label>
      <input
        type="number"
        name="sellingPrice"
        placeholder="Selling Price"
        value={productDetails.sellingPrice}
        onChange={handleInputChange}
      />

      <label htmlFor="productName">Product Name</label>
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={productDetails.productName}
        onChange={handleInputChange}
      />

      <button onClick={handleAddProduct}>Add Product</button>
      <div>
        <h3>Product List</h3>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              {product.productName} - ${product.sellingPrice}
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <p>
            Total value worth of products: $
            {products
              .reduce((total, product) => total + product.sellingPrice, 0)
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
