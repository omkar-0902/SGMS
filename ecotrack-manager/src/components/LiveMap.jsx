import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { Truck, Home, AlertTriangle, Info, Clock, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';
import { mockCollectors, mockRequests } from '../data/mockData';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default marker icon issue in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createLucideIcon = (IconComponent, color, bgColor = 'white') => {
  const iconHtml = renderToStaticMarkup(
    <div style={{
      color: color,
      backgroundColor: bgColor,
      padding: '6px',
      borderRadius: '10px',
      border: `2px solid ${color}`,
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    }}>
      <IconComponent size={20} strokeWidth={3} />
    </div>
  );
  
  return L.divIcon({
    html: iconHtml,
    className: 'lucide-div-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
};

const getTruckIcon = (status) => {
    if (status === 'active') return createLucideIcon(Truck, '#3B82F6', '#EFF6FF');
    if (status === 'break') return createLucideIcon(Truck, '#A855F7', '#FAF5FF');
    return createLucideIcon(Truck, '#64748B', '#F1F5F9');
};
const homeIcon = (status) => {
    if (status === 'missed') return createLucideIcon(AlertTriangle, '#EF4444', '#FEF2F2');
    if (status === 'completed') return createLucideIcon(CheckCircle2, '#10B981', '#ECFDF5');
    if (status === 'pending') return createLucideIcon(Clock, '#F59E0B', '#FFFBEB');
    return createLucideIcon(Home, '#64748b', '#f1f5f9');
};

export default function LiveMap() {
  const [activeRequests] = useState(mockRequests);
  const [activeCollectors] = useState(mockCollectors);
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light'));

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'missed': return '#EF4444';
      default: return '#64748b';
    }
  };

  const tileUrl = isLight 
    ? "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
    : "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";

  return (
    <div className="h-full w-full relative font-poppins text-content-main">
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        style={{ height: '100%', width: '100%', background: isLight ? '#f8fafc' : '#020617' }}
        scrollWheelZoom={true}
        className={`rounded-3xl overflow-hidden transition-all duration-700 ${isLight ? 'brightness-100 contrast-100' : 'grayscale brightness-75 contrast-125'}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a>'
          url={tileUrl}
        />

        {activeRequests.map((request) => (
          <Marker
            key={request.id}
            position={[request.location.lat, request.location.lng]}
            icon={homeIcon(request.status)}
          >
            <Popup>
              <div className="p-4 bg-surface border border-border rounded-2xl min-w-[180px] shadow-2xl">
                 <div className="flex items-center gap-3 mb-2">
                   {request.status === 'missed' ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <Home className="w-4 h-4" style={{ color: getStatusColor(request.status) }} />}
                   <strong className="text-sm text-content-main font-black tracking-tight">{request.houseId}</strong>
                 </div>
                 <p className="text-[10px] text-content-muted font-bold mb-3 truncate">{request.address}</p>
                 <div className={`text-[9px] font-black uppercase text-center py-2 rounded-xl tracking-[0.2em] border shadow-sm ${
                   request.status === 'completed' ? 'bg-primary/20 text-primary border-primary/30' : 
                   request.status === 'pending' ? 'bg-amber-500/20 text-amber-500 border-amber-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'
                 }`}>
                   {request.status}
                 </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Collector Markers */}
        {activeCollectors.filter(c => c.status !== 'break').map((collector) => (
          <Marker
            key={collector.id}
            position={[collector.location.lat, collector.location.lng]}
            icon={getTruckIcon(collector.status)}
          >
            <Popup className="collector-popup">
              <div className="p-4 bg-surface border border-border rounded-xl min-w-[200px] shadow-2xl text-center flex flex-col items-center">
                 <div className={`flex items-center justify-center mb-3 w-12 h-12 rounded-xl border ${collector.status === 'active' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-purple-500/10 border-purple-500/20 text-purple-500'}`}>
                   <Truck className="w-6 h-6" />
                 </div>
                 <h4 className="font-black text-content-main uppercase tracking-tight">{collector.name}</h4>
                 <p className="text-[10px] font-bold text-content-muted mb-3">{collector.id} • {collector.vehicle}</p>
                 <div className={`w-full text-[10px] font-black tracking-[0.2em] uppercase py-1.5 rounded-lg border ${collector.status === 'active' ? 'bg-blue-500/20 text-blue-500 border-blue-500/30' : 'bg-purple-500/20 text-purple-500 border-purple-500/30'}`}>
                    STATUS: {collector.status}
                 </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modern Overlay Legend */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
         <div className="glass-card p-6 rounded-3xl border border-border shadow-3xl bg-surface/80 backdrop-blur-xl min-w-[200px]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-content-muted mb-4 flex items-center gap-2">
               <Info className="w-3 h-3 text-primary" /> Legend
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Active Collector', color: '#3B82F6', icon: Truck, bg: 'bg-blue-500/10' },
                { label: 'Pending Task', color: '#F59E0B', icon: Clock, bg: 'bg-amber-500/10' },
                { label: 'Verified Pickup', color: '#10B981', icon: CheckCircle2, bg: 'bg-primary/10' },
                { label: 'Missed Alert', color: '#EF4444', icon: AlertTriangle, bg: 'bg-red-500/10' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group translate-x-0 hover:translate-x-1 transition-transform">
                   <div className={`w-8 h-8 rounded-xl flex items-center justify-center border border-border ${item.bg}`} style={{ color: item.color }}>
                      <item.icon className="w-3.5 h-3.5" />
                   </div>
                   <span className="text-[10px] font-black text-content-main uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
