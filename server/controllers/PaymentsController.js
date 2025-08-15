import stripe from "../utils/stripe.js";

export const checkout = async (request, response) => {
  const { planId, paymentDetails, billingDetails } = request.body;
  const { userId } = response;
  try {
    // Create Stripe Customer
    const customer = await stripe.customers.create({
      name: billingDetails.name,
      email: paymentDetails.email,
      phone: billingDetails.phone,
      payment_method: paymentDetails.paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentDetails.paymentMethodId,
      },
      address: {
        line1: billingDetails.address,
        city: billingDetails.city,
        state: billingDetails.state,
        postal_code: billingDetails.zipCode,
        country: billingDetails.country,
      },
      shipping: {
        name: billingDetails.name,
        address: {
          line1: billingDetails.address,
          city: billingDetails.city,
          state: billingDetails.state,
          postal_code: billingDetails.zipCode,
          country: billingDetails.country,
        },
      },
    });

    // Create Stripe Subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ plan: planId }],
      expand: ["latest_invoice.payment_intent"],
    });
    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice.payment_intent;
    const paymentIntentStatus = paymentIntent.status;
    const paymentMethod = paymentIntent.payment_method;
    const paymentMethodDetails = await stripe.paymentMethods.retrieve(
      paymentMethod
    );

    // Save payment details to database
    const payment = new Payments({
      user: userId,
      amount: paymentDetails.amount,
      currency: "usd",
      stripe_charge_id: stripeCharge.id,
      status: "succeeded",
    });
    await payment.save();

    // Update user subscription
    const userSubscription = new UserSubscriptions({
      user: userId,
      subscription: planId,
      start_date: new Date(),
      end_date: new Date(
        new Date().setDate(
          new Date().getDate() + subscription.plan.interval_count
        )
      ),
      is_free_trial: false,
      free_trial_duration_days: null,
      status: "active",
    });
    await userSubscription.save();

    // Send success response
    return response.status(200).json({
      message: "Payment successful",
      subscription,
      payment,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
