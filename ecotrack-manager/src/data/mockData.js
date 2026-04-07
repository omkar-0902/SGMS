export const mockCollectors = [
  {
    id: 'COL-001',
    name: 'Rajesh Kumar',
    vehicle: 'Truck #12',
    status: 'active',
    location: { lat: 28.6139, lng: 77.2090 },
    completedToday: 45,
    pendingToday: 8,
    route: [
      { lat: 28.6139, lng: 77.2090 },
      { lat: 28.6145, lng: 77.2100 },
      { lat: 28.6150, lng: 77.2110 }
    ]
  },
  {
    id: 'COL-002',
    name: 'Amit Sharma',
    vehicle: 'Truck #08',
    status: 'active',
    location: { lat: 28.6200, lng: 77.2150 },
    completedToday: 38,
    pendingToday: 12,
    route: [
      { lat: 28.6200, lng: 77.2150 },
      { lat: 28.6210, lng: 77.2160 },
      { lat: 28.6220, lng: 77.2170 }
    ]
  },
  {
    id: 'COL-003',
    name: 'Vikram Singh',
    vehicle: 'Truck #05',
    status: 'break',
    location: { lat: 28.6100, lng: 77.2000 },
    completedToday: 52,
    pendingToday: 5,
    route: [
      { lat: 28.6100, lng: 77.2000 },
      { lat: 28.6110, lng: 77.2010 },
      { lat: 28.6120, lng: 77.2020 }
    ]
  },
  {
    id: 'COL-004',
    name: 'Suresh Yadav',
    vehicle: 'Truck #15',
    status: 'active',
    location: { lat: 28.6250, lng: 77.2200 },
    completedToday: 41,
    pendingToday: 9,
    route: [
      { lat: 28.6250, lng: 77.2200 },
      { lat: 28.6260, lng: 77.2210 },
      { lat: 28.6270, lng: 77.2220 }
    ]
  }
];

export const mockRequests = [
  {
    id: 'REQ-2024-001',
    houseId: 'H-101',
    address: 'Block A, Sector 15',
    type: 'regular',
    status: 'completed',
    requestedAt: '2024-03-20T08:30:00Z',
    completedAt: '2024-03-20T09:15:00Z',
    collectorId: 'COL-001',
    location: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 'REQ-2024-002',
    houseId: 'H-204',
    address: 'Market Sq, Block B',
    type: 'bulk',
    status: 'pending',
    requestedAt: '2024-03-20T09:00:00Z',
    completedAt: null,
    collectorId: 'COL-002',
    location: { lat: 28.6200, lng: 77.2150 }
  },
  {
    id: 'REQ-2024-003',
    houseId: 'H-308',
    address: 'Railway St, Sector 16',
    type: 'regular',
    status: 'missed',
    requestedAt: '2024-03-20T07:45:00Z',
    completedAt: null,
    collectorId: null,
    location: { lat: 28.6100, lng: 77.2000 }
  },
  {
    id: 'REQ-2024-004',
    houseId: 'H-412',
    address: 'Green Park, Sector 4',
    type: 'regular',
    status: 'completed',
    requestedAt: '2024-03-20T08:00:00Z',
    completedAt: '2024-03-20T08:45:00Z',
    collectorId: 'COL-003',
    location: { lat: 28.6250, lng: 77.2200 }
  },
  {
    id: 'REQ-2024-005',
    houseId: 'H-501',
    address: 'East End, Sector 18',
    type: 'bulk',
    status: 'pending',
    requestedAt: '2024-03-20T10:30:00Z',
    completedAt: null,
    collectorId: 'COL-004',
    location: { lat: 28.6180, lng: 77.2120 }
  },
  {
    id: 'REQ-2024-006',
    houseId: 'H-602',
    address: 'North Hills, Sector 19',
    type: 'regular',
    status: 'missed',
    requestedAt: '2024-03-20T06:30:00Z',
    completedAt: null,
    collectorId: null,
    location: { lat: 28.6050, lng: 77.2050 }
  },
  {
    id: 'REQ-2024-007',
    houseId: 'H-705',
    address: 'South Side, Sector 20',
    type: 'regular',
    status: 'pending',
    requestedAt: '2024-03-20T11:00:00Z',
    completedAt: null,
    collectorId: null,
    location: { lat: 28.6150, lng: 77.2250 }
  }
];

export const mockActivityFeed = [
  {
    id: 1,
    type: 'completion',
    message: 'Collector #12 completed pickup at XYZ street',
    timestamp: '2 mins ago',
    icon: 'check'
  },
  {
    id: 2,
    type: 'alert',
    message: 'User reported missed pickup at Sector 16',
    timestamp: '5 mins ago',
    icon: 'alert'
  },
  {
    id: 3,
    type: 'completion',
    message: 'Daily target achieved for Zone A',
    timestamp: '12 mins ago',
    icon: 'target'
  },
  {
    id: 4,
    type: 'info',
    message: 'New bulk request received from Block D',
    timestamp: '18 mins ago',
    icon: 'info'
  },
  {
    id: 5,
    type: 'completion',
    message: 'Collector #08 finished route completion',
    timestamp: '25 mins ago',
    icon: 'check'
  },
  {
    id: 6,
    type: 'maintenance',
    message: 'Truck #15 scheduled for maintenance',
    timestamp: '1 hour ago',
    icon: 'tools'
  }
];

export const mockStats = {
  totalRequestsToday: 156,
  completedPickups: 128,
  missedPickups: 8,
  activeRequests: 20,
  activeCollectors: 12,
  userParticipationRate: 87.5,
  dailyProgress: 82,
  weeklyEfficiency: 94.2
};

export const mockChartData = {
  dailyPickups: [
    { day: 'Mon', pickups: 145, target: 150, efficiency: 96 },
    { day: 'Tue', pickups: 162, target: 150, efficiency: 108 },
    { day: 'Wed', pickups: 158, target: 150, efficiency: 105 },
    { day: 'Thu', pickups: 175, target: 160, efficiency: 109 },
    { day: 'Fri', pickups: 128, target: 150, efficiency: 85 },
    { day: 'Sat', pickups: 98, target: 100, efficiency: 98 },
    { day: 'Sun', pickups: 45, target: 50, efficiency: 90 }
  ],
  areaPerformance: [
    { area: 'Sector 15', completed: 185, pending: 12, missed: 3, score: 92 },
    { area: 'Sector 16', completed: 142, pending: 18, missed: 5, score: 85 },
    { area: 'Sector 17', completed: 168, pending: 8, missed: 2, score: 95 },
    { area: 'Sector 18', completed: 134, pending: 22, missed: 8, score: 78 },
    { area: 'Sector 19', completed: 156, pending: 14, missed: 4, score: 88 },
    { area: 'Sector 20', completed: 145, pending: 10, missed: 2, score: 91 }
  ],
  successVsMissed: [
    { name: 'Completed', value: 892, color: '#16A34A' },
    { name: 'Pending', value: 78, color: '#F59E0B' },
    { name: 'Missed', value: 30, color: '#EF4444' }
  ]
};

export const mockNotifications = [
  {
    id: 1,
    title: 'Low Efficiency Alert',
    message: 'Sector 18 showing 15% lower efficiency than target',
    time: '10 mins ago',
    unread: true,
    type: 'warning'
  },
  {
    id: 2,
    title: 'Target Achieved',
    message: 'Daily collection target achieved for Zone A',
    time: '1 hour ago',
    unread: true,
    type: 'success'
  },
  {
    id: 3,
    title: 'Maintenance Reminder',
    message: 'Truck #15 due for scheduled maintenance tomorrow',
    time: '3 hours ago',
    unread: false,
    type: 'info'
  }
];

export const mockSettings = {
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    dailyReports: true
  },
  collectionRadius: 500,
  rewardSystemEnabled: true,
  autoAssignmentEnabled: true,
  workingHours: {
    start: '06:00',
    end: '18:00'
  }
};
