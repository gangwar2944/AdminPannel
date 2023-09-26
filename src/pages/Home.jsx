import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #cfd3d3;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ProfileDetails = styled.div`
  flex: 2;
  background-color: #cfd3d3;
  height: 100%;
`;

const Profile = styled.div`
  width: 100%;
  height: 500px;
  /* background-color: #ead5d5; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 1;
`;
const Imgcontainer = styled.div`
  font-size: 50px;
`;
const Heading = styled.h3`
 `;
const Email = styled.p`
  margin-top: 10px;
`;
const PersonalInformation = styled.div`
  flex: 2;
  margin-top: 15px;
`;
const AccountDetail = styled.div`
   display: flex;
   flex-wrap:wrap;
   justify-content: flex-start;
`;
const Tiles = styled.div`
    width: 300px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
    padding: 10px;
    margin: 15px;

`
const LableAndName = styled.div`
  align-self: flex-start;
  margin: 10px;
`
const Logo = styled.div`
  align-self: flex-start;
  margin: 10px;
  color: rgb(114, 87, 213);
`
const Home = () => {
  const [userData,setUserData] = useState({})

  // const user = localStorage.getItem("User");
  // console.log("call ")
  // setUserData(user);

  useEffect(() => {
    const user = localStorage.getItem("User");
    setUserData(JSON.parse(user));
  }, []);
  // console.log(userData);

  return (
    <Container>
      <SidebarContainer>
        <Profile>
          <Imgcontainer>
            {" "}
            <AccountCircleIcon style={{ fontSize: "200px",color: "dimgrey"}} />{" "}
          </Imgcontainer>
          <Heading> {userData.firstname} {userData.lastname}</Heading>
          <Email>{userData.email}</Email>
        </Profile>
        <PersonalInformation>
          <Heading style={{ color: "rgb(114, 87, 213" }}> Personal Information</Heading>
          <Email>Billing & Payments</Email>
          <Email>Order History</Email>
          <Email>Gift Cards</Email>
        </PersonalInformation>
      </SidebarContainer>
      <ProfileDetails>
        <Heading style={{padding:"15px 10px"}}>Personal Information</Heading>
        <Email style={{padding:"0 15px 15px 15px"}}>
          {" "}
          this is something new for this time this is user profile which i am
          going to describe user details here
        </Email>
        <AccountDetail>
          <Tiles>
            <LableAndName>
              <Heading>First Name</Heading>
              <Email>{userData.firstname}</Email>
            </LableAndName>
            <Logo>
              <AccountCircleIcon/>
            </Logo>
          </Tiles>
          <Tiles>
            <LableAndName>
              <Heading>Last Name</Heading>
              <Email>{userData.lastname}</Email>
            </LableAndName>
            <Logo>
              <AccountCircleIcon/>
            </Logo>
          </Tiles>
          <Tiles>
            <LableAndName>
              <Heading>Date of birthday</Heading>
              <Email> {userData.dob} </Email>
            </LableAndName>
            <Logo>
              <CalendarMonthIcon/>
            </Logo>
          </Tiles>
          <Tiles>
            <LableAndName>
              <Heading>Country</Heading>
              <Email>{userData.region}</Email>
            </LableAndName>
            <Logo>
              <LanguageIcon/>
            </Logo>
          </Tiles>
          <Tiles>
            <LableAndName>
              <Heading>Email</Heading>
              <Email>{userData.email}</Email>
            </LableAndName>
            <Logo>
              <EmailIcon/>
            </Logo>
          </Tiles>
        </AccountDetail>
      </ProfileDetails>
    </Container>
  );
};

export default Home;
