export const apiKey = 'a19f5062bc1441d1be0104308231310';

import {ImageURISource} from 'react-native';

export const weatherImages: Record<string, ImageURISource> = {
  'Partly cloudy':
    require('../assets/images/partlycloudy.png') as ImageURISource,
  'Moderate rain':
    require('../assets/images/moderaterain.png') as ImageURISource,
  'Patchy rain possible':
    require('../assets/images/moderaterain.png') as ImageURISource,
  Sunny: require('../assets/images/sun.png') as ImageURISource,
  Clear: require('../assets/images/sun.png') as ImageURISource,
  Overcast: require('../assets/images/cloud.png') as ImageURISource,
  Cloudy: require('../assets/images/cloud.png') as ImageURISource,
  'Light rain': require('../assets/images/moderaterain.png') as ImageURISource,
  'Moderate rain at times':
    require('../assets/images/moderaterain.png') as ImageURISource,
  'Heavy rain': require('../assets/images/heavyrain.png') as ImageURISource,
  'Heavy rain at times':
    require('../assets/images/heavyrain.png') as ImageURISource,
  'Moderate or heavy freezing rain':
    require('../assets/images/heavyrain.png') as ImageURISource,
  'Moderate or heavy rain shower':
    require('../assets/images/heavyrain.png') as ImageURISource,
  'Moderate or heavy rain with thunder':
    require('../assets/images/heavyrain.png') as ImageURISource,
  Mist: require('../assets/images/mist.png') as ImageURISource,
  other: require('../assets/images/moderaterain.png') as ImageURISource,
};
