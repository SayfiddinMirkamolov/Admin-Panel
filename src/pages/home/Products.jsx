import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
const edit = "./assets/edit.svg";
const delet = "./assets/delete.svg";

/* eslint-disable react/prop-types */
const Products = ({ products, data }) => {
  //
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [ID, setID] = useState();
  const handleDeleteProductClick = async (productId) => {
    setShowConfirmation(true);
    setID(productId);
  };

  const handleConfirmDelete = async () => {
    await axios.delete(`http://localhost:3000/products/${ID}`);
    data();
    setShowConfirmation(false);
  };
  return (
    <>
      {products.map((product) => (
        <div className="row" key={product.id}>
          <span>  {product.name}</span>
          <span>{product.qbCode}</span>
          <span>{product.brand}</span>
          <span>${product.price}</span>
          <span>
            <del> ${product.discountPercentage}</del>
          </span>
          <span className="btn">
            <Link to={`./edit/${product.id}`}>
              <button>
                <img src={edit} alt="edit" />
              </button>
            </Link>
            <Link>
              <button onClick={() => handleDeleteProductClick(product.id)}>
                <img src={delet} alt="delete" />
              </button>
            </Link>
          </span>
        </div>
      ))}
      {showConfirmation && (
        <div className="modal">
          <div className="modal_content">
            
            <p>Siz rostan ham ushbu mahsulotni o'chirmoqchimisiz</p>
            <div className="modal_btn">
              <button className="btn1" onClick={handleConfirmDelete}>
                ha
              </button>
              <button
                className="btn2"
                onClick={() => setShowConfirmation(false)}
              >
                yoq
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
