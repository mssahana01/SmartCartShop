# 🛒 SmartCart - Sustainable E-Commerce Platform

A full-stack e-commerce application with integrated sustainability tracking, gamification, and eco-friendly shopping features.

![SmartCart](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-v22.18.0-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)

---

## 🌟 Features

### 🛍️ **E-Commerce Core**
- **Product Catalog** - Browse products with categories, search, and filters
- **Shopping Cart** - Add/remove items, update quantities
- **Order Management** - Place orders, view order history, cancel pending orders
- **User Authentication** - Secure JWT-based login/registration
- **Admin Panel** - Full CRUD operations for products

### 🌱 **Sustainability Tracking**
- **Carbon Footprint Display** - CO₂ emissions shown on every product
- **Plastic Content Tracking** - Plastic usage visibility
- **Green Points System** - Earn points for eco-friendly purchases
- **Eco Badges** - Products marked as Eco-Friendly, Recyclable, or Locally Sourced
- **Sustainability Dashboard** - Track your environmental impact
- **Leaderboard** - Compete with other users for green points
- **Packaging Preferences** - Choose eco-friendly packaging options

### 🎮 **Gamification**
- **Green Points** - Earn +10 points per eco-friendly product
- **Packaging Bonuses** - +5 points for choosing minimal/recyclable packaging
- **Global Ranking** - See where you stand among all users
- **Impact Metrics** - Track total CO₂ and plastic saved

---

## 🏗️ Tech Stack

### **Backend**
- **Runtime:** Node.js v22.18.0
- **Framework:** Express.js
- **Database:** PostgreSQL 14+
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt

### **Frontend**
- **HTML5, CSS3, Vanilla JavaScript**
- **Design:** Glass-morphism UI with gradient themes
- **Icons:** Emoji-based for sustainability badges

### **Database Schema**
- Users (with roles: user/admin)
- Products (with sustainability fields)
- Orders & OrderItems
- Cart & CartItems
- UserPreferences
- Sustainability tracking (greenPoints, totalCO2Saved, totalPlasticSaved)

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js v22+ installed
- PostgreSQL 14+ installed and running
- Git

### **Installation**
```bash
# 1. Clone the repository
git clone <your-repo-url>
cd gocart-shop

# 2. Install backend dependencies
cd backend
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your database credentials
nano .env

# 4. Create database
psql -U postgres
CREATE DATABASE gocart_db;
\q

# 5. Run Prisma migrations
npx prisma migrate dev --name init

# 6. (Optional) Seed sample data
npx prisma db seed

# 7. Start backend server
npm start
# Server runs on http://localhost:3000

# 8. Open frontend (in a new terminal)
cd ../frontend
# Serve with any static server, e.g.:
npx http-server -p 5173
# Frontend runs on http://localhost:5173
```

---

## 📁 Project Structure
```
gocart-shop/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── adminAuth.js         # Admin-only access
│   ├── routes/
│   │   ├── auth.js              # Login/Register/Me
│   │   ├── products.js          # CRUD for products
│   │   ├── cart.js              # Cart management
│   │   ├── orders.js            # Order processing
│   │   └── sustainability.js    # Green points & dashboard
│   ├── prisma/
│   │   └── schema.prisma        # Database schema
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── server.js                # Express app entry point
│
├── frontend/
│   ├── index.html               # Main HTML
│   ├── style.css                # Styling (glass-morphism)
│   ├── main.js                  # Frontend logic
│   └── assets/                  # Images, icons
│
└── README.md
```

---

## 🔧 Configuration

### **Environment Variables (.env)**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/gocart_db"
JWT_SECRET="your-super-secret-jwt-key-change-this"
PORT=3000
FRONTEND_URL="http://localhost:5173"
```

### **Database Connection**
Update `backend/.env` with your PostgreSQL credentials:
- Username: Your PostgreSQL username
- Password: Your PostgreSQL password
- Database: `gocart_db`

---

## 🎯 Key API Endpoints

### **Authentication**
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user data

### **Products**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### **Cart**
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update quantity
- `DELETE /api/cart/:id` - Remove item
- `DELETE /api/cart` - Clear cart

### **Orders**
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order (checkout)
- `DELETE /api/orders/:id` - Cancel order

### **Sustainability**
- `GET /api/sustainability/dashboard` - User sustainability stats
- `GET /api/sustainability/cart-impact` - Current cart's environmental impact
- `GET /api/sustainability/leaderboard` - Top 10 eco-friendly users
- `GET /api/sustainability/preferences` - User eco preferences
- `PUT /api/sustainability/preferences` - Update preferences

---

## 👤 User Roles

### **Regular User**
- Browse products
- Add to cart and checkout
- View order history
- Track sustainability impact
- Earn green points

### **Admin User**
- All user permissions +
- Create/Edit/Delete products
- Manage product sustainability data
- View all orders

### **Creating Admin User**
Check "Register as Admin" during registration, or update database:
```sql
UPDATE "User" SET role = 'admin' WHERE email = 'your@email.com';
```

---

## 🌱 Sustainability Features Explained

### **Green Points System**
- **+10 points** per eco-friendly product purchased
- **+5 points** for minimal packaging
- **+5 points** for recyclable packaging
- Points displayed on dashboard
- Global leaderboard ranking

### **Product Sustainability Data**
Each product tracks:
- `isEcoFriendly` - General eco-friendly status
- `carbonFootprint` - CO₂ emissions in kg
- `plasticContent` - Plastic usage in grams
- `recyclable` - 100% recyclable packaging
- `locallySourced` - Locally sourced product

### **User Impact Tracking**
Users can view:
- Total CO₂ saved
- Total plastic avoided
- Total green points earned
- Global rank among all users
- Number of eco-friendly products purchased

---

## 🎨 UI/UX Features

- **Glass-morphism Design** - Modern frosted glass effect
- **Gradient Themes** - Purple/blue gradients throughout
- **Responsive Layout** - Mobile-friendly design
- **Real-time Cart Badge** - Live cart item count
- **Toast Notifications** - User feedback for actions
- **Sustainability Badges** - Visual eco-friendly indicators
  - 🌿 Eco-Friendly (Green)
  - ♻️ Recyclable (Blue)
  - 📍 Local (Purple)

---

## 🔒 Security

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Role-Based Access Control** - Admin-only routes protected
- **Input Validation** - Server-side validation
- **SQL Injection Prevention** - Prisma ORM parameterized queries

---

## 📊 Database Management

### **View All Tables**
```bash
psql gocart_db -U username -c "\dt"
```

### **Check Product Data**
```bash
psql gocart_db -U username -c "SELECT id, name, \"isEcoFriendly\", \"carbonFootprint\" FROM \"Product\";"
```

### **View Users**
```bash
psql gocart_db -U username -c "SELECT id, name, email, role, \"greenPoints\" FROM \"User\";"
```

### **Reset Database**
```bash
cd backend
npx prisma migrate reset
npx prisma migrate dev
```

---

## 🐛 Troubleshooting

### **Backend won't start**
```bash
# Check if port 3000 is already in use
lsof -i :3000
# Kill the process if needed
kill -9 <PID>
```

### **Database connection error**
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in `.env`
- Ensure database exists: `psql -l | grep gocart_db`

### **Sustainability values showing as 0**
- Check product creation logs in backend console
- Verify database columns exist: `psql gocart_db -U username -c "\d \"Product\""`
- Ensure proper type conversion in products.js route

### **Frontend not loading**
- Check browser console for errors (F12)
- Verify API_URL in main.js points to `http://localhost:3000/api`
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

---

## 🚧 Future Enhancements

- [ ] Email notifications for eco-friendly deals
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Payment gateway integration
- [ ] Advanced analytics dashboard
- [ ] Carbon offset calculator
- [ ] Social sharing of sustainability achievements
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Product recommendations based on eco-preferences

---

## 📝 Development Notes

### **Adding New Products**
Products require:
- Basic info: name, description, price, image, stock, category
- Sustainability data: carbonFootprint, plasticContent, isEcoFriendly, recyclable, locallySourced

### **Sustainability Calculation**
- Carbon footprint: kg CO₂ per unit
- Plastic content: grams per unit
- Green points: Calculated during checkout based on eco-friendly items + packaging choice

### **Admin Panel Access**
Navigate to `/admin` or click "Admin Panel" in navbar (visible only to admin users)

---

## 📜 License

This project is licensed under the MIT License.

---


## 🙏 Acknowledgments

- Unsplash for product images
- Prisma for excellent ORM
- Express.js community
- PostgreSQL team

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review backend console logs
3. Check browser console (F12)
4. Verify database schema

---

## 🎉 Get Started!
```bash
# Quick start
cd backend && npm start
# Open http://localhost:5173 in browser
# Register as admin to add products
# Start shopping sustainably! 🌱
```

---

**Built with 💚 for a sustainable future**
