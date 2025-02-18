// src/components/FoodItem.js

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const FoodItem = ({ item, onAddToCart }) => {
  return (
    <View style={tw`flex-row border-b border-gray-200 p-4`}>
      <Image
        source={{ uri: item.imageUrl }}
        style={tw`rounded-lg w-24 h-24`}
      />
      <View style={tw`ml-4 flex-1`}>
        <Text style={tw`text-lg font-bold`}>{item.name}</Text>
        <Text style={tw`my-1 text-gray-600`}>{item.description}</Text>
        <Text style={tw`text-base font-bold text-green-500`}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity
          style={tw`mt-2 items-center rounded bg-green-500 px-4 py-2`}
          onPress={onAddToCart}>
          <Text style={tw`font-bold text-white`}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FoodItem;
