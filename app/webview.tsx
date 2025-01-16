import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';
import { useCallback, useState } from 'react';

export default function WebViewScreen() {
  const { url } = useLocalSearchParams<{ url: string }>();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (!url) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: decodeURIComponent(url) }}
        onLoadEnd={handleLoadEnd}
        style={{ flex: 1 }}
      />
      {isLoading && (
        <ActivityIndicator
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [{ translateX: -25 }, { translateY: -25 }],
          }}
          size="large"
        />
      )}
    </View>
  );
}