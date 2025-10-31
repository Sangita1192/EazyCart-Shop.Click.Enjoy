import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { showError, showSuccess } from '../../services/toastService';
import { useNavigate } from 'react-router-dom';
import { getOrderList } from '../../Api/api';

const Order = () => {
  const nav = useNavigate();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    handlefetchOrders();
  }, []);

  const handlefetchOrders = async () => {
    try {
      const res = await getOrderList();
      setOrderList(res.data.orders);
    }
    catch (error) {
      showError('Error in fetching orders');
      nav('/');
    }
  }
  return (
    <>
      <div className='w-full'>
        <h1 className='text-lg font-semibold'>My Orders</h1>
        <p>There are <span className='text-amber-600 font-bold'>{orderList.length}</span> orders</p>
        <div className='w-full overflow-x-auto my-3 scrollbar-sidebar'>
          <table className="text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Sr No.</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Paymant Id</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Pincode</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
              </tr>

            </thead>
            <tbody>
              {orderList.length > 0 ?
                (
                  orderList.map((order, idx) => (
                    <tr key={order._id} className='hover:bg-amber-600/10 cursor-pointer' onClick={() => nav(`/my-account/orders/${order._id}`)}>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{idx + 1}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order._id}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.payment_id}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.user_id.name}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.delivery_address?.address_line} {order.delivery_address?.city}, {order.delivery_address?.state}, {order.delivery_address?.country} </td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.delivery_address?.pincode}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">${order.total_amt.toFixed(2)}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.user_id.email}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{order.payment_status}</td>
                      <td scope="col" className="px-6 py-3 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()
                      }</td>
                    </tr>
                  ))
                )
                :
                (
                  <tr>
                    <td colSpan="11" className="text-center py-6 text-gray-500">
                      🛍️ No orders yet — start shopping!
                    </td>
                  </tr>
                )}
            </tbody>
          </table>

        </div>
      </div>
    </>
  )
}

export default Order