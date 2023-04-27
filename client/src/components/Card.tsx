import * as React from "react";
import styled from "styled-components";
import { UserContext } from "./UserContext";
import { User } from "./UserContext";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  width: 290px;
  height: 280px;
  box-shadow: 2px 2px 5px  #1da1f2;
  
  margin: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 15px;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid;
  border-radius: 50px;
  object-fit: cover;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  margin: 0px 10px;
  align-items: center;
`;

const Details = styled.span`
  margin-bottom: 15px;
  font-size: 18px;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface CardProps {
  user: User;
}

const Card: React.FC<CardProps> = ({ user }) => {


  return (
    <Link
            to={`/profile/${user.Id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
    <CardContainer>
      <ImageContainer>
        {user.ImageUrl ? (
          <Image src={user.ImageUrl} />
        ) : (
          <Image src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />
        )}
      </ImageContainer>
      <DetailsContainer>
        <Details>Name : {user.Title}</Details>
        <Details>Designation : {user.designation}</Details>
        <Details>Email : {user.email}</Details>
     
       
      </DetailsContainer>
    </CardContainer>
    </Link>
  );
};

export default Card;

