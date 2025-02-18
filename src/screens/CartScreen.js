// src/screens/CartScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import tw from 'twrnc';

const CartScreen = ({ navigation }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-lg text-gray-600`}>Your cart is empty</Text>
        <TouchableOpacity
          style={tw`mt-4 bg-green-500 px-6 py-3 rounded-lg`}
          onPress={() => navigation.navigate('Menu')}>
          <Text style={tw`text-white font-bold`}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => dispatch(removeFromCart(item.id))}
            onUpdateQuantity={(quantity) => dispatch(updateQuantity({ id: item.id, quantity }))}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <View style={tw`p-4 border-t border-gray-200`}>
        <Text style={tw`text-xl font-bold mb-4`}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity
          style={tw`bg-green-500 p-4 rounded-lg items-center`}
          onPress={() => navigation.navigate('OrderSummary')}>
          <Text style={tw`text-white font-bold text-lg`}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
