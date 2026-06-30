export const dashboardStats = [
  { label: "Today's Orders", value: 186 },
  { label: "Today's Revenue", value: 'NGN 1,286,000' },
  { label: 'Pending Orders', value: 24 },
  { label: 'Completed Orders', value: 141 },
  { label: 'Popular Meals', value: 18 },
  { label: 'Low Stock Items', value: 7 },
  { label: 'Active Customers', value: 934 },
  { label: 'Monthly Sales', value: 'NGN 24.8M' },
];

export const weeklyOrders = [44, 60, 55, 82, 91, 105, 88];
export const monthlyRevenue = [420, 500, 470, 620, 710, 880, 760, 970, 1100, 980, 1240, 1360];

export const orderStatuses = ['Pending', 'Preparing', 'Ready', 'Out For Delivery', 'Delivered', 'Cancelled'];

export const orders = [
  { id: 'RB-10051', customer: 'Amaka O.', status: 'Pending', amount: 14500, channel: 'App' },
  { id: 'RB-10052', customer: 'David E.', status: 'Preparing', amount: 8600, channel: 'Web' },
  { id: 'RB-10053', customer: 'Tunde R.', status: 'Out For Delivery', amount: 11200, channel: 'WhatsApp' },
  { id: 'RB-10054', customer: 'Mabel K.', status: 'Delivered', amount: 9900, channel: 'App' },
  { id: 'RB-10055', customer: 'John U.', status: 'Cancelled', amount: 6300, channel: 'Web' },
];

export const meals = [
  { id: 1, name: 'Rika Royale Stack', category: 'Burger', price: 6800, available: true, featured: true, discount: 0 },
  { id: 2, name: 'Spicy Pizza Melt', category: 'Pizza', price: 7200, available: true, featured: false, discount: 10 },
  { id: 3, name: 'Hot Wings Bucket', category: 'Chicken', price: 7300, available: true, featured: true, discount: 0 },
  { id: 4, name: 'Signature Fries', category: 'Fries', price: 2400, available: false, featured: false, discount: 0 },
  { id: 5, name: 'Beef Shawarma', category: 'Shawarma', price: 3600, available: true, featured: false, discount: 0 },
];

export const categories = ['Burger', 'Pizza', 'Chicken', 'Fries', 'Shawarma', 'Drinks', 'Desserts', 'Milkshakes'];

export const customers = [
  {
    id: 'C001',
    name: 'Ada Obi',
    email: 'ada.obi@mail.com',
    phone: '+234 812 104 0091',
    segment: 'VIP',
    status: 'Active',
    orders: 18,
    rewardPoints: 2100,
    totalSpending: 128000,
    orderHistory: ['RB-10012', 'RB-10035', 'RB-10051'],
    recentActivity: ['Placed order RB-10051', 'Redeemed 300 points', 'Left 5-star review'],
  },
  {
    id: 'C002',
    name: 'Femi Kalu',
    email: 'femi.kalu@mail.com',
    phone: '+234 806 302 1450',
    segment: 'Regular',
    status: 'Active',
    orders: 11,
    rewardPoints: 980,
    totalSpending: 84000,
    orderHistory: ['RB-10021', 'RB-10042', 'RB-10052'],
    recentActivity: ['Reported delivery delay', 'Updated address'],
  },
  {
    id: 'C003',
    name: 'Ifeoma Dan',
    email: 'ifeoma.dan@mail.com',
    phone: '+234 803 440 9832',
    segment: 'VIP',
    status: 'Active',
    orders: 27,
    rewardPoints: 3000,
    totalSpending: 220000,
    orderHistory: ['RB-10017', 'RB-10041', 'RB-10053'],
    recentActivity: ['Shared referral code', 'Placed group order'],
  },
  {
    id: 'C004',
    name: 'Ugo N.',
    email: 'ugo.n@mail.com',
    phone: '+234 810 010 7734',
    segment: 'New',
    status: 'Dormant',
    orders: 7,
    rewardPoints: 420,
    totalSpending: 44000,
    orderHistory: ['RB-10044', 'RB-10050'],
    recentActivity: ['No order in 30 days'],
  },
];

export const reviews = [
  { id: 'R1', customer: 'Ada Obi', rating: 5, text: 'Amazing burger quality.', status: 'Approved', featured: true },
  { id: 'R2', customer: 'Femi Kalu', rating: 3, text: 'Delivery came late.', status: 'Pending', featured: false },
  { id: 'R3', customer: 'Ifeoma Dan', rating: 4, text: 'Great combo value.', status: 'Hidden', featured: false },
];

export const inventory = [
  { id: 'I1', ingredient: 'Beef Patty', stock: 74, minimum: 40, supplier: 'Prime Meat Ltd' },
  { id: 'I2', ingredient: 'Burger Buns', stock: 32, minimum: 50, supplier: 'BakeHouse NG' },
  { id: 'I3', ingredient: 'Cheddar Slices', stock: 56, minimum: 30, supplier: 'DairyPlus' },
  { id: 'I4', ingredient: 'Chicken Wings', stock: 18, minimum: 30, supplier: 'FreshFarm' },
];

export const coupons = [
  { id: 'CP10', code: 'RIKA10', type: 'Percent', value: 10, enabled: true, expires: '2026-12-31', usage: 212 },
  { id: 'CPFREED', code: 'FREEDLV', type: 'Delivery', value: 1200, enabled: false, expires: '2026-08-31', usage: 44 },
];

export const messages = [
  { id: 'M1', source: 'Contact Form', from: 'customer1@mail.com', subject: 'Catering request', read: false },
  { id: 'M2', source: 'WhatsApp', from: '+234 810 000 1111', subject: 'Late order complaint', read: true },
  { id: 'M3', source: 'Support', from: 'customer2@mail.com', subject: 'Payment issue', read: false },
];

export const staff = [
  { id: 'S1', name: 'Rika Admin', role: 'Manager', permission: 'Full', activity: 'Updated menu pricing' },
  { id: 'S2', name: 'Seyi K', role: 'Kitchen Lead', permission: 'Inventory + Orders', activity: 'Marked order RB-10052 preparing' },
  { id: 'S3', name: 'Nneka O', role: 'Support', permission: 'Messages + Reviews', activity: 'Replied to support ticket M3' },
];

export const activities = [
  'Order RB-10055 marked Cancelled',
  'Coupon RIKA10 usage reached 212',
  'Inventory alert: Chicken Wings below threshold',
  'New staff invite sent to ops@rikaburgerng.com',
  'Featured meal updated: Rika Royale Stack',
];
