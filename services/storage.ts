import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedLink } from '@/types/link';

const STORAGE_KEY = 'pocket_links';

export const storage = {
  async saveLink(link: Omit<SavedLink, 'id' | 'createdAt'>) {
    try {
      const links = await this.getLinks();
      const newLink: SavedLink = {
        ...link,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newLink, ...links]));
      return newLink;
    } catch (error) {
      console.error('Error saving link:', error);
      return null;
    }
  },

  async getLinks(): Promise<SavedLink[]> {
    try {
      const links = await AsyncStorage.getItem(STORAGE_KEY);
      return links ? JSON.parse(links) : [];
    } catch (error) {
      console.error('Error getting links:', error);
      return [];
    }
  },

  async deleteLink(id: string) {
    try {
      const links = await this.getLinks();
      const filteredLinks = links.filter(link => link.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLinks));
    } catch (error) {
      console.error('Error deleting link:', error);
    }
  },

  async toggleReadStatus(id: string) {
    try {
      const links = await this.getLinks();
      const updatedLinks = links.map(link => 
        link.id === id ? { ...link, isRead: !link.isRead } : link
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLinks));
    } catch (error) {
      console.error('Error toggling read status:', error);
    }
  }
}; 