// src/components/CartItem.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={tw`flex-row items-center border-b border-gray-200 p-4`}>
      <View style={tw`flex-1`}>
        <Text style={tw`text-lg font-bold`}>{item.name}</Text>
        <Text style={tw`text-gray-600`}>${(item.price * item.quantity).toFixed(2)}</Text>
      </View>

      <View style={tw`flex-row items-center`}>
        <TouchableOpacity
          style={tw`h-8 w-8 items-center justify-center rounded-full bg-gray-200`}
          onPress={() => onUpdateQuantity(Math.max(0, item.quantity - 1))}>
          <Text style={tw`text-lg`}>-</Text>
        </TouchableOpacity>

        <Text style={tw`mx-4 text-lg`}>{item.quantity}</Text>

        <TouchableOpacity
          style={tw`h-8 w-8 items-center justify-center rounded-full bg-gray-200`}
          onPress={() => onUpdateQuantity(item.quantity + 1)}>
          <Text style={tw`text-lg`}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={tw`ml-4`} onPress={onRemove}>
          <Text style={tw`text-lg text-red-500`}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
