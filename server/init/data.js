const categoryData= [
  {
    "name": "Men's Clothing",
    "slug": "mens-clothing",
    "images": ["https://images.unsplash.com/photo-1520975918318-1a43c508d9a7"],
    "parent": null,
    "description": "Trendy and comfortable men's fashion.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Women's Clothing",
    "slug": "womens-clothing",
    "images": ["https://images.unsplash.com/photo-1521335629791-ce4aec67dd47"],
    "parent": null,
    "description": "Elegant and stylish women's fashion.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Kids",
    "slug": "kids",
    "images": ["https://images.unsplash.com/photo-1522204523234-8728a99d3d51"],
    "parent": null,
    "description": "Clothes, toys, and accessories for kids.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "images": ["https://images.unsplash.com/photo-1518779578993-ec3579fee39f"],
    "parent": null,
    "description": "Latest gadgets, phones, and accessories.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "images": ["https://images.unsplash.com/photo-1616627781332-d788cb9fdd1f"],
    "parent": null,
    "description": "Furniture, kitchen appliances and décor.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Sports & Outdoors",
    "slug": "sports-outdoors",
    "images": ["https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf"],
    "parent": null,
    "description": "Fitness equipment and outdoor essentials.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Beauty & Health",
    "slug": "beauty-health",
    "images": ["https://images.unsplash.com/photo-1500835556837-99ac94a94552"],
    "parent": null,
    "description": "Skin care, cosmetics and health products.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Footwear",
    "slug": "footwear",
    "images": ["https://images.unsplash.com/photo-1588361861040-3de7c7c63d9d"],
    "parent": null,
    "description": "Shoes, sandals and sneakers.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Bags & Accessories",
    "slug": "bags-accessories",
    "images": ["https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3"],
    "parent": null,
    "description": "Backpacks, handbags, wallets, and more.",
    "isFeatured": false,
    "status": "active"
  },
  {
    "name": "Books",
    "slug": "books",
    "images": ["https://images.unsplash.com/photo-1512820790803-83ca734da794"],
    "parent": null,
    "description": "Fiction, non-fiction and academic books.",
    "isFeatured": false,
    "status": "inactive"
  },
  {
    "name": "Groceries",
    "slug": "groceries",
    "images": ["https://images.unsplash.com/photo-1504674900247-0877df9cc836"],
    "parent": null,
    "description": "Everyday essentials and organic items.",
    "isFeatured": true,
    "status": "active"
  },
  {
    "name": "Jewelry",
    "slug": "jewelry",
    "images": ["https://images.unsplash.com/photo-1523275335684-37898b6baf30"],
    "parent": null,
    "description": "Rings, necklaces, bracelets, and more.",
    "isFeatured": false,
    "status": "active"
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
    "name": "Classic Men's T-Shirt",
    "description": "Comfortable cotton T-shirt perfect for daily wear.",
    "images": [
      "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1566412/pexels-photo-1566412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b801329",
    "price": 25.99,
    "is_featured": true,
    "stock": 100,
    "discount": 10,
    "color": ["68c0c88bf8a6ab0c4e83145b", "68c0c88bf8a6ab0c4e83145c"],
    "size": ["68c0c82f9f6bb04a216c76ef", "68c0c82f9f6bb04a216c76f0", "68c0c82f9f6bb04a216c76f1"],
    "weight": 0.25
  },
  {
    "name": "Elegant Women's Dress",
    "description": "Stylish evening dress for formal occasions.",
    "images": [
      "https://images.pexels.com/photos/1101962/pexels-photo-1101962.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1723145/pexels-photo-1723145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132a",
    "price": 79.99,
    "is_featured": true,
    "stock": 50,
    "discount": 15,
    "color": ["68c0c88bf8a6ab0c4e831463", "68c0c88bf8a6ab0c4e831462"],
    "size": ["68c0c82f9f6bb04a216c76f1", "68c0c82f9f6bb04a216c76f2", "68c0c82f9f6bb04a216c76f3"],
    "weight": 0.5
  },
  {
    "name": "Kids Hoodie",
    "description": "Warm and cozy hoodie for children.",
    "images": [
      "https://images.pexels.com/photos/1769741/pexels-photo-1769741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1684365/pexels-photo-1684365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132b",
    "price": 30.0,
    "is_featured": false,
    "stock": 70,
    "discount": 5,
    "color": ["68c0c88bf8a6ab0c4e83145c", "68c0c88bf8a6ab0c4e83145d"],
    "size": ["68c0c82f9f6bb04a216c76f0", "68c0c82f9f6bb04a216c76f1"],
    "weight": 0.3
  },
  {
    "name": "Smartphone X200",
    "description": "Latest smartphone with high-resolution display and powerful battery.",
    "images": [
      "https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2129792/pexels-photo-2129792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132c",
    "price": 699.99,
    "is_featured": true,
    "stock": 200,
    "discount": 20,
    "color": ["68c0c88bf8a6ab0c4e83145f", "68c0c88bf8a6ab0c4e831460"],
    "weight": 0.4
  },
  {
    "name": "Blender Pro 500",
    "description": "High-performance blender for smoothies and sauces.",
    "images": [
      "https://images.pexels.com/photos/1350711/pexels-photo-1350711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1029241/pexels-photo-1029241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132d",
    "price": 120.0,
    "is_featured": false,
    "stock": 40,
    "discount": 10,
    "color": ["68c0c88bf8a6ab0c4e83145e"],
    "weight": 3.0
  },
  {
    "name": "Yoga Mat",
    "description": "Non-slip yoga mat for all fitness levels.",
    "images": [
      "https://images.pexels.com/photos/4056461/pexels-photo-4056461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4056447/pexels-photo-4056447.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132e",
    "price": 25.0,
    "is_featured": false,
    "stock": 120,
    "discount": 0,
    "color": ["68c0c88bf8a6ab0c4e831462", "68c0c88bf8a6ab0c4e831464"],
    "weight": 1.2
  },
  {
    "name": "Face Cream",
    "description": "Moisturizing cream for all skin types.",
    "images": [
      "https://images.pexels.com/photos/3373738/pexels-photo-3373738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4465123/pexels-photo-4465123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b80132f",
    "price": 15.0,
    "is_featured": true,
    "stock": 80,
    "discount": 5,
    "color": ["68c0c88bf8a6ab0c4e831460"],
    "weight": 0.2
  },
  {
    "name": "Running Shoes",
    "description": "Lightweight running shoes with excellent cushioning.",
    "images": [
      "https://images.pexels.com/photos/159846/running-shoes-runner-athlete-sports-159846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1666068/pexels-photo-1666068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b801330",
    "price": 89.99,
    "is_featured": false,
    "stock": 60,
    "discount": 10,
    "color": ["68c0c88bf8a6ab0c4e83145c", "68c0c88bf8a6ab0c4e83145f"],
    "size": ["68c0c82f9f6bb04a216c76f7", "68c0c82f9f6bb04a216c76f8", "68c0c82f9f6bb04a216c76f9"],
    "weight": 0.8
  },
  {
    "name": "Leather Handbag",
    "description": "Premium leather handbag for daily use.",
    "images": [
      "https://images.pexels.com/photos/1545639/pexels-photo-1545639.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/11516226/pexels-photo-11516226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b801331",
    "price": 150.0,
    "is_featured": false,
    "stock": 30,
    "discount": 15,
    "color": ["68c0c88bf8a6ab0c4e831466", "68c0c88bf8a6ab0c4e831461"],
    "weight": 1.0
  },
  {
    "name": "Children's Story Book",
    "description": "Illustrated storybook for kids aged 4–10.",
    "images": [
      "https://images.pexels.com/photos/2228561/pexels-photo-2228561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3472719/pexels-photo-3472719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b801332",
    "price": 12.0,
    "is_featured": false,
    "stock": 150,
    "discount": 0,
    "color": ["68c0c88bf8a6ab0c4e831464"],
    "weight": 0.5
  },
  {
    "name": "Organic Almonds Pack",
    "description": "Premium quality organic almonds, 500g pack.",
    "images": [
      "https://images.pexels.com/photos/2265492/pexels-photo-2265492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/740398/pexels-photo-740398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    "category": "68c0c6e8c4ca73f77b801333",
    "price": 18.0,
    "is_featured": false,
    "stock": 200,
    "discount": 5,
    "weight": 0.5
  }
];





export {categoryData, bannerData, sizeData, colorData, productData}
