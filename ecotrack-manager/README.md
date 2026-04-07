# EcoTrack Manager - Smart Garbage Collection Management System

A premium, enterprise-grade dashboard for managing smart waste collection operations in modern cities.

## 🌟 Features

### Dashboard Overview
- **Real-time Analytics**: Live tracking of collection requests, completion rates, and collector performance
- **Interactive Map**: GPS-enabled live tracking of all collectors with route visualization
- **Activity Feed**: Real-time updates on collection activities and alerts
- **Performance Charts**: Comprehensive analytics with line, bar, and pie charts

### Collector Tracking
- Live GPS tracking of all field collectors
- Detailed collector profiles with performance metrics
- Route visualization and historical path tracking
- Real-time status updates (Active/Break/Offline)

### Reports & Analytics
- Detailed collection request logs
- Advanced filtering by date, status, and area
- Export functionality for reports
- Performance metrics by sector/area

### Settings Management
- Notification preferences (Email, SMS, Push)
- Operational parameters (collection radius, working hours)
- Reward system configuration
- System health monitoring

## 🎨 Design Highlights

- **Premium UI**: Glassmorphic panels, smooth animations, modern aesthetics
- **Color Scheme**: Green (#16A34A) primary with eco-friendly gradients
- **Animations**: Framer Motion for silky-smooth transitions
- **Responsive**: Optimized for desktop and tablet devices
- **Professional**: Enterprise SaaS-quality interface

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: Leaflet.js with React-Leaflet
- **Icons**: Lucide React
- **Routing**: React Router v6

## 📦 Installation

```bash
# Navigate to project directory
cd ecotrack-manager

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Pages

1. **Login** (`/login`) - Premium glassmorphic login page
2. **Dashboard** (`/dashboard`) - Main overview with stats, map, and analytics
3. **Collector Tracking** (`/collectors`) - Live GPS tracking interface
4. **Reports** (`/reports`) - Detailed collection logs and filters
5. **Settings** (`/settings`) - System configuration and preferences

## 📊 Mock Data

The application uses comprehensive mock data for:
- Collectors with GPS coordinates and routes
- Collection requests with various statuses
- Activity feed entries
- Analytics chart data
- System settings

All data is structured for easy backend integration.

## 🎯 Key Components

- `Layout.jsx` - Main app shell with navigation
- `LiveMap.jsx` - Interactive map with real-time tracking
- `AnalyticsChart.jsx` - Reusable chart component
- `ActivityFeed.jsx` - Real-time activity updates
- `StatsCard` components - Animated metric displays

## 🔌 Backend Integration Ready

The codebase is structured for seamless backend integration:
- Separate data layer (`src/data/mockData.js`)
- Service-ready architecture
- API call placeholders
- TypeScript-ready structure

## 💡 Usage Tips

1. **Navigation**: Use the left sidebar or top navigation
2. **Map Interaction**: Click markers for detailed popups
3. **Filters**: All tables support multi-criteria filtering
4. **Real-time**: Collector positions update every 3 seconds (mocked)
5. **Responsive**: Collapsible sidebar for smaller screens

## 📱 Responsive Breakpoints

- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px (navigation adapts)

## 🎨 Custom Styling

Custom Tailwind utilities included:
- `.glass-panel` - Glassmorphic effect
- `.eco-gradient` - Brand gradient
- `.eco-glow` - Glowing shadow effect
- `.text-gradient` - Gradient text

## 📄 License

MIT License - Enterprise Use

---

**Built with ❤️ for Smart Cities**
