import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';
import { mockChartData } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isLight = document.documentElement.classList.contains('light');
    return (
      <div className={`${isLight ? 'bg-white' : 'bg-dark-card'} p-4 rounded-2xl border ${isLight ? 'border-gray-200' : 'border-white/10'} shadow-2xl min-w-[150px] backdrop-blur-xl`}>
        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">{label}</p>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className={`text-[11px] font-bold ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>{entry.name}</span>
              </div>
              <span className={`text-[11px] font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalyticsChart({ type = 'line' }) {
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];

  const renderChart = () => {
    switch (type) {
      case 'line':
      case 'area':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData.dailyPickups} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPickups" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} vertical={false} />
              <XAxis 
                dataKey="day" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}`}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#8B5CF6" 
                fontSize={10} 
                domain={[0, 150]} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 2 }} />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="pickups"
                stroke="#10B981"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorPickups)"
                name="Actual Pickups"
                animationDuration={2000}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="target"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorTarget)"
                name="Target"
                animationDuration={2000}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="efficiency" 
                stroke="#8B5CF6" 
                strokeWidth={3} 
                dot={{ r: 5, fill: '#8B5CF6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, strokeWidth: 0 }}
                name="Efficiency %" 
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData.areaPerformance} layout="vertical" margin={{ top: 20, right: 50, left: 30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis dataKey="area" type="category" stroke="#64748b" fontSize={10} width={100} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(255, 255, 255, 0.05)'}} />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar dataKey="completed" name="Completed" fill="#10B981" radius={[0, 8, 8, 0]} barSize={12} />
              <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[0, 8, 8, 0]} barSize={12} />
              <Bar dataKey="missed" name="Missed" fill="#EF4444" radius={[0, 8, 8, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full h-full"
    >
      {renderChart()}
    </motion.div>
  );
}
