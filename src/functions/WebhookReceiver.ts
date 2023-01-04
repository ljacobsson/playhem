import { APIGatewayProxyEvent } from 'aws-lambda';
import { EventBridge } from 'aws-sdk';
import * as qs from 'querystring';

const eventBridge = new EventBridge();
exports.handler = async function (event: APIGatewayProxyEvent) {
  const body = qs.parse(event.body || '');
  console.log(body, event.body);
  let type;
  if (body.payload) {
    const payload = JSON.parse(body.payload.toString());
    type = payload.type;
    body.payload = payload;
    if (type === 'view_submission') {
      type = payload.view.callback_id;
    }
  } else {
    type = 'slash_command';
  }
  console.log('type', type);
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
