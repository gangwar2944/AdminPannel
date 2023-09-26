import { toast } from "react-toastify";
import { privateRequest, publicRequest } from "../Auth/requestMethods";

// product-service.js

// Method to get all products
export const getAllProducts = async () => {
  try {
    const response = await publicRequest.get("/product/getAll");
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Rethrow the error for the component to handle
  }
};

export const getAllCategory = async () => {
  try {
    const res = await publicRequest.get("category/getAll");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await privateRequest.get(`category/getAll/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// Method to delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await privateRequest.delete(
      `/product/deleteProduct/${productId}`
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error deleting product:", error);
    toast.error("Product can not be deleted due to some error!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    throw error; // Rethrow the error for the component to handle
  }
};

// method to delete product category

export const deleteCategory = async (categoryId) => {
  try {
    const res = await privateRequest.delete(`category/deleteCategory/${categoryId}`);
    // console.log("response",res)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// product-service.js

// Method to get a product by ID
export const getProductById = async (productId) => {
  try {
    const response = await privateRequest.get(
      `/product/getProduct/${productId}`
    );
    return response.data; // Return the product data
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error; // Rethrow the error for the component to handle
  }
};

// Method to upload an image for a product
export const UploadImage = async (productId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await privateRequest.post(
      `/files/upload/${productId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error for the component to handle
  }
};

export const UploadCategoryImage = async (categoryId, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await privateRequest.post(
      `/files/uploadCategoryImage/${categoryId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Rethrow the error for the component to handle
  }
};

// Method to save/update a product
export const SaveProduct = async (productData) => {
  try {
    const response = await privateRequest.post(
      "/product/saveProduct",
      productData
    );
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error saving product:", error);
    throw error; // Rethrow the error for the component to handle
  }
};

export const SaveCategory = async (categoryData) => {
  try {
    const res = await privateRequest.post(
      "/category/saveCategory",
      categoryData
    );
    return res.data;
  } catch (error) {
    console.log("Error saving category", error);
    throw error;
  }
};
