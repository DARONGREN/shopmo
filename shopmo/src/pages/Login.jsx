import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { login } from "../redux/apiCalls";
import {mobile} from "../responsive";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/12/Pokemon-Legendary-vs-Mythicals.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick =(e) =>{
    e.preventDefault();
    login(dispatch, { username, password });
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form>
            <Input placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
            <Input placeholder='password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <Button onClick={handleClick} disabled={isFetching}>Login</Button>
            {error && <Error>Something went wrong...</Error>}
            <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}
