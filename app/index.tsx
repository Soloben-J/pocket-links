import { useState, useCallback, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { storage } from '@/services/storage';
import { SavedLink } from '@/types/link';
import LinkCard from '@/components/LinkCard';
import { AddLinkModal } from '@/components/AddLinkModal';

function Index() {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadLinks = useCallback(async () => {
    try {
      setIsLoading(true);
      const savedLinks = await storage.getLinks();
      setLinks(savedLinks);
    } catch (error) {
      console.error('Error loading links:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const handleAddLink = async (url: string) => {
    await storage.saveLink({
      url,
      title: url,
      description: '',
      isRead: false,
    });
    loadLinks();
  };

  const handleOpenLink = (link: SavedLink) => {
    router.push(`/webview?url=${encodeURIComponent(link.url)}`);
  };

  const handleDeleteLink = async (id: string) => {
    await storage.deleteLink(id);
    loadLinks();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#999" />

      <ScrollView style={styles.scrollView}>
        {links.map(link => (
          <LinkCard
            key={link.id}
            image={link.thumbnail || "https://via.placeholder.com/300x150"}
            title={link.title}
            description={link.description || "点击查看"}
            onButtonPress={() => handleOpenLink(link)}
            onDelete={() => handleDeleteLink(link.id)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsAddModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>

      <AddLinkModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={handleAddLink}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default Index;
