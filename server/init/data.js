import mongoose from "mongoose";

const mainCategory = [
  {
    "name": "Fashion",
    "slug": "fashion",
    "images": ["https://images.unsplash.com/photo-1521335629791-ce4aec67dd47"],
    "description": "Trendy fashion for men, women and kids.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "images": ["https://images.unsplash.com/photo-1518779578993-ec3579fee39f"],
    "description": "Latest gadgets, phones, and accessories.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "images": ["https://images.unsplash.com/photo-1616627781332-d788cb9fdd1f"],
    "description": "Furniture, kitchen appliances and décor.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Groceries",
    "slug": "groceries",
    "images": ["https://images.unsplash.com/photo-1504674900247-0877df9cc836"],
    "description": "Everyday essentials and organic items.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Beauty & Health",
    "slug": "beauty-health",
    "images": ["https://images.unsplash.com/photo-1500835556837-99ac94a94552"],
    "description": "Skin care, cosmetics and health products.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Accessories",
    "slug": "accessories",
    "images": ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
    "description": "Bags, wallets, jewelry and more.",
    "isFeatured": false,
    "status": "active"
  }
];

const subcategories = [
  // Fashion
  {
    name: "Men's Clothing",
    slug: "mens-clothing",
    images: ["https://images.unsplash.com/photo-1521335629791-ce4aec67dd47"],
    parent: "68c49c89469acca0bc65e3be",
    description: "Stylish and trendy clothing for men.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Women's Clothing",
    slug: "womens-clothing",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"],
    parent: "68c49c89469acca0bc65e3be",
    description: "Fashionable outfits for women.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Kids' Clothing",
    slug: "kids-clothing",
    images: ["https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"],
    parent: "68c49c89469acca0bc65e3be",
    description: "Trendy clothes for kids and teens.",
    isFeatured: false,
    status: "active"
  },

  // Electronics
  {
    name: "Mobile Phones",
    slug: "mobile-phones",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"],
    parent: "68c49c89469acca0bc65e3bf",
    description: "Latest smartphones and mobile devices.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Laptops",
    slug: "laptops",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    parent: "68c49c89469acca0bc65e3bf",
    description: "Laptops for work, gaming and study.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Electronics Accessories",
    slug: "electronics-accessories",
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
    parent: "68c49c89469acca0bc65e3bf",
    description: "Chargers, cables, headphones and more.",
    isFeatured: false,
    status: "active"
  },

  // Home & Kitchen
  {
    name: "Furniture",
    slug: "furniture",
    images: ["https://images.unsplash.com/photo-1615874959474-d609969a20ed"],
    parent: "68c49c89469acca0bc65e3c0",
    description: "Comfortable and stylish furniture.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Kitchen Appliances",
    slug: "kitchen-appliances",
    images: ["https://images.unsplash.com/photo-1606813909025-7f84e2fb3e3f"],
    parent: "68c49c89469acca0bc65e3c0",
    description: "Modern appliances for every kitchen.",
    isFeatured: true,
    status: "active"
  },

  // Groceries
  {
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    images: ["https://images.unsplash.com/photo-1576402187873-2f6a1a85d095"],
    parent: "68c49c89469acca0bc65e3c1",
    description: "Fresh and organic produce.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Dairy & Bakery",
    slug: "dairy-bakery",
    images: ["https://images.unsplash.com/photo-1600185365526-4d1b4a963a3f"],
    parent: "68c49c89469acca0bc65e3c1",
    description: "Milk, bread, cakes and more.",
    isFeatured: false,
    status: "active"
  },

  // Beauty & Health
  {
    name: "Skincare",
    slug: "skincare",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
    parent: "68c49c89469acca0bc65e3c2",
    description: "Lotions, serums and face creams.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Makeup",
    slug: "makeup",
    images: ["https://images.unsplash.com/photo-1522337660859-02fbefca4702"],
    parent: "68c49c89469acca0bc65e3c2",
    description: "Lipsticks, foundations and more.",
    isFeatured: false,
    status: "active"
  },

  // Accessories
  {
    name: "Bags & Wallets",
    slug: "bags-wallets",
    images: ["https://images.unsplash.com/photo-1620799139834-6b8e7e1f6a7c"],
    parent: "68c49c89469acca0bc65e3c3",
    description: "Trendy bags, backpacks and wallets.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Jewelry",
    slug: "jewelry",
    images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
    parent: "68c49c89469acca0bc65e3c3",
    description: "Necklaces, rings and more.",
    isFeatured: true,
    status: "active"
  }
]

const subcategories2 =[
  // Under Men's Clothing
  {
    name: "Shirts",
    slug: "shirts",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"],
    parent: "68c49e5d095adac673cd69b9",
    description: "Casual and formal shirts.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Trousers",
    slug: "trousers",
    images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3d3a"],
    parent: "68c49e5d095adac673cd69b9",
    description: "Comfortable trousers and pants.",
    isFeatured: false,
    status: "active"
  },

  // Under Women's Clothing
  {
    name: "Dresses",
    slug: "dresses",
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
    parent: "68c49e5d095adac673cd69ba",
    description: "Elegant and trendy dresses.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Tops",
    slug: "tops",
    images: ["https://images.unsplash.com/photo-1520974735194-16a2c1f1c6b6"],
    parent: "68c49e5d095adac673cd69ba",
    description: "Fashionable tops and blouses.",
    isFeatured: false,
    status: "active"
  },

  // Under Kids' Clothing
  {
    name: "T-Shirts",
    slug: "kids-tshirts",
    images: ["https://images.unsplash.com/photo-1520975918318-1a43c508d9a7"],
    parent: "68c49e5d095adac673cd69bb",
    description: "Casual T-shirts for kids.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Shorts",
    slug: "kids-shorts",
    images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246"],
    parent: "68c49e5d095adac673cd69bb",
    description: "Comfortable shorts for children.",
    isFeatured: false,
    status: "active"
  },

  // Under Mobile Phones
  {
    name: "iPhone",
    slug: "iphone",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
    parent: "68c49e5d095adac673cd69bc",
    description: "Apple iPhones.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Samsung",
    slug: "samsung",
    images: ["https://images.unsplash.com/photo-1518770660439-4636190af475"],
    parent: "68c49e5d095adac673cd69bc",
    description: "Samsung Galaxy series.",
    isFeatured: false,
    status: "active"
  },

  // Under Laptops
  {
    name: "Gaming Laptops",
    slug: "gaming-laptops",
    images: ["https://images.unsplash.com/photo-1587202372775-0c9d786de7d7"],
    parent: "68c49e5d095adac673cd69bd",
    description: "High-performance laptops for gaming.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Ultrabooks",
    slug: "ultrabooks",
    images: ["https://images.unsplash.com/photo-1587202372775-0c9d786de7d7"],
    parent: "68c49e5d095adac673cd69bd",
    description: "Slim and portable ultrabooks.",
    isFeatured: false,
    status: "active"
  },

  // Under Electronics Accessories
  {
    name: "Chargers",
    slug: "chargers",
    images: ["https://images.unsplash.com/photo-1585079548684-2066e4e05d51"],
    parent: "68c49e5d095adac673cd69be",
    description: "Mobile and laptop chargers.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Headphones",
    slug: "headphones",
    images: ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"],
    parent: "68c49e5d095adac673cd69be",
    description: "Wired and wireless headphones.",
    isFeatured: false,
    status: "active"
  },

  // Under Furniture
  {
    name: "Sofas",
    slug: "sofas",
    images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7"],
    parent: "68c49e5d095adac673cd69bf",
    description: "Comfortable sofas for living room.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Beds",
    slug: "beds",
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a"],
    parent: "68c49e5d095adac673cd69bf",
    description: "Modern beds and frames.",
    isFeatured: false,
    status: "active"
  },

  // Under Kitchen Appliances
  {
    name: "Microwave Ovens",
    slug: "microwave-ovens",
    images: ["https://images.unsplash.com/photo-1600185365526-4d1b4a963a3f"],
    parent: "68c49e5d095adac673cd69c0",
    description: "Microwaves for quick cooking.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Blenders",
    slug: "blenders",
    images: ["https://images.unsplash.com/photo-1600185365526-4d1b4a963a3f"],
    parent: "68c49e5d095adac673cd69c0",
    description: "Blenders for smoothies and shakes.",
    isFeatured: false,
    status: "active"
  },

  // Under Fruits & Vegetables
  {
    name: "Fresh Fruits",
    slug: "fresh-fruits",
    images: ["https://images.unsplash.com/photo-1576402187873-2f6a1a85d095"],
    parent: "68c49e5d095adac673cd69c1",
    description: "Seasonal and imported fruits.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Fresh Vegetables",
    slug: "fresh-vegetables",
    images: ["https://images.unsplash.com/photo-1576858692830-3dd11b245f4a"],
    parent: "68c49e5d095adac673cd69c1",
    description: "Leafy greens and vegetables.",
    isFeatured: false,
    status: "active"
  },

  // Under Dairy & Bakery
  {
    name: "Milk",
    slug: "milk",
    images: ["https://images.unsplash.com/photo-1600185365526-4d1b4a963a3f"],
    parent: "68c49e5d095adac673cd69c2",
    description: "Fresh milk and dairy products.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Bread & Cakes",
    slug: "bread-cakes",
    images: ["https://images.unsplash.com/photo-1600185365526-4d1b4a963a3f"],
    parent: "68c49e5d095adac673cd69c2",
    description: "Freshly baked bread and cakes.",
    isFeatured: false,
    status: "active"
  },

  // Under Skincare
  {
    name: "Face Creams",
    slug: "face-creams",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
    parent: "68c49e5d095adac673cd69c3",
    description: "Hydrating and anti-aging creams.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Serums",
    slug: "serums",
    images: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"],
    parent: "68c49e5d095adac673cd69c3",
    description: "Vitamin C, Hyaluronic acid and more.",
    isFeatured: false,
    status: "active"
  },

  // Under Makeup
  {
    name: "Lipsticks",
    slug: "lipsticks",
    images: ["https://images.unsplash.com/photo-1522337660859-02fbefca4702"],
    parent: "68c49e5d095adac673cd69c4",
    description: "Matte and glossy lipsticks.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Foundations",
    slug: "foundations",
    images: ["https://images.unsplash.com/photo-1522337660859-02fbefca4702"],
    parent: "68c49e5d095adac673cd69c4",
    description: "Liquid and powder foundations.",
    isFeatured: false,
    status: "active"
  },

  // Under Bags & Wallets
  {
    name: "Handbags",
    slug: "handbags",
    images: ["https://images.unsplash.com/photo-1620799139834-6b8e7e1f6a7c"],
    parent: "68c49e5d095adac673cd69c5",
    description: "Stylish handbags.",
    isFeatured: false,
    status: "active"
  },
  {
    name: "Wallets",
    slug: "wallets",
    images: ["https://images.unsplash.com/photo-1620799139834-6b8e7e1f6a7c"],
    parent: "68c49e5d095adac673cd69c5",
    description: "Leather wallets for men and women.",
    isFeatured: false,
    status: "active"
  },

  // Under Jewelry
  {
    name: "Necklaces",
    slug: "necklaces",
    images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
    parent: "68c49e5d095adac673cd69c6",
    description: "Gold, silver and fashion necklaces.",
    isFeatured: true,
    status: "active"
  },
  {
    name: "Rings",
    slug: "rings",
    images: ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
    parent: "68c49e5d095adac673cd69c6",
    description: "Engagement, wedding and fashion rings.",
    isFeatured: false,
    status: "active"
  }
];


const bannerData = [
  {
    "title": "summer sale 2025",
    "description": "Enjoy up to 50% off on summer collections.",
    "image": "https://source.unsplash.com/1200x400/?summer-sale",
    "link": "/category/mens-clothing",
    "startDate": "2025-06-01T00:00:00Z",
    "endDate": "2025-06-30T23:59:59Z",
    "isActive": true,
    "bannerType": "slider",
    "order": 1
  },
  {
    "title": "new arrivals women",
    "description": "Check out the latest fashion trends for women.",
    "image": "https://source.unsplash.com/1200x400/?womens-fashion",
    "link": "/category/womens-clothing",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2025-09-30T23:59:59Z",
    "isActive": true,
    "bannerType": "slider",
    "order": 2
  },
  {
    "title": "electronics deals",
    "description": "Smartphones, laptops, and gadgets at unbeatable prices.",
    "image": "https://source.unsplash.com/1200x400/?electronics-sale",
    "link": "/category/electronics",
    "startDate": "2025-09-05T00:00:00Z",
    "endDate": "2025-09-20T23:59:59Z",
    "isActive": true,
    "bannerType": "slider",
    "order": 3
  },
  {
    "title": "back to school",
    "description": "Stationery, bags, and essentials for students.",
    "image": "https://source.unsplash.com/1200x400/?school-supplies",
    "link": "/category/books",
    "startDate": "2025-08-15T00:00:00Z",
    "endDate": "2025-09-15T23:59:59Z",
    "isActive": true,
    "bannerType": "middle",
    "order": 1
  },
  {
    "title": "fitness gear",
    "description": "Sportswear, shoes, and gym equipment for all athletes.",
    "image": "https://source.unsplash.com/1200x400/?fitness",
    "link": "/category/sports-outdoors",
    "startDate": "2025-07-01T00:00:00Z",
    "endDate": "2025-07-31T23:59:59Z",
    "isActive": true,
    "bannerType": "middle",
    "order": 2
  },
  {
    "title": "beauty fest",
    "description": "Upto 40% off on skincare and personal care products.",
    "image": "https://source.unsplash.com/1200x400/?beauty-products",
    "link": "/category/beauty-personal-care",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2025-09-15T23:59:59Z",
    "isActive": true,
    "bannerType": "middle",
    "order": 3
  },
  {
    "title": "furniture clearance",
    "description": "Massive discounts on home and office furniture.",
    "image": "https://source.unsplash.com/1200x400/?furniture-sale",
    "link": "/category/furniture",
    "startDate": "2025-09-10T00:00:00Z",
    "endDate": "2025-09-25T23:59:59Z",
    "isActive": true,
    "bannerType": "card",
    "order": 1
  },
  {
    "title": "grocery essentials",
    "description": "Fresh groceries delivered to your door at low prices.",
    "image": "https://source.unsplash.com/1200x400/?groceries",
    "link": "/category/groceries",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2025-09-30T23:59:59Z",
    "isActive": true,
    "bannerType": "card",
    "order": 2
  },
  {
    "title": "kids toys fair",
    "description": "Educational and fun toys for all age groups.",
    "image": "https://source.unsplash.com/1200x400/?kids-toys",
    "link": "/category/toys-games",
    "startDate": "2025-09-05T00:00:00Z",
    "endDate": "2025-09-25T23:59:59Z",
    "isActive": true,
    "bannerType": "card",
    "order": 3
  },
  {
    "title": "winter collection",
    "description": "Stay cozy with our new winter jackets and sweaters.",
    "image": "https://source.unsplash.com/1200x400/?winter-fashion",
    "link": "/category/mens-clothing",
    "startDate": "2025-11-01T00:00:00Z",
    "endDate": "2025-11-30T23:59:59Z",
    "isActive": true,
    "bannerType": "slider",
    "order": 4
  },
  {
    "title": "jewelry trends",
    "description": "Discover elegant and timeless jewelry pieces.",
    "image": "https://source.unsplash.com/1200x400/?jewelry",
    "link": "/category/jewelry-accessories",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2025-09-20T23:59:59Z",
    "isActive": true,
    "bannerType": "card",
    "order": 4
  },
  {
    "title": "mega diwali sale",
    "description": "Celebrate with discounts on fashion, electronics, and more.",
    "image": "https://source.unsplash.com/1200x400/?festival-sale",
    "link": "/category/electronics",
    "startDate": "2025-10-20T00:00:00Z",
    "endDate": "2025-10-30T23:59:59Z",
    "isActive": true,
    "bannerType": "slider",
    "order": 5
  }
];

const sizeData = [
  {
    "name": "extra small",
    "label": "XS"
  },
  {
    "name": "small",
    "label": "S"
  },
  {
    "name": "medium",
    "label": "M"
  },
  {
    "name": "large",
    "label": "L"
  },
  {
    "name": "extra large",
    "label": "XL"
  },
  {
    "name": "double extra large",
    "label": "XXL"
  },
  {
    "name": "triple extra large",
    "label": "XXXL"
  },
  {
    "name": "28",
    "label": "28"
  },
  {
    "name": "30",
    "label": "30"
  },
  {
    "name": "32",
    "label": "32"
  },
  {
    "name": "34",
    "label": "34"
  },
  {
    "name": "36",
    "label": "36"
  }
];

const colorData = [
  {
    "name": "red",
    "code": "#FF0000"
  },
  {
    "name": "blue",
    "code": "#0000FF"
  },
  {
    "name": "green",
    "code": "#008000"
  },
  {
    "name": "yellow",
    "code": "#FFFF00"
  },
  {
    "name": "black",
    "code": "#000000"
  },
  {
    "name": "white",
    "code": "#FFFFFF"
  },
  {
    "name": "orange",
    "code": "#FFA500"
  },
  {
    "name": "purple",
    "code": "#800080"
  },
  {
    "name": "pink",
    "code": "#FFC0CB"
  },
  {
    "name": "brown",
    "code": "#A52A2A"
  },
  {
    "name": "gray",
    "code": "#808080"
  },
  {
    "name": "turquoise",
    "code": "#40E0D0"
  }
];

const productData = [
  {
    name: "Men's Classic Shirt",
    description: "Comfortable cotton shirt for everyday wear.",
    images: ["https://via.placeholder.com/400x400?text=Men+Shirt+1"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beedd",
    price: 29.99,
    is_featured: true,
    stock: 50,
    discount: 10,
    color: [],
    size: [],
    weight: 0.3,
  },
  {
    name: "Women's Summer Dress",
    description: "Light and breezy dress for summer.",
    images: ["https://via.placeholder.com/400x400?text=Women+Dress+1"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beedf",
    price: 49.99,
    is_featured: false,
    stock: 40,
    discount: 15,
    color: [],
    size: [],
    weight: 0.4,
  },
  {
    name: "Kid's T-Shirt",
    description: "Soft cotton T-shirt for kids.",
    images: ["https://via.placeholder.com/400x400?text=Kids+Tshirt+1"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beee1",
    price: 19.99,
    is_featured: true,
    stock: 100,
    discount: 5,
    color: [],
    size: [],
    weight: 0.2,
  },
  {
    name: "iPhone 14 Pro",
    description: "Latest Apple iPhone with advanced features.",
    images: ["https://via.placeholder.com/400x400?text=iPhone+14+Pro"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beee3",
    price: 1199.99,
    is_featured: true,
    stock: 25,
    discount: 0,
    color: [],
    size: [],
    weight: 0.25,
  },
  {
    name: "Samsung Galaxy S23",
    description: "High-end Samsung smartphone with great camera.",
    images: ["https://via.placeholder.com/400x400?text=Samsung+S23"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beee4",
    price: 999.99,
    is_featured: false,
    stock: 30,
    discount: 10,
    color: [],
    size: [],
    weight: 0.3,
  },
  {
    name: "Gaming Laptop",
    description: "Powerful laptop for gaming and work.",
    images: ["https://via.placeholder.com/400x400?text=Gaming+Laptop"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beee5",
    price: 1499.99,
    is_featured: true,
    stock: 15,
    discount: 20,
    color: [],
    size: [],
    weight: 2.5,
  },
  {
    name: "Ultrabook Laptop",
    description: "Lightweight ultrabook for professionals.",
    images: ["https://via.placeholder.com/400x400?text=Ultrabook+Laptop"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beee6",
    price: 1299.99,
    is_featured: false,
    stock: 20,
    discount: 5,
    color: [],
    size: [],
    weight: 1.3,
  },
  {
    name: "Wireless Headphones",
    description: "Noise-cancelling over-ear headphones.",
    images: ["https://via.placeholder.com/400x400?text=Headphones"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beee8",
    price: 199.99,
    is_featured: true,
    stock: 60,
    discount: 0,
    color: [],
    size: [],
    weight: 0.35,
  },
  {
    name: "Sofa Set",
    description: "Comfortable 3-seater sofa.",
    images: ["https://via.placeholder.com/400x400?text=Sofa+Set"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beee9",
    price: 599.99,
    is_featured: true,
    stock: 10,
    discount: 10,
    color: [],
    size: [],
    weight: 25,
  },
  {
    name: "Men's Jeans",
    description: "Stylish denim jeans for everyday wear.",
    images: ["https://via.placeholder.com/400x400?text=Mens+Jeans"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beeda",
    price: 59.99,
    is_featured: true,
    stock: 70,
    discount: 15,
    color: [],
    size: [],
    weight: 0.8,
  },
  {
    name: "Women's Handbag",
    description: "Elegant handbag for casual and formal outings.",
    images: ["https://via.placeholder.com/400x400?text=Women+Handbag"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beedb",
    price: 79.99,
    is_featured: true,
    stock: 30,
    discount: 5,
    color: [],
    size: [],
    weight: 0.5,
  },
  {
    name: "Kids' Sneakers",
    description: "Comfortable sneakers for kids' daily wear.",
    images: ["https://via.placeholder.com/400x400?text=Kids+Sneakers"],
    category: "68c49c89469acca0bc65e3be",
    sub_category: "68c49eecbb57e429190beedc",
    price: 39.99,
    is_featured: false,
    stock: 80,
    discount: 10,
    color: [],
    size: [],
    weight: 0.4,
  },
  {
    name: "Smartwatch Pro",
    description: "Feature-rich smartwatch with fitness tracking.",
    images: ["https://via.placeholder.com/400x400?text=Smartwatch+Pro"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beeed",
    price: 299.99,
    is_featured: true,
    stock: 40,
    discount: 5,
    color: [],
    size: [],
    weight: 0.1,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with high-quality sound.",
    images: ["https://via.placeholder.com/400x400?text=Bluetooth+Speaker"],
    category: "68c49c89469acca0bc65e3bf",
    sub_category: "68c49eecbb57e429190beeee",
    price: 129.99,
    is_featured: false,
    stock: 50,
    discount: 0,
    color: [],
    size: [],
    weight: 0.6,
  },
  {
    name: "4K LED TV",
    description: "Ultra HD 4K television with smart features.",
    images: ["https://via.placeholder.com/400x400?text=4K+LED+TV"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beeef",
    price: 899.99,
    is_featured: true,
    stock: 20,
    discount: 10,
    color: [],
    size: [],
    weight: 12,
  },
  {
    name: "Coffee Table",
    description: "Modern coffee table for your living room.",
    images: ["https://via.placeholder.com/400x400?text=Coffee+Table"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beef0",
    price: 199.99,
    is_featured: false,
    stock: 15,
    discount: 5,
    color: [],
    size: [],
    weight: 15,
  },
  {
    name: "Microwave Oven",
    description: "High-power microwave oven for fast cooking.",
    images: ["https://via.placeholder.com/400x400?text=Microwave+Oven"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beef1",
    price: 249.99,
    is_featured: true,
    stock: 25,
    discount: 0,
    color: [],
    size: [],
    weight: 10,
  },
  {
    name: "Electric Kettle",
    description: "Fast-boiling electric kettle for your kitchen.",
    images: ["https://via.placeholder.com/400x400?text=Electric+Kettle"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beef2",
    price: 49.99,
    is_featured: false,
    stock: 60,
    discount: 5,
    color: [],
    size: [],
    weight: 1.2,
  },
  {
    name: "Office Chair",
    description: "Ergonomic office chair with adjustable height.",
    images: ["https://via.placeholder.com/400x400?text=Office+Chair"],
    category: "68c49c89469acca0bc65e3c0",
    sub_category: "68c49eecbb57e429190beef3",
    price: 149.99,
    is_featured: true,
    stock: 35,
    discount: 10,
    color: [],
    size: [],
    weight: 8,
  },
];

export {bannerData, sizeData, colorData, productData, mainCategory, subcategories, subcategories2}
