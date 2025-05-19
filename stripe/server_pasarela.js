const express = require('express');
const stripe = require('stripe')('sk_test_51RMHA92LBSpcqN7Oc07XyXFjndz9hzHWDuYQVurIfsaz3qikmyboTDrO0g69eYdsfOstYGVfRJNtAgujhnl9CP8W00tMKtjS1J'); // Reemplaza con tu clave secreta real
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'mxn',
          product_data: { name: 'Pago personalizado' },
          unit_amount: parseInt(amount) * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/success', (req, res) => {
  res.send('¡Pago exitoso!');
});

app.get('/cancel', (req, res) => {
  res.send('Pago cancelado.');
});

app.listen(4242, () => console.log('Servidor corriendo en http://localhost:4242'));
