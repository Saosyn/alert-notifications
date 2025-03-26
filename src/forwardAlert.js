const axios = require('axios');

module.exports.handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // SNS sends an array of records; we'll assume one record for simplicity.
  const record = event.Records[0];
  const message = record.Sns.Message;

  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!slackWebhookUrl) {
    throw new Error(
      'SLACK_WEBHOOK_URL is not set in the environment variables'
    );
  }

  try {
    // Post the message to Slack using the webhook
    await axios.post(slackWebhookUrl, { text: message });
    console.log('Message forwarded to Slack successfully');
  } catch (error) {
    console.error('Error forwarding message to Slack:', error);
    throw error;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Alert forwarded to Slack' }),
  };
};
