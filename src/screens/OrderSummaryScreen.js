// src/screens/OrderSummaryScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const OrderSummaryScreen = ({ navigation }) => {
  const [submitting, setSubmitting] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    setSubmitting(true);
    try {
      const order = {
        items: cartItems,
        total,
        timestamp: new Date().toISOString(),
        status: 'pending',
      };

      await addDoc(collection(db, 'orders'), order);

      dispatch(clearCart());
      Alert.alert('Success', 'Your order has been placed successfully!', [
        { text: 'OK', onPress: () => navigation.navigate('Menu') },
      ]);
    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', 'Failed to submit order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4">
        <Text className="mb-6 text-2xl font-bold">Order Summary</Text>

        {cartItems.map((item) => (
          <View key={item.id} className="flex-row justify-between border-b border-gray-200 py-2">
            <View className="flex-1">
              <Text className="text-lg">{item.name}</Text>
              <Text className="text-gray-600">Quantity: {item.quantity}</Text>
            </View>
            <Text className="text-lg">${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
        ))}

        <View className="mt-6 flex-row justify-between border-t-2 border-gray-200 pt-4">
          <Text className="text-xl font-bold">Total:</Text>
          <Text className="text-xl font-bold text-green-500">${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          className={`${submitting ? 'bg-gray-500' : 'bg-green-500'} mt-8 rounded-lg p-4`}
          onPress={handleSubmitOrder}
          disabled={submitting}>
          <Text className="text-center text-lg font-bold text-white">
            {submitting ? 'Placing Order...' : 'Place Order'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderSummaryScreen;
