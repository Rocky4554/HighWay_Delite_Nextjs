# HighWay Delite: Experiences & Slots

A full-stack Next.js + MongoDB web application that allows users to explore curated travel experiences, select available dates and time slots, and complete bookings seamlessly.

This project fulfills the Fullstack Intern Assignment requirements — covering end-to-end frontend and backend integration, API design, and a clean, responsive UI.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI Components**
- **Axios** for API calls

### ⚙️ Backend
- **Next.js API Routes** (Node.js + Express-style)
- **MongoDB** with Mongoose
- **Environment Variables** for secure configuration

### ☁️ Deployment
- **Vercel** (Frontend)
- **MongoDB Atlas** (Database)

---

## 📂 Folder Structure

```
highway-delite/
├── app/
│   ├── api/
│   │   ├── experiences/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── bookings/
│   │   │   └── route.ts
│   │   └── promo/
│   │       └── route.ts
│   ├── experience/
│   │   └── [id]/page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── order-confirmed/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── ExperienceCard.tsx
│   ├── DateTimeSelector.tsx
│   ├── BillingSummary.tsx
│   └── (other UI components)
│
├── lib/
│   ├── db.ts
│   ├── models/
│   │   ├── Experience.ts
│   │   └── Booking.ts
│   └── types.ts
│
├── public/
│   └── (images, icons, assets)
│
├── scripts/
│   └── seed.js
│
├── .env.local
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a file named `.env.local` in your project root and add the following:

```env
MONGODB_URI=mongodb+srv://Raunak:vnNniNcBRM4HmapU@cluster0.etacmzo.mongodb.net/BookingSite?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_URL=http://localhost:3000
```

> ⚠️ **Security Note**: Never commit `.env.local` to version control. Add it to `.gitignore`.

---

## 🧠 Features

✅ Browse curated travel experiences  
✅ View descriptions, locations, and pricing  
✅ Choose date and time slots (with sold-out status)  
✅ Dynamic billing summary (quantity, subtotal, taxes, total)  
✅ Confirm bookings — saved to MongoDB  
✅ Fully responsive, mobile-friendly UI  
✅ Matches Figma design specifications  

---

## 🧩 API Endpoints

| Method | Endpoint                  | Description                      |
|--------|---------------------------|----------------------------------|
| GET    | `/api/experiences`        | Fetch all experiences            |
| GET    | `/api/experiences/:id`    | Fetch single experience details  |
| POST   | `/api/bookings`           | Submit a new booking             |
| POST   | `/api/promo/validate`     | Validate promo codes             |

---

## 🪄 Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/highway-delite.git
cd highway-delite
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your `.env.local`

Make sure your MongoDB URI and public URL are added as shown above.

### 4️⃣ Seed the database

Populate MongoDB with initial experience data:

```bash
npm run seed
```

### 5️⃣ Run the development server

```bash
npm run dev
```

The app will be running on 👉 **http://localhost:3000**

---

## 🖼️ Screenshots

### 🏠 Home Page
*Explore experiences and browse curated categories*

![Home Page](./public/screeshots/home.png)

---

### 📖 Experience Details Page
*Choose date, time, and view pricing with real-time slot availability*

![Experience Details](./public/screeshots/experinece-details2.png)


---

### 📅 Date & Time Slot Selection
*Interactive calendar and time slot picker with availability status*

![Experience Details](./public/screeshots/experience-details.png)

---

### 💳 Checkout Page
*Confirm booking, adjust quantity, and apply promo codes*

![Checkout Page](./public/screenshots/checkout-page.png)

---

### ✅ Order Confirmed Page
*Display booking confirmation with reference ID*

![Order Confirmed](./public/screeshots/confirmed.png)

---

## 🔗 Live Demo

🌐 **Live URL**: [https://highway-delite.vercel.app](https://highway-delite.vercel.app)

📁 **GitHub Repo**: [https://github.com/your-username/highway-delite](https://github.com/your-username/highway-delite)

---

## 👨‍💻 Author

**Raunak Kumar**  
*Frontend / Fullstack Developer*

📧 Email: [raunak@example.com](mailto:raunak@example.com)  
💼 LinkedIn: [linkedin.com/in/raunak-kumar](https://linkedin.com/in/raunak-kumar)  
🐙 GitHub: [github.com/raunak-kumar](https://github.com/raunak-kumar)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Design inspiration from Figma mockups
- Built with ❤️ using Next.js and MongoDB
- Deployed seamlessly on Vercel

---

## 🛠️ Development Scripts

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Seed database with sample data
npm run seed

# Run linting
npm run lint
```

---

## 🐛 Known Issues & Future Enhancements

- [ ] Add user authentication
- [ ] Implement payment gateway integration
- [ ] Add booking history for users
- [ ] Email confirmation notifications
- [ ] Admin dashboard for experience management

---

**Made with ❤️ for the Fullstack Intern Assignment**