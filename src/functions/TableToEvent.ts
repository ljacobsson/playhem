import { DynamoDBStreamEvent } from 'aws-lambda';
import AWS, { EventBridge } from 'aws-sdk';
const eventBridge = new EventBridge();

exports.handler = async function (event: DynamoDBStreamEvent) {
  for (const record of event.Records) {
    const oldImg = record.dynamodb?.OldImage ? AWS.DynamoDB.Converter.unmarshall(record.dynamodb?.OldImage) : null;
    const newImg = record.dynamodb?.NewImage ? AWS.DynamoDB.Converter.unmarshall(record.dynamodb?.NewImage) : null;
    const type = newImg?.PK?.split('#')[0];

    const detail = {
      data: { old: oldImg, new: newImg },
      metadata: { op: record.eventName, timestamp: new Date().getTime() }
    };

    const result = await eventBridge
      .putEvents({
        Entries: [
          {
            EventBusName: 'playhem',
            Detail: JSON.stringify(detail),
            DetailType: type,
            Source: 'playhem-Table'
          }
        ]
      })
      .promise();
    console.log(result, type);
  }
};
