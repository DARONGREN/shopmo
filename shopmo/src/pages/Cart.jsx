import { Add, Remove } from '@material-ui/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userRequest } from "../requestMethods";
import { clearCart } from '../redux/cartRedux';
import { Link } from 'react-router-dom';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`;
const Wrapper = styled.div`
padding:20px;
${mobile({ padding: "10px" })};
`;
const Title = styled.h1`
font-weight:300;
text-align:center;
`;
const Top = styled.div`
display:flex;
aligh-items:center;
justify-content:space-between;
padding:20px;
`;

const TopButton = styled.button`
padding:10px;
font-weight:600;
cursor:pointer;
border:${props=>props.type === "filled" && "none"};
background-color:${props=>props.type === "filled" ? "black" : "transparent"};
color:${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({ display: "none" })};
`;

const TopText = styled.span`
text-decoration:underline;
cursor:pointer;
margin:0px 10px;
`;

const Bottom = styled.div`
display:flex;
justify-content:space-between;
${mobile({ flexDirection: "column" })};
`;

const Info = styled.div`
flex:3
`;

const Summary = styled.div`
flex:1;
border: 0.5px solid lightgray;
border-radius: 10px;
padding: 20px;
height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
display:flex;
align-items:center;
margin-bottom:20px;
`;

const ProductAmount = styled.div`
font-size:24px;
margin:5px;
${mobile({ margin: "5px 15px" })};
`;

const ProductPrice = styled.div`
font-size:30px;
font-weight:200;
${mobile({ marginBottom: "20px" })};
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

export default function Cart() {
  const cart = useSelector(state=>state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const onToken = (token) => {
    setStripeToken(token);
  };
  const dispatch = useDispatch()
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart, });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);

  const handleclean = () =>{
    //clean the cart
    dispatch(
        clearCart()
    );       
  }
  return (
    <Container>
      <Navbar/>
      <Announcement/>
        <Wrapper>
            <Title>
                BAGPAGE
            </Title>
            <Top>
                <TopButton type="filled"><Link to="/" style={{ color: "inherit", textDecoration: "none" }}>KEEP Shoping</Link></TopButton>
                <TopTexts>
                    <TopText>SHOPING BAG</TopText>
                    <TopText>wishlist BAG</TopText>
                </TopTexts>
                <TopButton type="filled" onClick={handleclean}>CLEAN THE CART</TopButton>
            </Top>
            <Bottom>
                <Info>
                {cart.products.map(product=>(<Product>
                    <ProductDetail>
                        <Image src={product.img}/>
                        <Details>
                            <ProductName><b>Product: </b>{product.title}</ProductName>
                            <ProductId><b>PID: </b>{product._id}</ProductId>
                            <ProductColor color={product.color}/>
                            <ProductSize><b>SIZE: </b>{product.size}</ProductSize>
                        </Details>
                    </ProductDetail>
                    <PriceDetail>
                        <ProductAmountContainer>
                            <Add/>
                            <ProductAmount>{product.quantity}</ProductAmount>
                            <Remove/>
                        </ProductAmountContainer>
                        <ProductPrice>${product.price*product.quantity}</ProductPrice>
                    </PriceDetail>
                </Product>
                ))}
                <Hr/>
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                    <SummaryItemText>Subtotal</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                    <SummaryItemText>Estimated Shipping</SummaryItemText>
                    <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                    <SummaryItemText>Shipping Discount</SummaryItemText>
                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout
                        name="POKEMON Shop"
                        image="https://cdn.costumewall.com/wp-content/uploads/2017/10/nurse-joy.jpg"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={KEY}
                      >
              <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
      <Footer/>
    </Container>
  )
}
