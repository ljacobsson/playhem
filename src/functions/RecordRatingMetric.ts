import { createMetricsLogger, Unit } from 'aws-embedded-metrics';
import { UserUpdate } from './events/UserUpdate';

exports.handler = async function (event: UserUpdate) {
  const metrics = createMetricsLogger();
  metrics.setNamespace('Playhem');
  metrics.setDimensions({ Player: event.name });
  metrics.putMetric('Rating', event.rating, Unit.Count);
  await metrics.flush();
};
