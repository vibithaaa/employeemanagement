import * as React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import SearchSection from '../components/SearchSection'
import Card from '../components/Card'
import { useEffect, useState } from 'react'
import { UserContext } from '../components/UserContext'
import { useContext } from 'react'
import {HashLoader} from 'react-spinners'



const Home = () => {

  const {users}=useContext(UserContext)
  const [loading,setLoading]=useState(true)

  
  useEffect(()=>{
   setTimeout(()=>{
    setLoading(false)
   },3000) 
  },[])


  return (
    <>
    <Navbar/>
    <SearchSection/>
    {loading?<SpinnerWrapper><HashLoader color='#0c7dc3'/> </SpinnerWrapper>:
       <Container>
    {users.map((item)=>(
        <Card user = {item} key={item.Id}/>
    ))}

    </Container>}
    </>
  )
}

export default Home;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
`;