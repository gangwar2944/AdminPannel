import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/UserList";
import OrderList from "./pages/OrderList";
import ProductList from "./pages/ProductList";
import Sidebar from "./components/Sidebar";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";
import SingleProduct from "./pages/SingleProduct";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get("isAuthenticated") === "true"
  );

  // Use the useEffect hook to update isAuthenticated when cookies change
  useEffect(() => {
    setIsAuthenticated(Cookies.get("isAuthenticated") === "true");
  }, []);

  useEffect(() => {
    setIsAuthenticated(Cookies.get("isAuthenticated"));
  }, [Cookies.get("isAuthenticated")]);

  const handleLoginData = (data) => {
    // Handle the data received from the child component
    // console.log("Data from child component:", data);
    setIsAuthenticated(true);
  };

  return (
    <BrowserRouter>
     <ToastContainer/>
      {isAuthenticated ? (
        <Sidebar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Sidebar>
      ) : (
        <Routes>
          <Route path="/" element={<Login onLogin={handleLoginData} />} />
        </Routes>
      )}
    </BrowserRouter>

    //   <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         isAuthenticated ? (
    //           <div>
    //             <Sidebar>
    //             <Routes>
    //               <Route path="/home" element={<Home />} />
    //               <Route path="/admin" element={<Dashboard />} />
    //               <Route path="/users" element={<UserList />} />
    //               <Route path="/orders" element={<OrderList />} />
    //               <Route path="/product/:productId" element={<SingleProduct />} />
    //               <Route path="/products" element={<ProductList />} />
    //               <Route path="/*" element={<ErrorPage />} />
    //             </Routes>
    //             </Sidebar>
    //           </div>
    //         ) : (
    //           <Navigate to="/login" />
    //         )
    //       }
    //     />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
