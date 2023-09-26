import React, { useEffect, useState } from "react";
import "../style/product.css";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SaveCategory, UploadCategoryImage, getCategoryById } from "../services/product-service";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const CategoryPage = (props) => {
 
  const [category, setCategory] = useState({
     id:null,
     catName:'',
     title:'',
     img:''
  });
  const [file, setFile] = useState(null);

  // we are feaching prodcutId from location
const cat = props.categoryId;
console.log(cat);

  useEffect(() => {
    if (cat == 0) {
        setCategory({});
    } else {
    getCategoryById(cat)
      .then((response) => {
        console.log(response);
        setCategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }, []);

  const cancelChanges = (e) => {
    e.preventDefault();
    if (category.id > 0) {
      alert("you are allow to do cancel all changes");
    } else {
        setCategory({
            id:null,
            catName:'',
            title:'',
            img:''
      });
    }
  };

  const handleInputChange = (e) => {
    // Extract the name and value of the input field
    const { name, value } = e.target;
    // Update the form data state with the new value
    setCategory({
      ...category, // Keep the existing form data
      [name]: value, // Update the specific field by its name
    });
  };

  // Method to handle image upload
  const handleImageUpload = (productId) => {
    if (file) {
        UploadCategoryImage(productId, file)
        .then((response) => {
          // Assuming the server returns the image name
          setCategory({ ...category, image: response });
          toast.success('Image uploaded successfully!', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((error) => {
          toast.error('Error uploading image', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  // Method to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CompleteData",category);
    // Assuming productData contains the data you want to save
    SaveCategory(category)
      .then((response) => {
        console.log('Product saved:', response);
        handleImageUpload(response.id);
        toast.success('Category added successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // navigate('/products');
        props.onClose();
      })
      .catch((error) => {
        toast.error('Something went wrong.', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  // console.log(file);
  // console.log(product)
  return (
    <div className="container">
      <div className="formContainer">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="formdata"
        >
          <TextField
            id="standard-basic"
            label="Category Name"
            variant="standard"
            className="formdiv"
            value={category.catName}
            name="catName"
            onChange={handleInputChange}
          />
          
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            className="formdiv"
            value={category.title}
            name="title"
            onChange={handleInputChange}
          />
          
          <div className="formdiv imgUploadButtonContainer" >
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              id="myfile"
              name="myfile"
            />
          </Button>
          {file && <p style={{marginLeft:"15px"}}>Selected file: {file.name}</p>}
          </div>
          <div className="buttons">
            <Button type="submit" onClick={handleSubmit} 
            variant="contained"
            >
              Save Product
            </Button>
            <Button onClick={cancelChanges} variant="contained" color="grey">
              Cancel Changes
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CategoryPage;
