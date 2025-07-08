import React, { useEffect } from 'react';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { addAddress, updateAddrss } from '../../Api/api';
import { showError, showSuccess, showWarning } from '../../services/toastService';
import { Button, CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loadUserFromCookies } from '../../redux/slices/authSlice';

const AddEditAddress = ({ existingData = null, onClose, refreshAddressList }) => {
    const isEdit = !!existingData;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        address_line: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: '',
        address_type: 'home',
    });

    useEffect(() => {
        if (isEdit && existingData) {
            setFormData(existingData);
        }
    }, [existingData, isEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        const isDataChanged = () => {
            if (!isEdit) return true; // New data always submit

            const fields = ['address_line', 'city', 'state', 'pincode', 'country', 'phone', 'address_type'];
            return fields.some(field => formData[field] !== (existingData ? existingData[field] : ''));
        };
        if (isEdit && !isDataChanged()) {
            showWarning("No changes detected.");
            onClose?.();
            return; // no API call
        }
        setLoading(true);
        setErrors({});
        try {
            const payload = {
                address_line: formData.address_line,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                country: formData.country,
                phone: formData.phone,
                address_type: formData.address_type,
            };
            let res;
            if (isEdit && existingData?._id) {
                res = await updateAddrss(existingData._id, payload)
            } else {
                res = await addAddress(payload);
            }
            dispatch(loadUserFromCookies());
            await refreshAddressList?.();
            showSuccess(res.data?.message || (isEdit ? "Address updated successfully" : "Address added successfully"));
            onClose?.();
        }
        catch (error) {
            const { message, errors } = error;
            if (errors) {
                setErrors(errors);
                return;
            }
            showError(message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='my-3 pt-3'>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="address_line"
                    name='address_line'
                    value={formData.address_line}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="address_line"
                    className={`absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all
      ${formData.address_line ? '-top-2 text-sm text-blue-600' : 'top-3 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600'}`}
                >
                    Address Line
                </label>
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="city"
                    name='city'
                    value={formData.city}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="city"
                    className={`absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all
      ${formData.city ? '-top-2 text-sm text-blue-600' : 'top-3 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600'}`}
                >
                    City
                </label>
                {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="state"
                    name='state'
                    value={formData.state}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="state"
                    className={`absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all
      ${formData.state ? '-top-2 text-sm text-blue-600' : 'top-3 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600'}`}
                >
                    State
                </label>
                {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="pincode"
                    name='pincode'
                    value={formData.pincode}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="pincode"
                    className={`absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all
      ${formData.pincode ? '-top-2 text-sm text-blue-600' : 'top-3 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600'}`}
                >
                    Pincode
                </label>
                {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    id="country"
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className="peer w-full border border-gray-300 rounded-md px-3 py-3 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <label
                    htmlFor="country"
                    className={`absolute left-3 text-gray-500 text-sm bg-white px-1 transition-all
      ${formData.country ? '-top-2 text-sm text-blue-600' : 'top-3 text-base text-gray-400 peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600'}`}
                >
                    Country
                </label>
            </div>
            <div className='mb-4 flex flex-col'>
                <label htmlFor="Phone" hidden>Phone</label>
                <PhoneInput
                    className='bg-gray-100/70 rounded-md p-[10px] !h-full focus:!outline-none focus:!border-blue-600'
                    international
                    defaultCountry="CA"
                    name="phone"
                    countryCallingCodeEditable={false}
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))} />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className='mb-4 px-2'>
                <label
                    htmlFor="address_type"
                    className='pb-2 block font-medium'
                >
                    Address Type
                </label>
                <div className='flex gap-6 px-3'>
                    <div className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            name="address_type"
                            id="home"
                            value="home"
                            checked={formData.address_type === 'home'}
                            onChange={handleChange}
                        />
                        <label htmlFor="home">Home</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <input
                            type="radio"
                            name="address_type"
                            id="office"
                            value="office"
                            checked={formData.address_type === 'office'}
                            onChange={handleChange}
                        />
                        <label htmlFor="office">Office</label>
                    </div>
                </div>
            </div>
            <Button
                className='!bg-amber-600 !text-white hover:!bg-amber-700 !cursor-pointer sm:!w-[200px] !w-full'
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <CircularProgress size={20} color="inherit" />
                ) : (
                    isEdit ? "Update Address" : "Add Address"
                )}
            </Button>
        </div>
    )
}

export default AddEditAddress;