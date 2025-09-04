import DashBoardSlider from "../Components/DashboardSlider";
import RecentOrders from "../Components/RecentOrders"
import Button from "@mui/material/Button";
import ecommerce from "/Images/ecom.webp";
import WeeklyOrderTracking from "../Components/WeeklyOrderTracking";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <>
            <div className="p-4 shadow-lg rounded-[8px] bg-[white]">
                <div className="md:grid grid-cols-4 gap-[15px] items-center">
                    <div className="col-span-3">
                        <h1 className="text-2xl font-bold">Good Morning, <br /> Sangeeta </h1>
                        <p className="py-3 text-xl">Here’s What happening on your store today. See the statistics at once.</p>
                        <Link to="/products/add">
                            <Button className="!bg-[#3B82F6] !text-white hover:!bg-[#2563EB] !my-[15px] !px-[15px] !capitalize">
                                + Add Products
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={ecommerce} alt="ecommerce Image" className="w-[fit-content]" />
                    </div>
                </div>
            </div>
            <div className="p-3 my-[10px]">
                <DashBoardSlider />
            </div>
            <RecentOrders />
            <WeeklyOrderTracking />

        </>
    )
}

export default Dashboard;