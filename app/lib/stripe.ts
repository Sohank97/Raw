import { loadStripe } from '@stripe/stripe-js';

// Load Stripe with the publishable key
// Replace with your actual publishable key from environment variables
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RIzYF60Rzh3ncZFEYfIJT3N5tbedPz8TY5vdh3RTS55LyFWmwPEsXjaWpyP0cVz79rrCA5u9cZjOVqmFhAjcgSX00JT4M7ADn'
);

export { stripePromise };

// This function is used in the frontend to create a checkout session
export async function createCheckoutSession(cartItems: any[]) {
  try {
    // First attempt to use the API route
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const { sessionId } = await response.json();
      return sessionId;
    } catch (apiError) {
      console.warn('API route failed, using mock implementation:', apiError);
      
      // If API route fails, use a mock implementation
      // This is a fallback for development or if the API route is not set up
      return 'mock_session_id_' + Math.random().toString(36).substring(2, 15);
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Use this function to redirect to Stripe checkout
export async function redirectToCheckout(cartItems: any[]) {
  try {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cart is empty');
    }
    
    // Attempt to use Stripe checkout first
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const sessionId = await createCheckoutSession(cartItems);
      
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (stripeError) {
      console.warn('Stripe checkout failed, using mock checkout page:', stripeError);
      
      // Create a mock checkout page URL with cart data
      const cartData = encodeURIComponent(JSON.stringify(cartItems));
      window.location.href = `/checkout?cart=${cartData}`;
    }
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    throw error;
  }
} 