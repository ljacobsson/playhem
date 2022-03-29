import { WebClient } from '@slack/web-api';
import { GameEntry } from './events/GameEntry';

const token = process.env.SlackToken;

const slack = new WebClient(token);

exports.handler = async function (event: GameEntry) {
  await slack.chat.postMessage({
    channel: '#playhem-test',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:table_tennis_paddle_and_ball: New match recorded: *${event.Winner.Score} - ${event.Loser.Score}*`
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: ':pepoclap: *Winner*'
          },
          {
            type: 'mrkdwn',
            text: ':peeporuncry: *Loser*'
          },
          {
            type: 'plain_text',
            text: event.Winner.Name,
            emoji: true
          },
          {
            type: 'plain_text',
            text: event.Loser.Name,
            emoji: true
          }
        ]
      }
    ]
  });
};
