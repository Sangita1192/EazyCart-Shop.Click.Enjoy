import { Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { getCategoryById, getCategoryList, updateCategory } from '../api/categoryApi';
import { showError, showSuccess } from '../../services/toastService';
import { showSuccessAlert } from '../../utils/successAlert';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryEdit = () => {
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isFeatured: false,
    status: 'active',
    parent: '',
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchData();
    document.title = "Edit Category";
  }, [id])

  const fetchData = async () => {
    setLoading(true);
    try {
      const [catListRes, categoryRes] = await Promise.all([
        getCategoryList(),
        getCategoryById(id)
      ]);
      setCategoryList(catListRes.data.categories || []);

      const category = categoryRes.data.category;
      setFormData({
        name: category.name || '',
        description: category.description || '',
        isFeatured: category.isFeatured || false,
        status: category.status || 'active',
        parent: category.parent?._id || '',
      });
      setExistingImages(category.images || []);
    } catch (error) {
      showError("Failed to load category details");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isFeatured') {
      return setFormData((prev) => ({ ...prev, [name]: value === 'true' }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setNewImages((prev) => [...prev, ...updatedImages]);
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => { if (existingImages) console.log('existingImg', existingImages) }, [existingImages])


  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setErrors({});

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("description", formData.description.trim());
      payload.append("isFeatured", formData.isFeatured);
      payload.append("status", formData.status);
      if (formData.parent) payload.append("parent", formData.parent);

      payload.append("existingImages", JSON.stringify(existingImages));

      //append Images
      newImages.forEach((imgObj) => payload.append("images", imgObj.file));

      await updateCategory(id, payload);
      showSuccess("Category updated Successfully");
      await showSuccessAlert("Success, The category was updated")
      nav("/category/list")
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
  };

  return (
    <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
      <h1 className='text-2xl mb-[35px]'>Edit Category</h1>
      {
        loading &&
        <div className="text-center py-10"><CircularProgress /></div>
      }
      <form method='post'>
        {/* Name */}
        <div className="my-[25px] flex flex-col gap-[5px] relative">
          <label htmlFor="name" className="mb-2 font-semibold">Category Name</label>
          <input type="text"
            name='name'
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Name" />
          {errors.name && (
            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
          )}
        </div>
        {/* Description */}
        <div className="my-[25px] flex flex-col gap-[5px]">
          <label htmlFor="description" className="mb-2 font-semibold">Description</label>
          <textarea name='description'
            id='description'
            value={formData.description}
            onChange={handleChange}
            className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Description" />
          {errors.description && (
            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
          )}
        </div>

        {/* Select fields */}
        <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
          <div className="flex flex-col gap-[5px] w-full lg:w-1/3">
            <label className="block mb-2 font-medium">Parent Category</label>
            <select
              name="parent"
              value={formData.parent}
              onChange={handleChange}
              className="w-full bg-[#f1f1f1] px-4 py-2 rounded-md focus:outline-blue-600"
            >
              <option value="">None</option>
              {categoryList.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
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

        {/* Image upload */}
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

          <div className="mt-4 flex gap-4 flex-wrap">
            {/* Existing images */}
            {existingImages.length > 0 &&
              existingImages.map((url, idx) => (
                <div key={idx}
                  className="relative w-[100px] h-[100px] rounded-md border border-gray-300"
                >
                  <button
                    onClick={() => removeExistingImage(idx)}
                    className="absolute w-[20px] h-[20px] top-[-5px] right-[-5px] bg-red-500 rounded-full p-1 flex justify-center items-center z-[99] !text-white"
                    title="Remove image"
                  >
                    ✕
                  </button>
                  <img src={url} className="w-full h-full object-cover" alt={`existing-${idx}`} />
                </div>
              ))}
            {/* New images */}
            {newImages.map((imgObj, idx) => (
              <div key={`new-${idx}`} className="relative w-[100px] h-[100px] rounded-md border border-gray-300">
                <button
                  type="button"
                  onClick={() => removeNewImage(idx)}
                  className="absolute w-[20px] h-[20px] top-[-5px] right-[-5px] bg-red-500 rounded-full p-1 flex justify-center items-center z-[99] !text-white"
                >
                  ✕
                </button>
                <img src={imgObj.url} className="w-full h-full object-cover" alt={`new-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="!bg-blue-600 hover:!bg-blue-700 !text-white !w-full"
          >
            {submitting ? <CircularProgress size={20} color="inherit" /> : 'Update Category'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryEdit