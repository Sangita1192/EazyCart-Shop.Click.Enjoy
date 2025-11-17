import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, MenuItem, Select } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import { fetchProduct, updateProduct } from '../api/productApi';
import { showError } from '../services/toastService';
import { showSuccessAlert } from '../../utils/successAlert';

const ProductEdit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { activeCategories, fetchActiveCategories, sizes, fetchSizes, colors, fetchColors } = useContext(GlobalContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [parentCategories, setParentCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [subcategories, setSubcategories] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        sub_category: "",
        price: 0,
        is_featured: false,
        stock: 0,
        discount: 0,
        size: [],
        color: [],
        images: [],
    });

    useEffect(() => {
        fetchActiveCategories();
        fetchColors();
        fetchSizes();
    }, []);

    useEffect(() => {
        getProduct(id);
    }, [id]);

    useEffect(() => {
        setParentCategories(activeCategories.filter((cat) => !cat.parent));
        if (selectedCategory) {
            const subs = activeCategories.filter(cat => cat.parent?._id?.toString() === selectedCategory);
            setSubcategories(subs);
        }
    }, [activeCategories, selectedCategory]);

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

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "Enter a valid price";
        }
        if (selectedImages.length === 0) newErrors.images = "Upload at least one image";

        return newErrors;
    };


    const getProduct = async (id) => {
        try {
            setLoading(true);
            const res = await fetchProduct(id);
            const p = res.data.product;
            setFormData({
                name: p.name || "",
                description: p.description || "",
                category: p.category?._id || "",
                sub_category: p.sub_category?._id || "",
                price: p.price || 0,
                is_featured: p.is_featured || false,
                stock: p.stock || 0,
                discount: p.discount || 0,
                size: p.size?.map((s) => s._id) || [],
                color: p.color?.map((c) => c._id) || [],
                images: p.images || [],
            });
            setSelectedCategory(p.category?._id);
            setSelectedImages(p.images);

            setProduct(p);
        } catch (err) {
            nav('/products/list');
            showError(err.message || "product loading failed");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setSubmitting(true);
        try {
            const form = new FormData();
            // Append text fields
            form.append("name", formData.name);
            form.append("description", formData.description);
            form.append("category", formData.category);
            if (formData.sub_category) form.append("sub_category", formData.sub_category);
            form.append("is_featured", formData.is_featured ? "true" : "false");
            form.append("stock", Number(formData.stock));
            form.append("discount", Number(formData.discount));
            form.append("price", Number(formData.price));


            // Append arrays (size, color)
            formData.size.forEach(size => form.append("size[]", size));
            formData.color.forEach(color => form.append("color[]", color));

            // Append images
            selectedImages.forEach(img => {
                form.append("images", img.file);
            });
            await updateProduct(id,form);
            setFormData({
                name: "",
                description: "",
                category: "",
                sub_category: "",
                price: "",
                is_featured: false,
                stock: 0,
                discount: 0,
                size: [],
                color: [],
            });
            setSelectedImages([]);
            await showSuccessAlert("Success", "The product was successfully updated.");
            nav("/products/list");
        } catch (error) {
           showError(error.message || "Something went wrong");
           nav('/products/list')
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <p className="text-center p-10 text-blue-500">Loading product details...</p>;
    if (!product) return <p className="text-center p-10 text-gray-500">No product found.</p>;

    return (
        <div className="rounded-[8px] my-[15px] border border-gray-200 shadow-lg bg-white p-[30px]">
            <h1 className='text-2xl mb-[35px]'>Edit Product</h1>
            <div className="my-[25px] flex flex-col gap-[5px] relative">
                <label htmlFor="name" className="mb-2 font-semibold">Product Name</label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`bg-gray-100 px-4 py-2 rounded-md focus:outline-blue-600 
    ${errors.name ? "border border-red-500" : "border border-gray-300"}`}
                    placeholder="Product Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            </div>
            <div className="my-[25px] flex flex-col gap-[5px]">
                <label htmlFor="description" className="mb-2 font-semibold">Description</label>
                <textarea className={`bg-gray-100 px-4 py-2 rounded-md focus:outline-blue-600 
    ${errors.description ? "border border-red-500" : "border border-gray-300"}`}
                    placeholder="Product Description"
                    name='description'
                    value={formData.description}
                    required
                    onChange={(e) => { setFormData({ ...formData, description: e.target.value }) }}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>
            <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                {/* Category */}
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="category" className="mb-2 font-semibold">Category</label>
                    <select
                        name="category"
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setFormData({ ...formData, category: e.target.value })
                        }}
                        className={`bg-gray-100 px-4 py-2 rounded-md focus:outline-blue-600 
    ${errors.category ? "border border-red-500" : "border border-gray-300"}`}
                    >
                        <option value="null">---select category---</option>
                        {parentCategories.length > 0 &&
                            parentCategories.map((category) => (
                                <option value={category._id} key={category._id}>{category.name}</option>
                            ))
                        }
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                </div>

                {/* Sub-Category */}
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="subcategory" className="mb-2 font-semibold">Sub-Category</label>
                    <select
                        name="sub_category"
                        id="subcategory"
                        onChange={(e) => { setFormData({ ...formData, sub_category: e.target.value }) }}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                    >
                        <option value="">---select sub-category---</option>
                        {subcategories.length > 0 &&
                            subcategories.map((subcat) => (
                                <option value={subcat._id} key={subcat._id}>{subcat.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="price" className="mb-2 font-semibold">Price</label>
                    <input
                        name="price"
                        id="price"
                        type='number'
                        value={formData.price}
                        required
                        onChange={(e) => { setFormData({ ...formData, price: e.target.value }) }}
                        className={`bg-gray-100 px-4 py-2 rounded-md focus:outline-blue-600 
    ${errors.price ? "border border-red-500" : "border border-gray-300"}`}
                    >
                    </input>
                    {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                </div>
            </div>
            <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="isfeatured" className="mb-2 font-semibold">isFeatured</label>
                    <select
                        name="is_featured"
                        id="isfeatured"
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.value === "true" })}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="stock" className="mb-2 font-semibold">Product Stock</label>
                    <input
                        name="stock"
                        id="stock"
                        type='number'
                        value={formData.stock}
                        onChange={(e) => { setFormData({ ...formData, stock: e.target.value }) }}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                    >
                    </input>
                </div>
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="discount" className="mb-2 font-semibold">Discount</label>
                    <input
                        name="discount"
                        id="discount"
                        value={formData.discount}
                        onChange={(e) => { setFormData({ ...formData, discount: e.target.value }) }}
                        className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] focus:outline-blue-600"
                    >
                    </input>
                </div>
            </div>
            <div className="my-[25px] flex flex-col md:flex-row gap-[15px]">
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="size" className="mb-2 font-semibold">Product Size</label>
                    <Select
                        multiple
                        value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        renderValue={(selected) =>
                            sizes.filter((s) => selected.includes(s._id)).map((s) => s.label).join(", ")
                        }
                    >
                        {sizes.map((size) => (
                            <MenuItem key={size._id} value={size._id}>
                                {size.label}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className="flex flex-col gap-[5px] w-full lg:w-1/2">
                    <label htmlFor="color" className="mb-2 font-semibold">Product Color</label>
                    <Select
                        multiple
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        renderValue={(selected) =>
                            colors
                                ?.filter((c) => selected.includes(c._id))
                                .map((c) => c.name)
                                .join(", ")
                        }
                        className="bg-[#f1f1f1] rounded-md focus:outline-blue-600"
                    >
                        {colors?.map((color) => (
                            <MenuItem key={color._id} value={color._id}>
                                {color.name}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="my-[25px] flex flex-col w-full lg:w-1/2">
                <label htmlFor="images" className="mb-2 font-semibold">Product Images</label>
                <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="bg-[#f1f1f1] rounded-md px-[15px] py-[10px] text-sm focus:outline-blue-600 cursor-pointer"
                />
                {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images}</p>}
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
                    {submitting ? <CircularProgress size={20} color="inherit" /> : 'Edit Product'}
                </Button>
            </div>

        </div>
    );
};

export default ProductEdit;
