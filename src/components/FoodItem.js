// src/components/FoodItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const FoodItem = ({ item, onAddToCart }) => {
  return (
    <View className="flex-row border-b border-gray-200 p-4">
      <Image
        source={{ uri: item.imageUrl }}
        className="rounded-lg"
        style={{ width: 200, height: 200 }}
      />
      <View className="ml-4 flex-1">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="my-1 text-gray-600">{item.description}</Text>
        <Text className="text-base font-bold text-green-500">${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          className="mt-2 items-center rounded bg-green-500 px-4 py-2"
          onPress={onAddToCart}>
          <Text className="font-bold text-white">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodItem;
