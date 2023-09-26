import React, { useEffect, useState } from "react";
import "../style/product.css";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  SaveProduct,
  UploadImage,
  getAllCategory,
  getProductById,
} from "../services/product-service";

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

const SingleProduct = (props) => {
  console.log("props",props);
  const size = [
    {
      id: 1,
      name: "S",
    },
    {
      id: 2,
      name: "M",
    },
    {
      id: 3,
      name: "L",
    },
    {
      id: 4,
      name: "XL",
    },
    {
      id: 5,
      name: "XXL",
    },
  ];

  const color = [
    {
      id: 1,
      name: "Red",
    },
    {
      id: 2,
      name: "Black",
    },
    {
      id: 3,
      name: "Green",
    },
    {
      id: 4,
      name: "White",
    },
    {
      id: 5,
      name: "Grey",
    },
    {
      id: 6,
      name: "Blue",
    },
  ];

  const [product, setProduct] = useState({
    id: 0,
    description: "",
    image: "",
    title: "",
    size: "",
    color: "",
    price: 0,
    categoryId: "",
  });
  const [file, setFile] = useState(null);

  const [productCategory, setProductCateogry] = useState([]);

  console.log("props val",props);
  useEffect(() => {

    if (!props.product) {
      setProduct({});
    } else {
          setProduct(props.product);
    }
  }, []);

  useEffect(() => {
    getAllCategory()
    .then((res) => {
      // console.log(res);
      setProductCateogry(res);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);
  //  console.log(product)
  const cancelChanges = (e) => {
    e.preventDefault();
    if (product.id > 0) {
      alert("you are allow to do cancel all changes");
    } else {
      setProduct({
        id: 0,
        description: "",
        image: "",
        title: "",
        size: "",
        color: "",
        price: 0,
        categoryId: "",
      });
    }
  };

  const handleInputChange = (e) => {
    // Extract the name and value of the input field
    const { name, value } = e.target;
    // Update the form data state with the new value
    setProduct({
      ...product, // Keep the existing form data
      [name]: value, // Update the specific field by its name
    });
  };

  // Create a function to handle form submission
  // Method to fetch a product by ID

  // const fetchProductById = (productId) => {
  //   getProductById(productId)
  //     .then((response) => {
  //       setProduct(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // Method to handle image upload
  const handleImageUpload = (productId) => {
    if (file) {
      UploadImage(productId, file)
        .then((response) => {
          // Assuming the server returns the image name
          // console.log("imageName",response)
          setProduct({ ...product, image: response });
          toast.success("Image uploaded successfully!", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        })
        .catch((error) => {
          toast.error("Error uploading image", {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  // Method to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("CompleteData", product);
    // Assuming productData contains the data you want to save
    SaveProduct(product)
      .then((response) => {
        // console.log('Product saved:', response);
        handleImageUpload(response.id);
        toast.success("Product added successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        // navigate("/products");
        props.onClose();
      })
      .catch((error) => {
        toast.error("Something went wrong.", {
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
            label="Title"
            variant="standard"
            className="formdiv"
            value={product.title}
            name="title"
            onChange={handleInputChange}
          />
          <TextField
            id="standard-select-currency"
            select
            label="Select Size"
            defaultValue="EUR"
            className="formdiv"
            helperText="Please select your size"
            variant="standard"
            placeholder="size"
            value={product.size}
            name="size"
            onChange={handleInputChange}
          >
            {size.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Select Color"
            defaultValue="EUR"
            helperText="Please select your color"
            variant="standard"
            className="formdiv"
            placeholder="color"
            value={product.color}
            name="color"
            onChange={handleInputChange}
          >
            {color.map((option) => (
              <MenuItem key={option.id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="standard-select-currency"
            select
            label="Select a category"
            defaultValue="EUR"
            helperText="Please select your category"
            variant="standard"
            className="formdiv"
            placeholder="color"
            value={product.categoryId}
            name="categoryId"
            onChange={handleInputChange}
          >
            {productCategory.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.catName}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-number"
            label="Price"
            type="number"
            className="formdiv"
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
            name="price"
            value={product.price}
            onChange={handleInputChange}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            maxRows={4}
            variant="standard"
            className="formdiv"
            value={product.description}
            name="description"
            onChange={handleInputChange}
          />
          <div className="formdiv imgUploadButtonContainer">
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
            {file && (
              <p style={{ marginLeft: "15px" }}>Selected file: {file.name}</p>
            )}
          </div>
          <div className="buttons">
            <Button type="submit" onClick={handleSubmit} variant="contained">
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

export default SingleProduct;
