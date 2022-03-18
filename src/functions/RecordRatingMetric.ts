import { createMetricsLogger, Unit } from 'aws-embedded-metrics';
import { PlayerRating } from './events/PlayerRating';

exports.handler = async function (event: PlayerRating) {
  const metrics = createMetricsLogger();
  metrics.setNamespace('Playhem');
  metrics.setDimensions({ Player: event.name });

  metrics.putMetric('Rating', event.rating, Unit.Count);
  await metrics.flush();
};
