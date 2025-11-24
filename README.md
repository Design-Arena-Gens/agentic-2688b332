# Lekya Logistics - Full Stack Delivery Management System

A comprehensive delivery management system for automating order assignment, live tracking, and cash reconciliation.

## 🚀 Live Demo

**Production URL**: https://agentic-2688b332.vercel.app

### Available Pages:
- **Admin Dashboard**: https://agentic-2688b332.vercel.app/dashboard
- **Driver Mobile App**: https://agentic-2688b332.vercel.app/driver

## 🎯 Features

### Admin Dashboard (Manager View)
- **Role Management**: Logistics Manager role with restricted access
- **Order Assignment**: Assign specific orders to specific drivers
- **Live Map**: Real-time GPS tracking of all active drivers via Firebase
- **Cash Collection**: Approval system for verifying driver cash handovers
- **Statistics**: Overview of orders, drivers, revenue, and deliveries

### Driver Mobile App
- **My Tasks**: Filtered view showing only assigned orders
- **Workflow**: Accept → Picked Up → In Transit → Delivered/Returned
- **Barcode Scanner**: In-app camera scanner for order verification
- **Order Details**: Complete customer info, addresses, and payment details
- **Status Updates**: Real-time order status management

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Maps**: Leaflet & React-Leaflet
- **Real-time DB**: Firebase Realtime Database
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

### Firebase Setup
Update `.env.local` with your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📱 Usage

### Admin Dashboard
1. Navigate to `/dashboard`
2. View live driver locations on the map
3. Assign pending orders to drivers
4. Monitor order statuses
5. Approve/reject cash collections

### Driver App
1. Navigate to `/driver`
2. View assigned orders
3. Update order status through workflow
4. Scan barcodes for verification
5. Complete deliveries and mark as delivered

## 🚀 Deployment

Deployed on Vercel with automatic CI/CD:

```bash
vercel deploy --prod
```

Production URL: https://agentic-2688b332.vercel.app

---

Built with ❤️ using Next.js and deployed on Vercel
