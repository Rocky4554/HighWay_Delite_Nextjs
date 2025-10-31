import { NextResponse } from 'next/server';

// Define promo codes with their types and values
const PROMO_CODES = {
  // 10% off, no minimum
  'SAVE10': { type: 'percent', value: 10, minAmount: 0 },
  // Flat ₹100 off, minimum ₹500 order
  'FLAT100': { type: 'fixed', value: 100, minAmount: 500 },
  // 20% off for orders over ₹1000
  'BIG20': { type: 'percent', value: 20, minAmount: 1000 }
} as const;

type PromoCode = keyof typeof PROMO_CODES;
type PromoType = 'percent' | 'fixed';

interface PromoDetails {
  type: PromoType;
  value: number;
  minAmount: number;
}

export async function POST(request: Request) {
  try {
    const { code, subtotal: subtotalStr } = await request.json();
    
    // Validate input
    if (!code || typeof code !== 'string') {
      return NextResponse.json(
        { valid: false, message: 'Promo code is required' },
        { status: 400 }
      );
    }

    // Convert subtotal to number
    const subtotal = Number(subtotalStr);
    if (isNaN(subtotal) || subtotal < 0) {
      return NextResponse.json(
        { valid: false, message: 'Invalid subtotal amount' },
        { status: 400 }
      );
    }

    // Normalize promo code (uppercase and trim)
    const normalizedCode = code.trim().toUpperCase() as PromoCode;
    const promo = PROMO_CODES[normalizedCode];

    // Check if promo code exists
    if (!promo) {
      return NextResponse.json(
        { valid: false, message: 'Invalid promo code' },
        { status: 400 }
      );
    }

    // Check minimum order amount
    if (subtotal < promo.minAmount) {
      return NextResponse.json(
        { 
          valid: false, 
          message: `Minimum order amount for this promo is ₹${promo.minAmount}` 
        },
        { status: 400 }
      );
    }

    // Calculate discount
    let discount = 0;
    if (promo.type === 'percent') {
      discount = (subtotal * promo.value) / 100;
    } else {
      // For fixed amount, ensure discount doesn't exceed subtotal
      discount = Math.min(promo.value, subtotal);
    }

    // Round to 2 decimal places
    discount = Math.round(discount * 100) / 100;
    
    // Calculate new total (subtotal - discount + fixed tax of 59)
    const tax = 59;
    const newTotal = (subtotal - discount) + tax;

    return NextResponse.json({
      valid: true,
      discount,
      newTotal: Math.round(newTotal * 100) / 100, // Ensure 2 decimal places
      message: 'Promo code applied successfully!'
    });

  } catch (error) {
    console.error('Error in promo validation:', error);
    return NextResponse.json(
      { valid: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}