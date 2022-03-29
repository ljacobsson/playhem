import { Interaction } from './events/WebhookEvent';
import { WebClient } from '@slack/web-api';
import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB.DocumentClient();
const token = process.env.SlackToken;

const slack = new WebClient(token);

exports.handler = async function (event: Interaction) {
  const ratings = await dynamoDB
    .query({
      TableName: process.env.TableName || '',
      KeyConditionExpression: 'SK = :sk',
      ExpressionAttributeValues: { ':sk': 'RATING' },
      IndexName: 'ReverseLookup'
    })
    .promise();

  const blocks = ratings.Items?.sort((a, b) => b.rating - a.rating).map((rating, i) => ({
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: `*${getMedal(i + 1)}*`
      },
      {
        type: 'image',
        image_url: rating.image || 'https://via.placeholder.com/32',
        alt_text: rating.name
      },
      {
        type: 'mrkdwn',
        text: `*${rating.name}*`
      },
      {
        type: 'mrkdwn',
        text: `(${rating.rating})`
      }
    ]
  }));

  await slack.chat.postEphemeral({
    channel: event.channel_id,
    user: event.user_id,
    text: 'Leaderboard',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Leaderboard*'
        }
      },
      ...(blocks || [])
    ]
  });
};
function getMedal(index: number) {
  switch (index) {
    case 1:
      return ':first_place_medal:';
    case 2:
      return ':second_place_medal:';
    case 3:
      return ':third_place_medal:';
    default:
      return index + '  ';
  }
}
