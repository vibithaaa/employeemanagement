import * as React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
} from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleFwd = () => {
    navigate(+1);
  };

  return (
    <Container>
      <Left>
        <ArrowCircleLeftOutlined
          style={{ color: "white", fontSize: "2em" }}
          onClick={handleBack}
        />
      </Left>
      <Center>
        <Title> <Link to="/" style={{textDecoration:'none',color:'white'}}>HR Portal</Link></Title>
      </Center>
      <Right>
        <ArrowCircleRightOutlined
          style={{ color: "white", fontSize: "2em" }}
          onClick={handleFwd}
        />
      </Right>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  background-color: #1da1f2;
  padding: 10px;
  max-width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-evenly;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
`;
const Center = styled.div`
  flex: 5;
  display: flex;
`;

const Right = styled.div`
  display: flex;
  justify-content: end;
  flex: 1;
`;

const Title = styled.h2`
  color: white;
  margin: 0px 20px;
  width: 100%;
  font-family: "Karla", sans-serif;
  font-weight: 800;
  text-align: center;
`;