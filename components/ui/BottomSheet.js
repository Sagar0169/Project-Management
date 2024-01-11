import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

function BottomSheet({ sports, handleSportSelection }) {
    return (
      <View style={styles.modalContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.modalTitle}>Select Members</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          {/* Dynamically generate Pressable components based on the array */}
          {sports.map((sport, index) => (
            <Pressable key={index} onPress={() => handleSportSelection(sport)}>
              <Text style={styles.modalItem}>{sport}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
export default BottomSheet;

const styles=StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        
        padding: 16,
        height: '100%', // Set the height to cover half of the screen
        borderRadius: 15,
        
    },
    modalTitle: {
        fontSize: 18,

        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalItem: {
        fontSize: 16,
        borderBottomColor:'black',
        borderBottomWidth:2,
        marginBottom: 12,
    },
})