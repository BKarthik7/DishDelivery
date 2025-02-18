// src/components/CartItem.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View className="flex-row items-center border-b border-gray-200 p-4">
      <View className="flex-1">
        <Text className="text-lg font-bold">{item.name}</Text>
        <Text className="text-gray-600">${(item.price * item.quantity).toFixed(2)}</Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          onPress={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}>
          <Text className="text-lg">-</Text>
        </TouchableOpacity>

        <Text className="mx-4 text-lg">{item.quantity}</Text>

        <TouchableOpacity
          className="h-8 w-8 items-center justify-center rounded-full bg-gray-200"
          onPress={() => onUpdateQuantity(item.quantity + 1)}>
          <Text className="text-lg">+</Text>
        </TouchableOpacity>

        <TouchableOpacity className="ml-4" onPress={onRemove}>
          <Text className="text-lg text-red-500">✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
