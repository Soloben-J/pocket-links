import { forwardRef } from 'react';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LinkCardProps {
  image: string;
  title: string;
  description: string;
  onButtonPress: () => void;
  onDelete?: () => void;
}

const LinkCard = forwardRef<View, LinkCardProps>((props, ref) => {
  const { image, title, description, onButtonPress, onDelete } = props;
  
  return (
    <Pressable ref={ref} onPress={onButtonPress}>
      <View style={styles.card}>
        <Image 
          source={{ uri: image }} 
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        {onDelete && (
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={onDelete}
          >
            <Ionicons name="trash-outline" size={20} color="#FF3B30" />
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
  },
});

export default LinkCard;
