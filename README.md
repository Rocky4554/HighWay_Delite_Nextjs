🌍 HighWay Delite: Experiences & Slot

A full-stack **Next.js + MongoDB** web application that allows users to explore curated travel experiences, select dates and time slots, and complete bookings seamlessly.  
This project fulfills the **Fullstack Intern Assignment** requirements — covering end-to-end frontend and backend integration, API design, and clean UI implementation.

---

## 🚀 Tech Stack

**Frontend:**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn/UI Components
- Axios (for API calls)

**Backend:**
- Next.js API Routes (Node.js + Express-style handlers)
- MongoDB with Mongoose
- Environment Variables for secure DB connection

**Deployment:**
- Vercel (Frontend)
- MongoDB Atlas (Database)

---

## 📂 Folder Structure

bookit/
├── app/
│ ├── api/
│ │ ├── experiences/
│ │ │ ├── route.ts
│ │ │ └── [id]/route.ts
│ │ ├── bookings/
│ │ │ └── route.ts
│ │ └── promo/
│ │ └── route.ts
│ ├── experience/[id]/page.tsx
│ ├── checkout/page.tsx
│ ├── order-confirmed/page.tsx
│ ├── layout.tsx
│ ├── globals.css
│ └── page.tsx
├── components/
│ ├── ExperienceCard.tsx
│ ├── DateTimeSelector.tsx
│ ├── BillingSummary.tsx
│ └── Header.tsx
├── lib/
│ ├── db.ts
│ ├── models/
│ │ ├── Experience.ts
│ │ └── Booking.ts
│ └── types.ts
├── .env.local
├── package.json
└── tsconfig.json

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env.local` file in your project root:

```bash
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_API_URL=http://localhost:3000
🧠 Features
✅ Browse curated travel experiences
✅ View details, description, images, and available slots
✅ Select date and time with real-time sold-out indicators
✅ Dynamic Billing Summary with quantity, taxes, and total
✅ Confirm and store bookings in MongoDB
✅ Responsive, mobile-friendly, and Figma-accurate UI

🧩 API Endpoints
Method	Endpoint	Description
GET	/api/experiences	Fetch all experiences
GET	/api/experiences/:id	Get details & slots for one experience
POST	/api/bookings	Submit a new booking
POST	/api/promo/validate	Validate promo codes

🪄 Run Locally
Clone the project:

bash
Copy code
git clone https://github.com/your-username/bookit.git
cd bookit
Install dependencies:

bash
Copy code
npm install
Run the development server:

bash
Copy code
npm run dev
The app will run at 👉 http://localhost:3000

🖼️ Screenshots
🏠 Home Page
Explore experiences and browse by category.


📖 Experience Details Page
Select date, time, and view pricing.


💳 Checkout Page
Confirm booking, enter user info, and apply promo codes.


✅ Order Confirmed Page
Display final booking confirmation.


🔗 Live Demo
🌐 Live URL: https://bookit.vercel.app
📁 GitHub Repo: https://github.com/your-username/bookit

👨‍💻 Author
Raunak Kumar
Frontend / Fullstack Developer

📧 your-email@example.com
💼 LinkedIn
