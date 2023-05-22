

import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'

export default function Success() {
    const location = useLocation();
    const data = location.state.stripeData;
    const cart = location.state.cart;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null);
  return (
    <div>Success</div>
  )
}
