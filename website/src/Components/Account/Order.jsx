import React from 'react'

const Order = () => {
  return (
    <>
      <div className='w-full'>
        <h1 className='text-lg font-semibold'>My Orders</h1>
        <p>There are <span className='text-amber-600 font-bold'>0</span> orders</p>
        <div className='w-full overflow-x-auto my-3 scrollbar-sidebar'>
          <table className="text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Sr No.</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Id</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Paymant Id</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Name</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Phone Number</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Address</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Pincode</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Total Amount</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Email</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">User Id</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Order Status</th>
                <th scope="col" className="px-6 py-3 whitespace-nowrap">Date</th>
              </tr>
              
            </thead>
            <tbody>
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">1</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12345</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">knf541541</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Sangeeta Panwar</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">6942-84431-51</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Vancouver, BC</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">123458</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">$29.23</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">panwarsangeeta@gmail.com</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">nknfl451fef</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Pending</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12/8/2023</td>
              </tr>
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">1</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12345</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">knf541541</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Sangeeta Panwar</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">6942-84431-51</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Vancouver, BC</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">123458</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">$29.23</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">panwarsangeeta@gmail.com</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">nknfl451fef</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Pending</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12/8/2023</td>
              </tr>
              <tr>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">1</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12345</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">knf541541</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Sangeeta Panwar</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">6942-84431-51</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Vancouver, BC</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">123458</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">$29.23</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">panwarsangeeta@gmail.com</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">nknfl451fef</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">Pending</td>
                <td scope="col" className="px-6 py-3 whitespace-nowrap">12/8/2023</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>
    </>
  )
}

export default Order