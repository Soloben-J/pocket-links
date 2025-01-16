import { Stack } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  // 初始化 AsyncStorage
  useEffect(() => {
    async function initStorage() {
      try {
        await AsyncStorage.getItem('test-key');
      } catch (e) {
        console.warn('AsyncStorage initialization error:', e);
      }
    }
    initStorage();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: '口袋链接',
          }}
        />
        <Stack.Screen
          name="webview"
          options={{
            title: '网页浏览',
            headerBackTitle: '返回',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
