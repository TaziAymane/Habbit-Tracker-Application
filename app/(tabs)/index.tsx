import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View style={style.View}>

      <Text>Hello </Text>
      
    </View>
  );
}

const style = StyleSheet.create({
  View : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
 
})