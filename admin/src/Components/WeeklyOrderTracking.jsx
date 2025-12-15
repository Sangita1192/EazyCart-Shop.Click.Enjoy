import { useState, PureComponent, useEffect, useContext } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WeeklyRevenue } from "../api/orderApi";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "../context/AuthContext";

const WeeklyOrderTracking = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [weeklyChart, setWeeklyChart] = useState([]);
    useEffect(() => {
        if (!isLoggedIn) {
            setWeeklyChart([]);
            return;
        }
        fetchWeeklyData();
    }, [isLoggedIn]);

    const fetchWeeklyData = async () => {
        try {
            const res = await WeeklyRevenue();
            setWeeklyChart(res.data.weeklyRevenue);
        } catch (error) {
            console.error("Error loading weekly chart", error);
        }
    };

    return (
        <>
            <div className="w-full bg-white bg-white p-4 rounded shadow-lg my-[20px] bg-white">
                {weeklyChart ?
                    <div className="h-[500px] md:h-[400px] ">
                        <h2 className="text-xl font-bold mb-5">Orders & Revenue By Week</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyChart}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="orders" stroke="#A16517" name="Orders" />
                                <Line type="monotone" dataKey="revenue" stroke="#10542A" name="Revenue" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    :
                    <LoadingSpinner />
                }

            </div>


        </>
    )
}

export default WeeklyOrderTracking