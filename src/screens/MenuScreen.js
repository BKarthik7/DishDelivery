// src/screens/MenuScreen.js

import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import FoodItem from '../components/FoodItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

const MenuScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menuItems'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <TouchableOpacity
        style={tw`absolute right-4 top-4 z-10`}
        onPress={() => navigation.navigate('Cart')}>
        <Icon name="shopping-cart" size={30} color="#10B981" />
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        renderItem={({ item }) => (
          <FoodItem item={item} onAddToCart={() => dispatch(addToCart(item))} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tw`pb-4`} // Using twrnc for padding bottom
      />
    </View>
  );
};

export default MenuScreen;
