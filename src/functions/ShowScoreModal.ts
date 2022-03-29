import { PlainTextOption, WebClient } from '@slack/web-api';
import { Interaction } from './events/WebhookEvent';

const token = process.env.SlackToken;

const slack = new WebClient(token);

exports.handler = async (event: Interaction) => {
  console.log(event);

  const options: PlainTextOption[] = [];
  for (let i = 0; i < 30; i++) {
    options.push({
      text: {
        type: 'plain_text',
        text: i.toString(),
        emoji: true
      },
      value: i.toString()
    });
  }

  await slack.views.open({
    trigger_id: event.trigger_id,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Submit score',
        emoji: true
      },
      submit: {
        type: 'plain_text',
        text: 'Submit',
        emoji: true
      },
      close: {
        type: 'plain_text',
        text: 'Cancel',
        emoji: true
      },
      blocks: [
        {
          block_id: 'score_submission',
          type: 'actions',
          elements: [
            {
              initial_user: event.user_id,
              type: 'users_select',
              placeholder: {
                type: 'plain_text',
                text: 'Player one',
                emoji: true
              },
              action_id: 'player1_user'
            },
            {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Player 1 score',
                emoji: true
              },
              options: options,
              action_id: 'player1_score'
            },
            {
              type: 'users_select',
              placeholder: {
                type: 'plain_text',
                text: 'Player two',
                emoji: true
              },
              action_id: 'player2_user'
            },
            {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Player 2 score',
                emoji: true
              },
              options: options,
              action_id: 'player2_score'
            }
          ]
        }
      ]
    }
  });
};
