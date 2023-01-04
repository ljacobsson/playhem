import { PlainTextOption, WebClient } from '@slack/web-api';
import { Interaction } from './events/WebhookEvent';

const token = process.env.SlackToken;

const slack = new WebClient(token);

exports.handler = async (event: Interaction) => {
  console.log(event);

  await slack.views.open({
    trigger_id: event.trigger_id,
    view: {
      callback_id: 'create_tournament',
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Create new tournament',
        emoji: true
      },
      submit: {
        type: 'plain_text',
        text: 'Create tournament',
        emoji: true
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true
      },
      blocks: [
        {
          block_id: 'input',
          type: 'input',
          element: {
            type: 'plain_text_input',
            action_id: 'tournament_name'
          },
          label: {
            type: 'plain_text',
            text: 'Tournament name',
            emoji: true
          }
        }
      ]
    }
  });
};
