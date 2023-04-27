import { useState, ChangeEvent } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { User, UserContext } from "./UserContext"
import Card from "./Card";

const SearchSection = (): JSX.Element => {
  const { users } = useContext(UserContext);
  const [searchValue, setSearchValue] = useState<string>("");

  const filteredUsers: User[] = users.filter((user) =>
    user.Title?.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Container>
        <SearchContainer>
          <SearchInput
            placeholder="search"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Link to="/adduser">
            <AddUser>Add User</AddUser>
          </Link>
        </SearchContainer>

        <CardContainer>
          {searchValue && filteredUsers.map((user) => <Card user={user} />)}
        </CardContainer>
        {searchValue && <hr />}
      </Container>
    </>
  );
};

export default SearchSection;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CardContainer = styled.div`
  display: flex;
`;

const SearchContainer = styled.div`
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
`;



const SearchInput = styled.input`
  height: 30px;
  width: 300px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 5px;
  padding-left: 5px;
  ::placeholder{
    color: white;
  }
`;

const AddUser = styled.button`
  height: 30px;
  border: none;
  color: white;
  background: #00a6ff;
  padding: 0px 10px;
  border-radius: 5px;
  &:hover {
    background-color: #0089d3;
  }
`;

    

