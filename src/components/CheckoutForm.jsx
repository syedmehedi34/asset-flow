/* eslint-disable no-unused-vars */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import usePaymentData from "../hooks/usePaymentData";

const CheckoutForm = ({ selectedPackage, setOpen }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  // console.log(user);
  // const [cart, refetch] = useCart();
  const navigate = useNavigate();
  // const [selectedPackage] = usePaymentData();

  const totalPrice = selectedPackage?.price || 0;
  console.log(selectedPackage);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(), // utc date convert. use moment js to
          package: selectedPackage.packageId,
          memberLimit: selectedPackage.members,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data.paymentResult.insertedId);
        console.log(res.data.updateResult.modifiedCount);
        if (res.data.paymentResult.insertedId) {
          setOpen(false);
          Swal.fire({
            icon: "success",
            title: "Payment Successful.",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/add_employee");
        }
      }
    }
  };
  // console.log(transactionId);
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Enter Your Payment Details
        </h2>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  fontFamily: "'Lato', sans-serif",
                  color: "#4A5568",
                  "::placeholder": {
                    color: "#CBD5E0", // Subtle placeholder
                  },
                },
                complete: {
                  color: "#48BB78", // Green when complete
                },
                invalid: {
                  color: "#E53E3E", // Red when invalid
                  iconColor: "#E53E3E",
                },
              },
            }}
          />
        </div>
      </div>

      <button
        className="btn btn-sm btn-primary my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600"> Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
