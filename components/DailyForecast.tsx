import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {theme} from '../theme';
import {weatherImages} from '../constans';
import {WeatherData} from '../interface';

const DailyForecast = ({weather}: {weather: WeatherData}) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{paddingHorizontal: 15}}
      showsHorizontalScrollIndicator={false}>
      {weather?.forecast?.forecastday?.map((item, index) => {
        const date = new Date(item.date);
        const options: object = {weekday: 'long'};
        let dayName = date.toLocaleDateString('en-US', options);
        dayName = dayName.split(',')[0];

        return (
          <View
            key={index}
            className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4"
            style={{backgroundColor: theme.bgWhite(0.15)}}>
            <Image
              source={weatherImages[item?.day?.condition?.text || 'other']}
              className="w-11 h-11"
            />
            <Text className="text-white">{dayName}</Text>
            <Text className="text-white text-xl font-semibold">
              {item?.day?.avgtemp_c}&#176;
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default DailyForecast;
