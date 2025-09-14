import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Divider } from '@mui/material';
import logo from './../../../public/logo.png'
import { FaRegPlusSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { getSubcategories1 } from '../../Api/api';
import { SubCategoryList } from './SubCategoryList';

const SideBar = ({ isSideBarOpen, setIsSidebarOpen }) => {
    const { categories } = useSelector(state => state.category);

    const [expandedCats, setExpandedCats] = useState([])
    const [subCategories, setSubCategories] = useState({})

    const fetchSubCategories = async (id) => {
        try {
            if (expandedCats.includes(id)) {
                setExpandedCats(expandedCats.filter(cid => cid !== id))
                return
            }

            setExpandedCats([...expandedCats, id])

            // fetch only if not already fetched
            if (!subCategories[id]) {
                const res = await getSubcategories1(id)
                setSubCategories((prev) => ({
                    ...prev,
                    [id]: res.data.categories || [],
                }));
                console.log(res);
            }
        } catch (error) {
            console.log('error in fetch subcategory', error.message)
        }
    }
    const handleClose = () => {
        setIsSidebarOpen(false);
    };

    return (
        <Drawer anchor="left" open={isSideBarOpen} onClose={handleClose} className='!h-100vh'>
            <Box sx={{ width: 250 }} role="presentation" >
                <List>
                    <ListItem className='!w-[90%] !m-auto '>
                        <img src={logo} alt="" className='w-full object-fit-contain' />
                    </ListItem>
                    <Divider />
                    {categories.length > 0 && categories.map((cat) => (
                        <ListItem className='!mt-[15px] !block' disablePadding key={cat._id}>
                            <Button className='!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center !capitalize'
                                onClick={() => fetchSubCategories(cat._id)}>
                                <p className='!font-bold'>{cat.name}</p>
                                <FaRegPlusSquare />
                            </Button>
                            {/* subCategories */}
                            {expandedCats.includes(cat._id) && (
                                <SubCategoryList
                                    parentId={cat._id}
                                    subCategories={subCategories}
                                    expandedCats={expandedCats}
                                    setExpandedCats={setExpandedCats}
                                    fetchSubCategories={fetchSubCategories}
                                />
                            )}
                        </ListItem>
                    ))}

                </List>
            </Box>
        </Drawer>
    )
}

export default SideBar