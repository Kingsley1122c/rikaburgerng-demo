import { wait, randomId } from './mockApi';

export async function placeOrderRequest(payload) {
  await wait(1300);

  if (!payload?.items?.length) {
    throw new Error('Your cart is empty.');
  }

  return {
    orderNumber: randomId('RB'),
    estimatedDelivery: '35-45 mins',
    status: 'Preparing',
    createdAt: new Date().toISOString(),
  };
}

export async function trackOrderRequest(orderNumber) {
  await wait(900);

  return {
    orderNumber: orderNumber || randomId('RB'),
    estimatedArrival: '7:10 PM',
    driver: {
      name: 'Ayo D.',
      vehicle: 'Honda Bike - LA 209 AX',
      phone: '+234 818 222 1040',
    },
    timeline: [
      { label: 'Preparing', completed: true, time: '6:22 PM' },
      { label: 'Cooking', completed: true, time: '6:33 PM' },
      { label: 'Out for Delivery', completed: true, time: '6:49 PM' },
      { label: 'Delivered', completed: false, time: 'ETA 7:10 PM' },
    ],
  };
}
