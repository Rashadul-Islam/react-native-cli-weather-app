/* eslint-disable react-hooks/exhaustive-deps */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../theme';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import * as Progress from 'react-native-progress';
import {getData, storeData} from '../utils/asyncStorage';
import DailyForecast from '../components/DailyForecast';
import {Location, WeatherData} from '../interface';
import SearchSuggestion from '../components/SearchSuggestion';
import TodaysWeather from '../components/TodaysWeather';

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const handleSearch = (search: string) => {
    if (search && search.length > 2) {
      fetchLocations(search).then(data => {
        setLocations(data);
      });
    }
  };

  const handleLocation = (loc: Location) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Dhaka';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  return (
    <View className="flex-1 relative">
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className="absolute w-full h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          <KeyboardAvoidingView
            enabled={false}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <View style={{height: '7%'}} className="mx-4 mt-2 relative z-50">
              <View
                className="flex-row justify-end items-center rounded-full"
                style={{
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : 'transparent',
                }}>
                {showSearch ? (
                  <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search city"
                    placeholderTextColor={'lightgray'}
                    className="pl-6 h-10 pb-2 flex-1 text-base text-white"
                  />
                ) : null}
                <TouchableOpacity
                  onPress={() => toggleSearch(!showSearch)}
                  className="rounded-full p-3 m-1"
                  style={{
                    backgroundColor: showSearch
                      ? theme.bgWhite(0.3)
                      : 'transparent',
                  }}>
                  {showSearch ? (
                    <XMarkIcon size="25" color="white" />
                  ) : (
                    <MagnifyingGlassIcon size="25" color="white" />
                  )}
                </TouchableOpacity>
              </View>
              {locations.length > 0 && showSearch ? (
                <SearchSuggestion
                  locations={locations}
                  handleLocation={handleLocation}
                />
              ) : null}
            </View>
            {weather && <TodaysWeather weather={weather} />}
            <View className="mb-3 space-y-3">
              <View className="flex-row items-center mx-5 space-x-2">
                <CalendarDaysIcon size="22" color="white" />
                <Text className="text-white text-base mb-3">
                  Daily forecast
                </Text>
              </View>
              {weather && <DailyForecast weather={weather} />}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )}
    </View>
  );
}
