import * as React from 'react'
import styled from 'styled-components';
import { Link,useNavigate} from "react-router-dom"


interface TabProps{
  userId:string;
}

const Tab:React.FC<TabProps>= ({userId}) => {
    const navigate =useNavigate();

    const handleBack = ()=>{
        navigate(-1);

    }; 
  return (
    <>
    <Container>
      
      <Left>
      <Link to={`/profile/${userId}`}>
     
     <PageTitle>Profile</PageTitle>
   
     </Link> 
      </Left>

      <Right>
      <Link to={`/profile/documents/${userId}`}>
     
     <Document>Document</Document>
   </Link>
      

      </Right>



      
       
     
       
    </Container>
    </>
    
  )
}

export default Tab;

const Container= styled.div`
display: flex;
margin:10px;


`

const PageTitle=styled.button`
  margin-left: 20px;
  color:white;
 background-color:#1da1f2;
  padding: 10px 100px;
  border: none;

`
const Document= styled.button`
  margin-left: 20px;
  color:white;
 background-color:#1da1f2;
  padding: 10px 100px;
border: none;
  
`

const Right= styled.div`
flex: 1;
  
`
const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`