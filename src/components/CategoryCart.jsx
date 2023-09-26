import React, { useState } from "react";
import styled from "styled-components";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Modal from "../pages/Model";
import CategoryPage from "../pages/CategoryPage";
import { deleteCategory } from "../services/product-service";
import { toast } from "react-toastify";
import { imageUrl } from "../Auth/requestMethods";

const CategoryContainer = styled.div`
  width: 300px;
  height: 200px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  /* border: 2px solid #8f8686; */
  border-radius: 5px;
  margin-bottom: 5px;
  margin-right: 10px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
`;

const ButtonContainer = styled.div``;
const Heading = styled.h3``;
const ImageAndDetail = styled.div`
  display: flex;
  justify-content: space-between;
  /* align-items: center; */
`;
const ImageContainer = styled.div`
  flex: 3;
  width: 250px;
  height: 150px;
  margin: 10px;
`;
const Image = styled.img`
  width: 90%;
  max-height: 140px;
  margin: auto;
`;
const Details = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
`;
const Count = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
`;
const Button = styled.button`
  margin: 0 5px 0 5px;
  background-color: #fff;
  border: none;
`

const CategoryCart = (props) => {
  const [isNewCategoryPageOpen, setIsNewCategoryPageOpen] = useState(false);

  const openNewCategorypage = () => {
    setIsNewCategoryPageOpen(true);
  };

  const closeModal = () => {
    setIsNewCategoryPageOpen(false);
  };

  const deleteCat=(catId)=>{
    deleteCategory(catId)
    .then((res)=>{
      console.log("res",res);
      toast.success("Category deleted successfully!",{
        position:toast.POSITION.BOTTOM_RIGHT,
      })
      window.location.reload();
    })
    .catch((error)=>{
      console.log(error)
      toast.error("Category could not be deleted",{
        position:toast.POSITION.BOTTOM_RIGHT
      })
    })
  }

  // const img = imageUrl;
  return (
    <CategoryContainer>
      <Header>
        <Heading>{props.data.title}</Heading>
        <ButtonContainer>
          <Button onClick={openNewCategorypage}>
            <EditOutlinedIcon style={{ color: "blue" }} />
          </Button>
          <Modal isOpen={isNewCategoryPageOpen} onClose={closeModal}>
            <CategoryPage categoryId={props.data.id} onClose={closeModal}/>
          </Modal>
          
          <DeleteOutlineOutlinedIcon style={{ color: "red" }} onClick={()=>deleteCat(props.data.id)}/>
        </ButtonContainer>
      </Header>
      <ImageAndDetail>
        <ImageContainer>
          <Image
            src={`${imageUrl}/${props.data.img}`}
            alt="catImage"
          />
        </ImageContainer>
        <Details>
          <Count>
            <p>Sold :</p> <b>89</b>
          </Count>
          <Count>
            <p>Stock : </p> <b>41</b>
          </Count>
          <Count>
            <p>Total : </p> <b>31</b>
          </Count>
        </Details>
      </ImageAndDetail>
    </CategoryContainer>
  );
};

export default CategoryCart;
