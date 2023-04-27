import * as React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { User, UserContext } from "../components/UserContext";
import { useContext, useState } from "react";
import styled from "styled-components";
import Tabs from "../components/Tab";
import Swal from "sweetalert2";
import axios from "axios";

const Profile = () => {
  const { users, updateUser, deleteUser } = useContext(UserContext); //change
  const { userId } = useParams<{ userId: any }>();
  const [isEditing, setIsEditing] = useState(false);
  const [Id] = useState<number>(parseInt(userId)); //change
  const [name, setName] = useState<string>();
  const [designation, setDesignation] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [city, setCity] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [dob, setDob] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const userProfile: User[] = users.filter(
    (user) => user.Id?.toString() === userId
  );

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.put(
        `http://localhost:3001/api/image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("Image uploaded");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const updatedUser = {
      Id,
      Title: name,
      Email: email,
      Designation: designation,
      City:city,
      Phone: phone,
      Gender: gender,
      DOB: dob,
    };
    try {
      const response = updateUser(updatedUser);
      console.log(response);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handelDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deleteUser(Id);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          navigate("/");
        } catch {}
      }
    });
  };

  return (
    <>
      <Navbar />
      <Tabs userId={userId} />
      <Container>
        {isEditing ? (
          <>
            {userProfile.map((user) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <ImageContainer>
                    {user.ImageUrl ? (
                      <>
                        <Image src={user.ImageUrl} />
                        <input
                          type="file"
                          style={{ width: "85px", marginRight: "35px" }}
                          onChange={handleFileSelect}
                        />
                        {selectedFile && selectedFile.name}
                        <div>
                          <UploadButton onClick={handleImageUpload}>
                            Upload Image
                          </UploadButton>
                        </div>
                      </>
                    ) : (
                      <>
                        <Image src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" />
                        <input
                          type="file"
                          style={{ width: "85px", marginRight: "35px" }}
                          onChange={handleFileSelect}
                        />
                        {selectedFile && selectedFile.name}
                        <div>
                          <UploadButton onClick={handleImageUpload}>
                            Upload Image
                          </UploadButton>
                        </div>
                      </>
                    )}
                  </ImageContainer>
                  <DetailsContainer>
                    <table key={user.Id}>
                      <tr>
                        <Td>Name</Td>
                        <Td>
                          <Input
                            type="text"
                            defaultValue={user.Title}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Td>Email</Td>
                        <Td>
                          <Input
                            type="text"
                            defaultValue={user.email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Td>Designation</Td>
                        <Td>
                          <Input
                            type="text"
                            defaultValue={user.designation}
                            onChange={(e) => {
                              setDesignation(e.target.value);
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Td>City</Td>
                        <Td>
                          <Input
                            type="text"
                            defaultValue={user.City}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Td>Phone no</Td>
                        <Td>
                          <Input
                            type="text"
                            defaultValue={user.Phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </Td>
                      </tr>
                      <tr>
                        <Td>Gender</Td>
                        <Td>
                          <input
                            type="radio"
                            value="Male"
                            checked={gender === "Male"}
                            onChange={(e) => setGender(e.target.value)}
                            required
                          />
                          Male
                          <input
                            type="radio"
                            value="Female"
                            required
                            checked={gender === "Female"}
                            onChange={(e) => setGender(e.target.value)}
                          />
                          Female
                        </Td>
                      </tr>
                      <tr>
                        <Td>Date of birth</Td>
                        <Td>
                          <input
                            type="date"
                            defaultValue={user.DOB}
                            onChange={(e) => {
                              setDob(e.target.value);
                            }}
                          />
                        </Td>
                      </tr>
                    </table>
                    <div>
                      <SaveButton type="submit">Save</SaveButton>

                      <CancelButton
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setSelectedFile(null);
                        }}
                      >
                        Cancel
                      </CancelButton>
                    </div>
                  </DetailsContainer>
                </Form>
              </>
            ))}
          </>
        ) : (
          <>
            {userProfile.map((user) => (
              <>
                <NotEditingImageContainer>
                  {user.ImageUrl ? (
                    <Image src={user.ImageUrl} />
                  ) : (
                    <Image src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg" />
                  )}
                </NotEditingImageContainer>
                <DetailsContainer>
                  <table key={user.Id}>
                    <tr>
                      <Td>Name</Td> <Td>: {user.Title}</Td>
                    </tr>
                    <tr>
                      <Td>Email</Td> <Td>: {user.email}</Td>
                    </tr>
                    <tr>
                      <Td>Designation</Td> <Td>: {user.designation}</Td>
                    </tr>
                    <tr>
                      {user.City && (
                        <>
                          <Td>Place</Td>
                          <Td>: {user.City}</Td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {user.Phone && (
                        <>
                          <Td>Phone no</Td> <Td>: {user.Phone}</Td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {user.Gender && (
                        <>
                          <Td>Gender</Td> <Td>: {user.Gender}</Td>
                        </>
                      )}
                    </tr>
                    <tr>
                      {user.DOB && (
                        <>
                          <Td>Gender</Td> <Td>: {user.DOB}</Td>
                        </>
                      )}
                    </tr>
                  </table>
                  <div>
                    <EditButton
                      onClick={() => {
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </EditButton>

                    <DeleteButton type="button" onClick={handelDelete}>
                      Delete
                    </DeleteButton>
                  </div>
                </DetailsContainer>
              </>
            ))}
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex: 1;
  flex-direction: column;
  align-items: end;
`;
const NotEditingImageContainer = styled.div`
  display: flex;
  margin-top: 20px;
  flex: 1;
  justify-content: end;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 10px 10px 0px;
`;
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  flex: 1;
  align-items: start;
`;

const Input = styled.input`
  font-size: 15px;
`;

const Td = styled.td`
  font-size: 18px;
`;

const Form = styled.form`
  display: flex;
  flex: 1;
  justify-content: right;
`;

const UploadButton = styled.button`
  background-color: #099d09;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin: 5px 28px 5px 5px;

  color: white;
`;
const EditButton = styled.button`
  background-color: #099d09;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin: 5px 28px 5px 5px;

  color: white;
`;
const DeleteButton = styled.button`
  background-color: #cd0c0c;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin: 5px 28px 5px 5px;

  color: white;
`;
const CancelButton = styled.button`
  background-color: #0d70cd;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin: 5px 28px 5px 5px;

  color: white;
`;

const SaveButton = styled.button`
  background-color: #099d09;
  border: none;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  margin: 5px 28px 5px 5px;
  color: white;
`;

export default Profile;