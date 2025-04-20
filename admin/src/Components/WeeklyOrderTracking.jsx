import { useState, PureComponent } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WeeklyOrderTracking = () => {
    const [weeklyChart, setWeeklyChart] = useState([
        { day: "Mon", orders: 20, revenue: 400 },
        { day: "Tue", orders: 35, revenue: 700 },
        { day: "Wed", orders: 25, revenue: 500 },
        { day: "Thu", orders: 30, revenue: 600 },
        { day: "Fri", orders: 50, revenue: 1000 },
        { day: "Sat", orders: 60, revenue: 1200 },
        { day: "Sun", orders: 40, revenue: 800 },])
    return (
        <>
            <div className="w-full bg-white bg-white p-4 rounded shadow-lg my-[20px] bg-white">
                <div className="h-[500px] md:h-[400px] ">
                    <h2 className="text-xl font-bold mb-5">Orders & Revenue This Week</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weeklyChart}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="orders" stroke="#8884d8" name="Orders" />
                            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" name="Revenue" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </>
    )
}

export default WeeklyOrderTracking