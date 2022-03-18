import { APIGatewayProxyEvent } from 'aws-lambda';
import { EventBridge } from 'aws-sdk';
import * as qs from 'querystring';

const eventBridge = new EventBridge();
exports.handler = async function (event: APIGatewayProxyEvent) {
  const body = qs.parse(event.body || '');
  console.log(body, event.body);
  let type;
  if (body.payload) {
    type = JSON.parse(body.payload.toString()).type;
    body.payload = JSON.parse(body.payload.toString());
  } else {
    type = 'slash_command';
  }
  await eventBridge
    .putEvents({
      Entries: [
        {
          EventBusName: 'playhem',
          Detail: JSON.stringify(body),
          DetailType: type,
          Source: 'slack'
        }
      ]
    })
    .promise();
  return {
    statusCode: 200,
    body: null
  };
};
