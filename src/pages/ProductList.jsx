import React, { useEffect, useState } from "react";
import "../style/productList.css";
import "react-data-grid/lib/styles.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Modal from "./Model";
import {
  deleteProduct,
  getAllCategory,
  getAllProducts,
} from "../services/product-service";
import { toast } from "react-toastify";
import CategoryCart from "../components/CategoryCart";
import CategoryPage from "./CategoryPage";
import SingleProduct from "./SingleProduct";
import { imageUrl } from "../Auth/requestMethods";

const PaginationButton = styled.button`
  padding: 5px 8px;
  margin: 5px 3px 0 0;
  background-color: transparent;
  border: 1px solid black;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
const Button = styled.button`
  margin: 0 5px 0 5px;
`;
const Button2 = styled.button`
  background-color: #fff;
  border: none;
`;
const Heading = styled.h3``;
const CartCategoryContainer = styled.div`
  display: flex;
  overflow-y: auto;
  height: 225px;
`;
const ProductList = () => {
  const [productList, setProductList] = useState([]);

  const [category, setCategory] = useState([]);

  const getcategory = () => {
    getAllCategory()
      .then((res) => {
        setCategory(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getcategory();
  }, []);

  const getAllProduct = () => {
    getAllProducts()
      .then((response) => {
        setProductList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const delProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        toast.success("Product deleted successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        getAllProduct(); // Fetch products again after deletion
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of items to display per page

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the productList based on the current page
  const displayedProducts = productList.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const [isNewProductPageOpen, setIsNewProductPageOpen] = useState(false);

  const openNewProductpage = () => {
    setIsNewProductPageOpen(true);
    document.body.classList.add("body-scroll-lock");

  };
  const [isNewCategoryPageOpen, setIsNewCategoryPageOpen] = useState(false);

  const openNewCategorypage = () => {
    setIsNewCategoryPageOpen(true);
    document.body.classList.add("body-scroll-lock");
  };
  const [isEditProductPage, setIsEditProductPage] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const openEditProductpage = (item) => {
    setSelectedItem(item)
    setIsEditProductPage(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeModal = () => {
    setIsNewProductPageOpen(false);
    setIsNewCategoryPageOpen(false);
    document.body.classList.remove("body-scroll-lock");
    
  };
  const closeEditProductModal=()=>{
    setIsEditProductPage(false)
    document.body.classList.remove("body-scroll-lock");
  }
  return (
    <div>
      <Header>
        <Heading>Product Page</Heading>
        <ButtonContainer>
          <Button onClick={openNewProductpage} className="addBtn">
            <AddIcon /> <p>Add Product</p>
          </Button>
          <Modal isOpen={isNewProductPageOpen} onClose={closeModal}>
            <SingleProduct product={0} onClose={closeModal}/>
          </Modal>
          <Button onClick={openNewCategorypage} className="addBtn">
            <AddIcon /> <p>Add Category</p>
          </Button>
          <Modal isOpen={isNewCategoryPageOpen} onClose={closeModal}>
            <CategoryPage categoryId={0} onClose={closeModal}/>
          </Modal>
        </ButtonContainer>
      </Header>
      <div>
        {/* <h2>ProductList</h2> */}
        <CartCategoryContainer>
          {category.map((item, index) => (
            <CategoryCart data={item} />
          ))}
        </CartCategoryContainer>

        <table>
          {/* <thead className="table_head">  
            <tr >   
              {columns.map((item, index) => (              
                  <th key={index}>{item.name}</th>       
             ))}
            </tr>
          </thead> */}

          <tbody style={{ background: "#fff" }}>
            {displayedProducts.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.size}</td>
                <td>{item.description}</td>
                <td>{item.color}</td>
                <td>
                  <div className="imgContainer">
                    <img
                      src={`${imageUrl}/${item.image}`}
                      alt="Image"
                    />
                  </div>
                </td>
                <td>{item.price}</td>
                <td>
                  <Button2 onClick={()=>openEditProductpage(item)}>
                      <EditOutlinedIcon style={{ color: "blue" }} />
                  </Button2>
                  <Modal isOpen={isEditProductPage} onClose={closeEditProductModal}>
                    <SingleProduct product={selectedItem} onClose={closeEditProductModal}/>
                  </Modal>
                  {/* <Link to={`/product/${item.id}`}>
                    <EditOutlinedIcon style={{ color: "blue" }} />
                  </Link> */}
                </td>
                <td>
                  <DeleteOutlineOutlinedIcon
                    style={{ color: "red" }}
                    onClick={() => delProduct(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="pagination">
          {Array.from({
            length: Math.ceil(productList.length / itemsPerPage),
          }).map((_, index) => (
            <PaginationButton
              className={currentPage === index + 1 ? "active" : ""}
              key={index}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </PaginationButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
