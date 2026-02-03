const consumer = require('./kafka');

const TOPIC = 'orders';

async function run() {
  await consumer.connect();
  await consumer.subscribe({
    topic: TOPIC,
    fromBeginning: true,
  });

  console.log('👂 Consumer escuchando mensajes...');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value.toString();
      const order = JSON.parse(value);

      console.log('📥 Order recibida:', {
        topic,
        partition,
        order,
      });
    },
  });
}

run().catch(console.error);
