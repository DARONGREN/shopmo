import React from 'react'
import styled from 'styled-components'
import { mobile } from "../responsive";

const Container = styled.div`
width:100vw;
height:100vh;
background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("https://dotesports.com/wp-content/uploads/2022/03/15095811/Arceus-BDSP.jpg?w=1200") center;
display:flex;
background-size: cover;
align-items:center;
justify-content:center;
`;
const Wrapper = styled.div`
padding:20px;
width:40%;
background-color:white;
${mobile({ width: "75%" })};
`;
const Form = styled.form`
display: flex;
flex-wrap: wrap;

`;
const Title = styled.h1`
font-size:24px;
font-weight:300;
`;
const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 20px 10px 0px 0px;
padding: 10px;
`;
const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;
const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`;


export default function Register() {
  return (
    <Container>
      <Wrapper>
        <Title>Create account</Title>
        <Form>
            <Input placeholder='name'/>
            <Input placeholder='last'/>
            <Input placeholder='username'/>
            <Input placeholder='email'/>
            <Input placeholder='password'/>
            <Input placeholder='confirmed password'/>
            <Agreement>By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b></Agreement>
            <Button>Create</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}
