'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { CUSTOMERS } from '@/data/customers';
import { 
  CreditCard, Building2, Apple, Smartphone, 
  CheckCircle, Shield, Lock, Wallet,
  ArrowRight, ChevronDown
} from 'lucide-react';

type PaymentMethod = 'card' | 'eft' | 'apple' | 'google';

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useCredits, setUseCredits] = useState(true);

  // Find customer
  const customer = CUSTOMERS.find(c => c.email === user?.email) || CUSTOMERS[0];

  // Mock cart items
  const cartItems: CartItem[] = [
    { id: '1', name: 'Document Printing - A4 Color', quantity: 50, price: 2.10 },
    { id: '2', name: 'Spiral Binding', quantity: 5, price: 18.00 },
    { id: '3', name: 'Business Cards (250)', quantity: 1, price: 45.00 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 45.00;
  const tax = subtotal * 0.15;
  const total = subtotal + deliveryFee + tax;
  
  // Calculate credits to use
  const creditsToUse = useCredits ? Math.min(customer.credits, total) : 0;
  const remainingTotal = total - creditsToUse;

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to confirmation
    router.push('/order-confirmation');
  };

  return (
    <main>
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-ink dark:text-stock mb-6">
              Checkout
            </h1>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm ${
                    s === step ? 'bg-signal text-ink' :
                    s < step ? 'bg-green-600 text-white' :
                    'bg-stock-200 dark:bg-ink-700 text-board-400'
                  }`}>
                    {s < step ? '✓' : s}
                  </div>
                  <span className={`text-sm font-medium ${
                    s === step ? 'text-ink dark:text-stock' : 'text-board-400'
                  }`}>
                    {s === 1 ? 'Review' : s === 2 ? 'Payment' : 'Confirm'}
                  </span>
                  {s < 3 && <ChevronDown className="h-4 w-4 text-board-400 rotate-[-90deg]" />}
                </div>
              ))}
            </div>

            {/* Step 1: Review Order */}
            {step === 1 && (
              <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-6">
                <h2 className="font-semibold text-ink dark:text-stock mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-stock-100 dark:border-ink-700">
                      <div>
                        <p className="font-medium text-ink dark:text-stock">{item.name}</p>
                        <p className="text-sm text-board-600 dark:text-board-400">
                          {item.quantity} × R{item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-mono text-ink dark:text-stock">
                        R{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-stock-200 dark:border-ink-700 space-y-2">
                  <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                    <span>Subtotal</span>
                    <span>R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                    <span>Delivery</span>
                    <span>R{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                    <span>VAT (15%)</span>
                    <span>R{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-ink dark:text-stock pt-2 border-t border-stock-200 dark:border-ink-700">
                    <span>Total</span>
                    <span>R{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-6 bg-signal text-ink font-semibold py-3 rounded-lg hover:bg-stock transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-6">
                <h2 className="font-semibold text-ink dark:text-stock mb-4">Payment Method</h2>

                {/* Credits Wallet */}
                <div className="mb-6 p-4 bg-stock-50 dark:bg-ink-700 rounded-lg border border-stock-200 dark:border-ink-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Wallet className="h-5 w-5 text-signal" />
                      <div>
                        <p className="font-medium text-ink dark:text-stock">Credits Wallet</p>
                        <p className="text-sm text-board-600 dark:text-board-400">
                          Available: R{customer.credits.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={useCredits}
                        onChange={(e) => setUseCredits(e.target.checked)}
                        className="w-4 h-4 accent-signal"
                      />
                      <span className="text-sm text-board-600 dark:text-board-400">Use credits</span>
                    </label>
                  </div>
                  {useCredits && creditsToUse > 0 && (
                    <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                      Applying R{creditsToUse.toFixed(2)} credits
                    </div>
                  )}
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-signal bg-signal/5 dark:bg-signal/10'
                        : 'border-stock-200 dark:border-ink-700 hover:border-stock-300'
                    }`}
                  >
                    <CreditCard className="h-6 w-6 text-board-600 dark:text-board-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-board-700 dark:text-board-300">Card</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('eft')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'eft'
                        ? 'border-signal bg-signal/5 dark:bg-signal/10'
                        : 'border-stock-200 dark:border-ink-700 hover:border-stock-300'
                    }`}
                  >
                    <Building2 className="h-6 w-6 text-board-600 dark:text-board-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-board-700 dark:text-board-300">EFT</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'apple'
                        ? 'border-signal bg-signal/5 dark:bg-signal/10'
                        : 'border-stock-200 dark:border-ink-700 hover:border-stock-300'
                    }`}
                  >
                    <Apple className="h-6 w-6 text-board-600 dark:text-board-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-board-700 dark:text-board-300">Apple Pay</span>
                  </button>
                  
                  <button
                    onClick={() => setPaymentMethod('google')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      paymentMethod === 'google'
                        ? 'border-signal bg-signal/5 dark:bg-signal/10'
                        : 'border-stock-200 dark:border-ink-700 hover:border-stock-300'
                    }`}
                  >
                    <Smartphone className="h-6 w-6 text-board-600 dark:text-board-400 mx-auto mb-2" />
                    <span className="text-sm font-medium text-board-700 dark:text-board-300">Google Pay</span>
                  </button>
                </div>

                {/* Card Details (mock) */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-board-700 dark:text-board-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        className="w-full px-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-700 text-ink dark:text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-board-700 dark:text-board-300 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-700 text-ink dark:text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-board-700 dark:text-board-300 mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2 border border-stock-300 dark:border-ink-700 rounded-lg bg-white dark:bg-ink-700 text-ink dark:text-stock focus:outline-none focus:ring-2 focus:ring-signal/50"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* EFT Details (mock) */}
                {paymentMethod === 'eft' && (
                  <div className="p-4 bg-stock-50 dark:bg-ink-700 rounded-lg border border-stock-200 dark:border-ink-600">
                    <p className="text-sm text-board-600 dark:text-board-400">
                      Bank: ABSA<br />
                      Account: 1234567890<br />
                      Reference: Order #{Math.floor(Math.random() * 10000)}
                    </p>
                  </div>
                )}

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-4 py-3 border border-stock-300 dark:border-ink-700 rounded-lg hover:bg-stock-50 dark:hover:bg-ink-700 transition-colors text-ink dark:text-stock"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-signal text-ink font-semibold py-3 rounded-lg hover:bg-stock transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirm */}
            {step === 3 && (
              <div className="bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-ink dark:text-stock mb-2">
                    Review Your Order
                  </h2>
                  <p className="text-board-600 dark:text-board-400 mb-6">
                    Please confirm your payment details and order total
                  </p>
                </div>

                <div className="space-y-2 p-4 bg-stock-50 dark:bg-ink-700 rounded-lg mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-board-600 dark:text-board-400">Subtotal</span>
                    <span className="text-ink dark:text-stock">R{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-board-600 dark:text-board-400">Delivery</span>
                    <span className="text-ink dark:text-stock">R{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-board-600 dark:text-board-400">VAT (15%)</span>
                    <span className="text-ink dark:text-stock">R{tax.toFixed(2)}</span>
                  </div>
                  {useCredits && creditsToUse > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>Credits Applied</span>
                      <span>-R{creditsToUse.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-ink dark:text-stock pt-2 border-t border-stock-200 dark:border-ink-700">
                    <span>Total</span>
                    <span>R{remainingTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-board-600 dark:text-board-400 mb-6">
                  <Lock className="h-4 w-4" />
                  <span>Your payment is secure and encrypted</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-signal text-ink font-semibold py-3 rounded-lg hover:bg-stock transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Confirm Order
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-white dark:bg-ink-800 border border-stock-200 dark:border-ink-700 rounded-lg p-6">
              <h3 className="font-semibold text-ink dark:text-stock mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-board-600 dark:text-board-400">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-ink dark:text-stock">
                      R{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stock-200 dark:border-ink-700 space-y-2">
                <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                  <span>Subtotal</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                  <span>Delivery</span>
                  <span>R{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-board-600 dark:text-board-400">
                  <span>VAT</span>
                  <span>R{tax.toFixed(2)}</span>
                </div>
                {useCredits && creditsToUse > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Credits</span>
                    <span>-R{creditsToUse.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-ink dark:text-stock pt-2 border-t border-stock-200 dark:border-ink-700">
                  <span>Total</span>
                  <span>R{remainingTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-stock-50 dark:bg-ink-700 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-board-600 dark:text-board-400">
                  <Shield className="h-4 w-4" />
                  <span>Secure checkout powered by PrintHub SA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}