import { DynamoDB } from 'aws-sdk';
import { WebClient } from '@slack/web-api';
import { CreateTournament } from './events/CreateTournament';
import { v4 } from 'uuid';

const token = process.env.SlackToken;

const slack = new WebClient(token);
const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.TableName || '';
exports.handler = async (event: CreateTournament) => {
  const id = v4();
  const date = new Date().toISOString();
  await dynamoDb
    .put({
      TableName: tableName,
      Item: {
        PK: `TOURNAMENT#${id}`,
        SK: date,
        Id: id,
        Name: event.value,
        Created: date
      }
    })
    .promise();
};
