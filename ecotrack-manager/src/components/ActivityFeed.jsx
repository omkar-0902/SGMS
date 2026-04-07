import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, Target, Truck, Wrench } from 'lucide-react';

export default function ActivityFeed({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case 'completion':
        return <CheckCircle className="w-4 h-4" />;
      case 'alert':
        return <AlertCircle className="w-4 h-4" />;
      case 'info':
        return <Info className="w-4 h-4" />;
      case 'target':
        return <Target className="w-4 h-4" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'completion':
        return 'bg-green-100 text-green-700';
      case 'alert':
        return 'bg-red-100 text-red-700';
      case 'info':
        return 'bg-blue-100 text-blue-700';
      case 'target':
        return 'bg-purple-100 text-purple-700';
      case 'maintenance':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ x: 4, backgroundColor: 'rgba(22, 163, 74, 0.03)' }}
          className="p-3 rounded-xl border border-green-100 cursor-pointer transition-all group"
        >
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${getColor(activity.type)} group-hover:scale-110 transition-transform`}>
              {getIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-green-900 leading-snug">
                {activity.message}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {activity.timestamp}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* View All Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 mt-4 text-sm font-semibold text-green-700 bg-green-50 hover:bg-green-100 rounded-xl transition-colors border border-green-200"
      >
        View All Activity
      </motion.button>
    </div>
  );
}
