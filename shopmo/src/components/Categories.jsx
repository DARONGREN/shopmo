import React from 'react'
import styled from 'styled-components'
import { categories } from '../data';
import { mobile } from "../responsive";
import Categoryitem from './Categoryitem';

const Container = styled.div`
display:flex;
padding:20px;
flex-wrap: wrap;
justify-content:left;
${mobile({ padding: "0px", flexDirection:"column" })};
`;

export default function Categories() {
  return (
    <Container>
        {categories.map((item) => (
            <Categoryitem item={item}/>
        ))}
    </Container>
  )
}
