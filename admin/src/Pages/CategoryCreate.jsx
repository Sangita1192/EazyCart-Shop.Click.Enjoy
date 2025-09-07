import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { addCategory} from '../api/categoryApi';
import { showSuccessAlert } from '../../utils/successAlert';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { showError, showSuccess } from '../services/toastService';


const CategoryCreate = () => {
  const nav = useNavigate();
  const { activeCategories, fetchActiveCategories } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isFeatured: false,
    status: 'active',
    parent: '',
  });
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    fetchActiveCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prevImages) => [...prevImages, ...newImages]);

  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isFeatured') {
      setFormData({ ...formData, [name]: value === 'true' });
    } else if (name === 'status') {
      setFormData({ ...formData, [name]: value === 'true' ? 'active' : 'inactive' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setErrors({});

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("description", formData.description.trim());
      payload.append("isFeatured", formData.isFeatured);
      payload.append("status", formData.status);
      if (formData.parent.trim() !== "") {
        payload.append("parent", formData.parent);
      }
      selectedImages.forEach((imgObj) => {
        payload.append("images", imgObj.file);
      });

      await addCategory(payload);
      showSuccess("Category created Successfully");

      setFormData({
        name: "",
        description: "",
        isFeatured: "false",
        status: "true",
        parent: "",
      });
      setSelectedImages([]);
      await showSuccessAlert("Category Created", "The category was successfully created.");
      nav("/category/list");
    } catch (error) {
      const apiErrors = error?.response?.data?.errors;
      const errMsg = error?.response?.data?.message || "Something went wrong.";

      if (apiErrors) {
        setErrors(apiErrors);
      } else {
        showError(errMsg);
      }
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
      <h1 className='text-2xl mb-[35px]'>Add Category</h1>
      <form action="" method='post'>
        <div className="my-[25px] flex flex-col gap-[5px] relative">
          <label htmlFor="name" className="mb-2 font-semibold">Category Name</label>
          <input type="text"
            name='name'
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Name" />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="my-[25px] flex flex-col gap-[5px]">
          <label htmlFor="description" className="mb-2 font-semibold">Description</label>
          <textarea name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Description" />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
          <div className="flex flex-col gap-[5px] w-full lg:w-1/3">
            <label className="block mb-2 font-medium">Parent Category (optional)</label>
            <select
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              className="w-full bg-[#f1f1f1] px-4 py-2 rounded-md focus:outline-blue-600"
            >
              <option value="">None</option>
              { activeCategories && 
              activeCategories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.parent && <p className="text-red-600 text-sm mt-1">{errors.parent}</p>}
          </div>

          <div className="flex flex-col gap-[5px] w-full lg:w-1/3">
            <label htmlFor="isFeatured" className="mb-2 font-semibold">isFeatured</label>
            <select
              name="isFeatured"
              id="isFeatured"
              value={formData.isFeatured}
              onChange={handleChange}
              className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="flex flex-col gap-[5px] w-full lg:w-1/3">
            <label htmlFor="status" className="mb-2 font-semibold">Status</label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
            >
              <option value="active">Active</option>
              <option value="inactive">In Active</option>
            </select>
          </div>
        </div>

        <div className="my-[25px] flex flex-col w-full lg:w-1/2">
          <label htmlFor="images" className="mb-2 font-semibold">Category Image</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
          />
          {/* Previews */}
          {selectedImages.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {selectedImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-[100px] h-[100px] rounded-md border border-gray-300"
                >
                  {/* Cancel icon */}
                  <button
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute w-[20px] h-[20px] top-[-5px] right-[-5px] bg-red-500 rounded-full p-1 flex justify-center items-center z-[99] !text-white"
                    title="Remove image"
                  >
                    ✕
                  </button>

                  {/* Image */}
                  <img
                    src={img.url}
                    alt={`Preview ${idx}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

          )}
        </div>

        <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[70%]' >
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="!bg-[#F66C2B] hover:!bg-[#E55B1C] !text-white !capitalize !w-full"
          >
            {submitting ? <CircularProgress size={20} color="inherit" /> : 'Add Category'}
          </Button>
        </div>
      </form>


    </div>
  )
}

export default CategoryCreate