const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'producer-service',
  brokers: ['kafka:29092'], // importante: nombre del servicio docker
});

const producer = kafka.producer();

module.exports = producer;
