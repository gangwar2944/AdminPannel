import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/";

const TOKEN = JSON.parse(localStorage.getItem("User")).token;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
  }

export const publicRequest = axios.create({
    baseURL : BASE_URL,
});

export const privateRequest = axios.create({
    baseURL : BASE_URL,
    headers :headers,
});

// image url

export const imageUrl = 'http://localhost:8000/api/v1/files/getImage';
