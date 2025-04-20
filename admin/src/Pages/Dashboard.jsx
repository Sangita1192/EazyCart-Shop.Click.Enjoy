import DashBoardSlider from "../Components/DashboardSlider";
import RecentOrders from "../Components/RecentOrders"
import Button from "@mui/material/Button";
import ecommerce from "/Images/ecom.webp";
import { GoPlus } from "react-icons/go";
import WeeklyOrderTracking from "../Components/WeeklyOrderTracking";

const Dashboard = () => {

    return (
        <>
            <div className="p-4 shadow-lg rounded-[8px] bg-[white]">
                <div className="md:grid grid-cols-4 gap-[15px] items-center">
                    <div className="col-span-3">
                        <h1 className="text-2xl font-bold">Good Morning, <br /> Sangeeta </h1>
                        <p className="py-3 text-xl">Here’s What happening on your store today. See the statistics at once.</p>
                        <Button className="!bg-[#3872FA] !text-white !my-[15px] !px-[15px] !capitalize">
                            + Add Products
                        </Button>
                    </div>
                    <div className="flex justify-center items-center">
                        <img src={ecommerce} alt="ecommerce Image" className="w-[fit-content]" />
                    </div>
                </div>
            </div>
            <div className="p-3 my-[10px]">
                <DashBoardSlider />
            </div>
            <RecentOrders/>
            <WeeklyOrderTracking/>

        </>
    )
}

export default Dashboard;