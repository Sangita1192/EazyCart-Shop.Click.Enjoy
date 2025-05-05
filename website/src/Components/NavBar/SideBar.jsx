import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button, Divider } from '@mui/material';
import logo from './../../../public/logo.png'
import { FaRegPlusSquare } from 'react-icons/fa';

const SideBar = ({ isSideBarOpen, setIsSidebarOpen }) => {
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
                    <ListItem className='!mt-[15px] !block' disablePadding>
                        <Button className='!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center'>
                            <p className='!font-bold'>Fashion</p>
                            <FaRegPlusSquare onClick={() => setSubListOpen(!isSubListOpen)} />
                        </Button>
                            <List className="!w-[90%] !ml-auto !p-0">
                                <ListItem className='!block' disablePadding>
                                    <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                        <p className="!font-bold">Men</p>
                                        <FaRegPlusSquare onClick={() => setIsMenOpen(prev => !prev)}/>
                                    </Button>
                                        <List className="!w-[90%] !ml-auto !p-0">
                                            <ListItem disablePadding>
                                                <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                                    <p className="!text-black-600">Shirt</p>                                                   
                                                </Button>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                                    <p className="!text-black-600">Jackets</p>                                                   
                                                </Button>
                                            </ListItem>
                                            <ListItem disablePadding>
                                                <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                                    <p className="!text-black-600">Pants</p>                                                   
                                                </Button>
                                            </ListItem>
                                        </List>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                        <p className="!font-bold">Women</p>
                                        <FaRegPlusSquare />
                                    </Button>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Button className="!w-full !p-[10px] !px-[15px] !flex !justify-between !items-center">
                                        <p className="!font-bold">Kids</p>
                                        <FaRegPlusSquare />
                                    </Button>
                                </ListItem>
                            </List>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}

export default SideBar