// import React, { useState } from "react";
// import { useMutation } from "@apollo/client";
// import { createStripeCheckoutSession } from "../../../server/schemas/resolvers";

// const PaymentPage = () => {
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     expMonth: "",
//     expYear: "",
//     cvv: "",
//   });

//   const [processPayment] = useMutation(createStripeCheckoutSession); // Use the GraphQL mutation for processing payment

//   const handlePayment = async () => {
//     try {
//       const { data } = await processPayment({
//         variables: {
//           cardNumber: paymentInfo.cardNumber,
//           expMonth: paymentInfo.expMonth,
//           expYear: paymentInfo.expYear,
//           cvv: paymentInfo.cvv,
//         },
//       });
//       // Handle response from the server after processing payment
//     } catch (error) {
//       // Handle any errors that occur during the payment process
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentInfo({
//       ...paymentInfo,
//       [name]: value,
//     });
//   };

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       <input
//         type="text"
//         name="cardNumber"
//         placeholder="Card Number"
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="expMonth"
//         placeholder="Expiration Month"
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="expYear"
//         placeholder="Expiration Year"
//         onChange={handleInputChange}
//       />
//       <input
//         type="text"
//         name="cvv"
//         placeholder="CVV"
//         onChange={handleInputChange}
//       />
//       <button onClick={handlePayment}>Process Payment</button>
//     </div>
//   );
// };
// export default PaymentPage;
