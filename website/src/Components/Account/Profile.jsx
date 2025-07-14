import React, { useState, useRef } from 'react';
import ChangePassword from './ChangePassword';
import { Button, CircularProgress } from '@mui/material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useOutletContext } from 'react-router-dom';
import { updateUserProfile } from '../../Api/api';
import { showError, showSuccess, showWarning } from '../../services/toastService';
import { useDispatch } from 'react-redux';
import { loadUserFromCookies } from '../../redux/slices/authSlice';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { isEqualShallow } from '../../utils/compareData';

const Profile = () => {
    const { user } = useOutletContext() || {};
    const dispatch = useDispatch();

    const initialData = useMemo(() => ({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        profilePicture: user?.profilePicture || '',
    }), [user]);

    const [formData, setFormData] = useState(initialData);

    // Reset form when user changes
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);


    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(user?.profilePicture || '/fallbackUser.webp');
    const [showChangePass, setShowChangePass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL);
            setFormData((prev) => ({ ...prev, profilePicture: file }));
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault(); // Prevent page reload
        if (isEqualShallow(initialData, formData)) {
            showWarning('No changes detected');
            return;
        }

        try {
            setLoading(true);

            // Create FormData and append fields
            const data = new FormData();
            data.append('name', formData.name);
            data.append('email', formData.email);
            data.append('phone', formData.phone);

            // Append profilePicture if it's a File object (new upload)
            if (formData.profilePicture && formData.profilePicture instanceof File) {
                data.append('profilePicture', formData.profilePicture);
            }

            const res = await updateUserProfile(data, user._id);

            if (res?.data?.success) {
                showSuccess(res.data.message || 'User updated successfully');
                dispatch(loadUserFromCookies());
            } else {
                showWarning(res.data.message || 'Invalid details');
            }
        } catch (error) {
            showError(error?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <div className="w-full flex justify-between">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <Button
                        className="!text-amber-600 hover:!bg-amber-600 hover:!text-white !flex !gap-[5px]"
                        onClick={() => setShowChangePass(!showChangePass)}
                    >
                        <span> Change Password </span>
                    </Button>
                </div>

                <form className="w-full mt-[20px]" onSubmit={handleUpdateProfile}>
                    <div className="mb-[20px] flex flex-col mx-3">
                        {/* Profile Picture Preview */}
                        <div
                            className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer hover:opacity-80 transition-all"
                            onClick={handleClick}
                        >
                            <img
                                src={previewImage}
                                alt="Profile Preview"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            name="profilePicture"
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            className="hidden"
                        />
                        <p className="text-sm text-gray-500 mt-2">Click image to update</p>
                    </div>

                    <div className="md:grid grid-cols-2 gap-[25px]">
                        <div className="mb-[15px] flex flex-col">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-[15px] flex flex-col">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="bg-gray-100/70 rounded-md p-[10px] focus:outline-none focus:border focus:border-amber-600"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-[15px] flex flex-col">
                            <label htmlFor="phone">Phone</label>
                            <PhoneInput
                                className="bg-gray-100/70 rounded-md p-[10px] !h-full focus:!outline-none"
                                international
                                defaultCountry="CA"
                                countryCallingCodeEditable={false}
                                value={formData.phone}
                                onChange={(value) => setFormData({ ...formData, phone: value })}
                            />
                        </div>
                    </div>

                    <Button
                        className="!mt-[30px] !bg-amber-600 !text-white hover:!bg-amber-700 !flex !gap-[5px] !w-[180px] !cursor-pointer"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? <CircularProgress size={20} color="inherit" /> : 'Update Profile'}
                    </Button>
                </form>
            </div>

            {showChangePass && <ChangePassword />}
        </>
    );
};

export default Profile;
