import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID = {
    'seeker_pro':'price_1TfmVO3SvyvWAXaqzSqJRwR2',
    'seeker_premium':'price_1TfwN73SvyvWAXaqsQrSD95s',
    'recruiter_growth': 'price_1TfmVO3SvyvWAXaqzSqJRwR2',
    'recruiter_enterprise': 'price_1TfwUl3SvyvWAXaqIe8zaikP',
}