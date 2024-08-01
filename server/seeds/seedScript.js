const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const memberships = require('./memberships.json');

async function createProducts() {
  for (const membership of memberships) {
    const product = await stripe.products.create({
      name: membership.name,
      description: membership.description,
    });

    await stripe.prices.create({
      unit_amount: membership.price * 100, // Convert to cents
      currency: 'usd',
      product: product.id,
    });

    console.log(`Created product and price for ${membership.name}`);
  }
}

createProducts().catch((err) => console.log(err));
