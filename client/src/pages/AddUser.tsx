import * as React from 'react'
import Navbar from '../components/Navbar'
import styled from 'styled-components'
import AddDetailsSection from '../components/AddDetailsSection'




const AddUser = () => {
  return (<>
    <Navbar/>
    <Wrapper>
    <AddDetailsSection/>
    </Wrapper>
    </>
   
  )
}

export default AddUser
const Wrapper = styled.div`
  display: flex;
`