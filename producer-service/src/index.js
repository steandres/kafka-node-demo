const express = require('express');
const producer = require('./kafka');

const app = express();
app.use(express.json());

const TOPIC = 'orders';

app.post('/order', async (req, res) => {
  const order = {
    id: Date.now(),
    product: req.body.product,
    quantity: req.body.quantity,
  };

  try {
    await producer.connect();

    await producer.send({
      topic: TOPIC,
      messages: [
        { value: JSON.stringify(order) }
      ],
    });

    console.log('📤 Order enviada:', order);

    res.status(201).json({
      message: 'Order enviada a Kafka',
      order,
    });
  } catch (error) {
    console.error('❌ Error enviando mensaje', error);
    res.status(500).json({ error: 'Error enviando order' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Producer corriendo en puerto ${PORT}`);
});
