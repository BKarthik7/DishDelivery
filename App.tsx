import { ScreenContent } from './src/components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { db } from './src/firebase/config';
import { collection, getDocs } from 'firebase/firestore';

import './global.css';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const App = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'testing'));
      const docsData = querySnapshot.docs.map((doc) => doc.data());
      setData(docsData);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Data from Firestore:</Text>
      {data.map((item, index) => (
        <View key={index}>
          <Text>{JSON.stringify(item, null, 2)}</Text>
        </View>
      ))}
    </View>
  );
};

export default App;