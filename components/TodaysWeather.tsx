import {View, Text, Image} from 'react-native';
import React from 'react';
import {weatherImages} from '../constans';
import {WeatherData} from '../interface';

const TodaysWeather = ({weather}: {weather: WeatherData}) => {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-2">
      <Text className="text-white text-center text-2xl font-bold">
        {weather.location.name},
        <Text className="text-lg font-semibold text-gray-300">
          {weather.location.country}
        </Text>
      </Text>
      <View className="flex-row justify-center">
        <Image
          source={weatherImages[weather.current.condition.text || 'other']}
          className="w-52 h-52"
        />
      </View>
      <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {weather.current?.temp_c}&#176;
        </Text>
        <Text className="text-center text-white text-xl tracking-widest">
          {weather.current?.condition?.text}
        </Text>
      </View>
      <View className="flex-row justify-between mx-4">
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/wind.png')}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {weather.current?.wind_kph}km
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/drop.png')}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {weather.current?.humidity}%
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <Image
            source={require('../assets/icons/sun.png')}
            className="w-6 h-6"
          />
          <Text className="text-white font-semibold text-base">
            {weather?.forecast?.forecastday[0]?.astro?.sunrise}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TodaysWeather;
