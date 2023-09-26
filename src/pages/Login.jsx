import Cookies from 'js-cookie';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { publicRequest } from '../Auth/requestMethods';
import { toast } from 'react-toastify';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c3c0c0;
`
const Wrapper = styled.div`
    margin-top: 60px;
    width: 40%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    padding: 20px;
    margin: auto;
`
const Form = styled.form`
    margin: auto;
`
const Input = styled.input`
    width: 100%;
    flex: 1;
    margin: 10px 0 0 0 ;
    padding: 10px 20px;
`
const Title = styled.h2`
    text-transform: uppercase;
`
const Button = styled.button`
    width: 40%;
    background-color: transparent;
    border: 1px solid teal;
    color:teal;
    padding: 8px 10px;
    margin-top: 10px;
    
&:hover{
    background-color: teal;
    color: #fff;
    border: none;
    cursor: pointer;
};
&:disabled{
      color: teal;
      cursor: not-allowed;
    };

`
const AnotherOption = styled.span`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:  0 10px ;
  text-align: start;
  
`
const Links = styled.span`
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`
const Error = styled.div`
  color: red;
`
const Login = (props) => {
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const login =({email,password})=>{

        if(email.trim()==='' || password.trim()===''){
          //  toast.error("email & password can not be empty");
           toast.error("Email & password can not be empty!", {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    
           return;
        }
      publicRequest.post('auth/authenticate',{email,password})
      .then(res=>{
          // console.log(res.data)
          toast.success("user login successfully",{
            position:toast.POSITION.BOTTOM_RIGHT
          })
          localStorage.setItem('User',JSON.stringify(res.data));
          Cookies.set('authToken',res.data.token,{expires:7});
          Cookies.set('isAuthenticated', 'true', { expires: 7 });
          props.onLogin(true);
          navigate("/home")
       })
       .catch((err)=>{
        console.log(err);
        if(err.response.status===400 || err.response.status === 404){
          toast.error(err.response.data.message,{
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        }else{
         toast.error("Somthing went wrong",{
          position:toast.POSITION.BOTTOM_RIGHT,
         })
        }
       })
}

  const handleClick =(e)=>{
        e.preventDefault();
        login({email,password});
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Sign In</Title>
          <Form>
                <Input placeholder="Enter your UserName & email" onChange={(e)=>setEmail(e.target.value)}/>
               <Input placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleClick}>Login</Button>
          </Form>
          <AnotherOption>
            <Links>Forget Password</Links>
          </AnotherOption>
        </Wrapper>
      </Container>
    </>
  )
}

export default Login