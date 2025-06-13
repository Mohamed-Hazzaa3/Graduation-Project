import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (!stripe || !elements) {
      setErrorMsg("Stripe is not loaded yet. Please try again later.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      const res = await fetch("/api/request-code", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok || !result.data?.clientSecret) {
        throw new Error(result.message || "Something went wrong");
      }

      const { clientSecret } = result.data;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email,
          },
        },
      });

      if (paymentResult.error) {
        setErrorMsg(paymentResult.error.message);
      } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("✅ Payment successful!");
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-xl space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-primary-800">
        💳 Complete Your Payment
      </h2>
      <div className="flex items-center justify-center font-bold text-primary-600 space-x-1">
        <h2 className="text-xl">50</h2>
        <span className="text-xs">EGP</span>
      </div>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-primary-800"
      />

      <div className="border p-3 rounded-md text-primary-800">
        <CardElement />
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
