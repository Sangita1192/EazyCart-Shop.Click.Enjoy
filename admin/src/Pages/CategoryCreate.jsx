import { Button } from '@mui/material';
import React, { useState } from 'react'

const CategoryCreate = () => {
  const [selectedImages, setSelectedImages] = useState([]);

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
  return (
    <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-5">
      <h1 className='text-2xl mb-[35px]'>Add Category</h1>
      <div className="my-[25px] flex flex-col gap-[5px] relative">
        <label htmlFor="name" className="mb-2 font-semibold">Category Name</label>
        <input type="text" className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Name" />
      </div>
      <div className="my-[25px] flex flex-col gap-[5px]">
        <label htmlFor="description" className="mb-2 font-semibold">Description</label>
        <textarea className="bg-[#f1f1f1] px-[15px] py-[10px] rounded-md focus:outline-blue-600" placeholder="Category Description" />
      </div>
      <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
        <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
          <label htmlFor="isfeatured" className="mb-2 font-semibold">isFeatured</label>
          <select
            name="isfeatured"
            id="isfeatured"
            className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
          >
            <option value="none">IsFeatured</option>
            <option value="true">True</option>
            <option value="false">False</option>
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
        <Button className='!bg-blue-600 hover:!bg-blue-700 !text-white !capitalize !w-full'>
          Add Category
        </Button>
      </div>

    </div>
  )
}

export default CategoryCreate