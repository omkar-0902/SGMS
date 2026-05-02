import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';
import { Truck, Info, Zap, Signal, SignalLow } from 'lucide-react';
import L from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { db } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

// Fix for default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Auto-Fit View Component
function AutoFitView({ markers }) {
  const map = useMap();
  useEffect(() => {
    if (markers && markers.length > 0) {
      const bounds = L.latLngBounds(markers.map(m => [m.latitude, m.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15, animate: true });
    }
  }, [markers, map]);
  return null;
}

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
    // Green for ONLINE, Grey for OFFLINE
    if (status === 'ONLINE') return createLucideIcon(Truck, '#10B981', '#ECFDF5');
    return createLucideIcon(Truck, '#64748B', '#F1F5F9');
};

export default function LiveMap() {
  const [collectors, setCollectors] = useState([]);
  const [isLight, setIsLight] = useState(document.documentElement.classList.contains('light'));

  // Firebase Realtime Listener
  useEffect(() => {
    const collectorRef = ref(db, 'Collector_Locations');
    const unsubscribe = onValue(collectorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const collectorList = Object.entries(data).map(([id, val]) => ({
          id,
          ...val
        })).filter(c => 
          !isNaN(parseFloat(c.latitude)) && 
          !isNaN(parseFloat(c.longitude)) &&
          c.latitude !== 0 && c.longitude !== 0
        );
        setCollectors(collectorList);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLight(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-full w-full relative font-poppins text-content-main">
      <MapContainer
        center={[28.6139, 77.2090]}
        zoom={13}
        style={{ height: '100%', width: '100%', background: isLight ? '#f1f5f9' : '#020617' }}
        scrollWheelZoom={true}
        className={`rounded-3xl overflow-hidden transition-all duration-700 ${isLight ? 'brightness-100 contrast-100' : 'brightness-90 contrast-110'}`}
      >
        <TileLayer
          attribution='&copy; Google Maps'
          url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        />

        <AutoFitView markers={collectors} />

        {/* Live Firebase Collector Markers Only */}
        {collectors.map((collector) => (
          <Marker
            key={collector.id}
            position={[parseFloat(collector.latitude), parseFloat(collector.longitude)]}
            icon={getTruckIcon(collector.status)}
          >
            <Popup className="collector-popup">
              <div className="p-4 bg-surface border border-border rounded-xl min-w-[200px] shadow-2xl text-center flex flex-col items-center">
                 <div className={`flex items-center justify-center mb-3 w-12 h-12 rounded-xl border ${collector.status === 'ONLINE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-slate-500/10 border-slate-500/20 text-slate-500'}`}>
                    <Truck className="w-6 h-6" />
                 </div>
                 <h4 className="font-black text-content-main uppercase tracking-tight">{collector.name || 'UNITS-01'}</h4>
                 <p className="text-[10px] font-bold text-content-muted mb-3">{collector.id} • {collector.vehicle || 'Eco-Truck'}</p>
                 <div className={`w-full text-[10px] font-black tracking-[0.2em] uppercase py-1.5 rounded-lg border ${collector.status === 'ONLINE' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : 'bg-slate-500/20 text-slate-500 border-slate-500/30'}`}>
                    STATUS: {collector.status || 'OFFLINE'}
                 </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Simplified Legend */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
         <div className="glass-card p-6 rounded-3xl border border-border shadow-2xl bg-surface/90 backdrop-blur-xl min-w-[200px]">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-content-muted mb-4 flex items-center gap-2">
               <Zap className="w-3.5 h-3.5 text-primary" /> Tracking Core
            </h4>
            <div className="space-y-4">
              {[
                { label: 'Unit Online', color: '#10B981', icon: Signal, bg: 'bg-emerald-500/10' },
                { label: 'Unit Offline', color: '#64748B', icon: SignalLow, bg: 'bg-slate-500/10' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group translate-x-0 hover:translate-x-1 transition-transform">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-border shadow-sm ${item.bg}`} style={{ color: item.color }}>
                      <item.icon className="w-4 h-4" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black text-content-main uppercase tracking-widest">{item.label}</span>
                      <span className="text-[8px] font-bold text-content-muted uppercase">Real-time Telemetry</span>
                   </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    </div>
  );
}
