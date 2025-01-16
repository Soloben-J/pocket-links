import { StyleSheet, View, Text } from "react-native";

export default function LinkCard() {
  return (
    <View style={styles.container}>
      <Text>
        This is a link card.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#999999',
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
