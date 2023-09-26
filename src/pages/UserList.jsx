import React, { useEffect, useState } from "react";
import "../style/productList.css";
import "react-data-grid/lib/styles.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { privateRequest } from "../Auth/requestMethods";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  
  const getAllProduct=()=>{
    privateRequest
    .get("/user/getData")
    .then((response) => {
      console.log(response.data);
      setUserList(response.data.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  useEffect(() => {
    getAllProduct();
  }, []);

 const deleteProduct=(id)=>{
  //  privateRequest
  //  .delete(`/user/deleteProduct/${id}`)
  //  .then((response) => {
  //    console.log(response);
  //    getAllProduct();
  //  })
  //  .catch((error) => {
  //    console.error(error);
  //  });
  alert("function not implemented yet")
 }
 console.log(userList)
  return (
    <div>
      <div>
        <h2>UserList</h2>
        <table>
          {/* <thead className="table_head">  
            <tr >   
              {columns.map((item, index) => (              
                  <th key={index}>{item.name}</th>       
             ))}
            </tr>
          </thead> */}
          <tbody style={{background:"#fff"}}>
            {userList.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>{item.region}</td>
                <td>
                    <EditOutlinedIcon style={{ color: "blue" }} />
                </td>
                <td>
                  <DeleteOutlineOutlinedIcon style={{ color: "red" }} onClick={()=>deleteProduct(item.id)}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;