import { wait, randomId } from './mockApi';

function emailExists(email) {
  return email?.toLowerCase() === 'existing@rikaburgerng.com';
}

export async function loginWithPassword({ email, password }) {
  await wait(900);

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  if (password.length < 6) {
    throw new Error('Invalid credentials. Please try again.');
  }

  return {
    id: randomId('USR'),
    fullName: 'Rika Customer',
    email,
    role: 'customer',
    permissions: [],
    phone: '+234 123 456 7890',
    rewardPoints: 2450,
    membershipLevel: 'Gold',
    referralCode: 'RIKA-FRIEND-20',
  };
}

export async function adminLoginRequest({ email, password }) {
  await wait(850);

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  if (email.toLowerCase() !== 'admin@rikaburgerng.com' || password !== 'admin123') {
    throw new Error('Invalid admin credentials. Use admin@rikaburgerng.com / admin123');
  }

  return {
    id: randomId('ADM'),
    fullName: 'Rikaburger Manager',
    email,
    role: 'admin',
    permissions: ['*'],
    phone: '+234 808 000 5566',
    rewardPoints: 0,
    membershipLevel: 'Admin',
    referralCode: 'ADMIN-ONLY',
  };
}

export async function registerAccount(payload) {
  await wait(1100);

  if (!payload?.email || !payload?.password || !payload?.fullName) {
    throw new Error('Please complete all required fields.');
  }

  if (emailExists(payload.email)) {
    throw new Error('An account with this email already exists.');
  }

  return {
    id: randomId('USR'),
    fullName: payload.fullName,
    email: payload.email,
    role: 'customer',
    permissions: [],
    phone: payload.phone || '',
    rewardPoints: 300,
    membershipLevel: 'Bronze',
    referralCode: 'RIKA-WELCOME',
  };
}

export async function forgotPasswordRequest({ email }) {
  await wait(700);

  if (!email) {
    throw new Error('Email is required.');
  }

  return {
    message: 'If an account exists, a reset link has been sent.',
  };
}

export async function resetPasswordRequest({ token, password }) {
  await wait(900);

  if (!token || !password || password.length < 6) {
    throw new Error('Reset link is invalid or password is too short.');
  }

  return {
    message: 'Password reset successful. You can now log in.',
  };
}

export async function updateProfileRequest(profile) {
  await wait(650);
  return {
    ...profile,
  };
}

export async function changePasswordRequest({ currentPassword, nextPassword }) {
  await wait(800);

  if (!currentPassword || !nextPassword || nextPassword.length < 6) {
    throw new Error('Please provide valid password values.');
  }

  return {
    message: 'Password updated successfully.',
  };
}
