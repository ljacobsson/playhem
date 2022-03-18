import { DynamoDB } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { ScoreSubmission } from './events/ScoreSubmission';

const token = process.env.SlackToken;

const slack = new WebClient(token);
const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.TableName || '';
exports.handler = async (event: ScoreSubmission) => {
  const player1 = await slack.users.info({ user: event.player1_user.selected_user });
  const player2 = await slack.users.info({ user: event.player2_user.selected_user });
  const p1Score = parseInt(event.player1_score.selected_option.value);
  const p2Score = parseInt(event.player2_score.selected_option.value);
  const winner = p1Score > p2Score ? player1 : player2;
  const loser = p1Score > p2Score ? player2 : player1;
  await dynamoDb
    .put({
      TableName: tableName,
      Item: {
        PK: `GAME#${[player1.user?.id, player2.user?.id].sort().join('_vs_')}`,
        SK: new Date().toISOString(),
        Loser: {
          Id: loser.user?.id,
          Name: loser.user?.real_name,
          Image: loser.user?.profile?.image_32,
          Score: Math.min(p1Score, p2Score)
        },
        Winner: {
          Id: winner.user?.id,
          Name: winner.user?.real_name,
          Image: winner.user?.profile?.image_32,
          Score: Math.max(p1Score, p2Score)
        }
      }
    })
    .promise();
};
