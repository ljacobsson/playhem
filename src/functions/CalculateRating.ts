import { GameEntry, Player } from './events/GameEntry';
import { DynamoDB } from 'aws-sdk';
import { Elo } from 'simple-elo-rating';

const dynamoDB = new DynamoDB.DocumentClient();

exports.handler = async function (event: GameEntry) {
  const { winner, loser } = await getPlayers(event);

  const p1 = winner.Item || { rating: 1500 };
  const p2 = loser.Item || { rating: 1500 };

  const [newScoreA, newScoreB] = new Elo().playerA(p1.rating).playerB(p2.rating).setWinnerA().calculate().getResults();

  await saveRating(event.Winner, newScoreA);
  await saveRating(event.Loser, newScoreB);
};

async function saveRating(player: Player, newScore: number) {
  await dynamoDB
    .put({
      TableName: process.env.TableName || '',
      Item: {
        PK: `USER#${player.Id}`,
        SK: 'RATING',
        rating: newScore,
        name: player.Name,
        image: player.Image
      }
    })
    .promise();
}

async function getPlayers(event: GameEntry) {
  const winner = await dynamoDB
    .get({
      TableName: process.env.TableName || '',
      Key: {
        PK: `USER#${event.Winner.Id}`,
        SK: 'RATING'
      }
    })
    .promise();
  const loser = await dynamoDB
    .get({
      TableName: process.env.TableName || '',
      Key: {
        PK: `USER#${event.Loser.Id}`,
        SK: 'RATING'
      }
    })
    .promise();
  return { winner, loser };
}
