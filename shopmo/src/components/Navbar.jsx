import React from 'react'
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from 'styled-components'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../redux/apiCalls';

// use style component vs css
const Container = styled.div`
height:60px;
background-color:pink;
${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
padding: 10px 20px;
display:flex;
align-items: center;
justify-content: space-between;
${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
flex:1;
display: flex;
align-items: center;
`;

const Language = styled.span`
font-size:14px;
cursor:pointer;
${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
border: 0.5px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`;

const Input = styled.input`
border:none;
${mobile({ width: "50px" })};
`;

const Logo = styled.h1`
font=weight:bold;
${mobile({ fontSize: "24px" })};
`;

const Center = styled.div`
flex:1;
text-align:center;
`;
const Right = styled.div`
flex:1;
display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-right: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

export default function Navbar() {

  const quantity = useSelector(state => state.cart.quantity)
  const { currentUser } = useSelector(state => state.user)


  const dispatch = useDispatch();
  const handleLogout =(e) =>{
    e.preventDefault();
    signout(dispatch);
  }
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>LOGOHERE</Language>
                <SearchContainer>
                    <Input placeholder='search'/>
                    <Search style={{ color: "gray", fontSize: 16 }} />
                </SearchContainer>
            </Left>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            <Center>
                <Logo>PokeMon Center.</Logo>
            </Center>
            </Link>
            <Right>
                {!currentUser ? <><MenuItem>REGISTER</MenuItem>
                
                <MenuItem>
                  <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}>SIGN IN</Link>               
                </MenuItem></>
                : 
                <><MenuItem onClick={handleLogout}>logout</MenuItem>
                {currentUser.username}
                <Link to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                    </Badge>
                </MenuItem>
                </Link></>}
            </Right>
        </Wrapper>
        
    </Container>
  )
}
