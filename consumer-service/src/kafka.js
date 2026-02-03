const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'consumer-service',
  brokers: ['kafka:29092'],
});

const consumer = kafka.consumer({
  groupId: 'order-group',
});

module.exports = consumer;
