import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function Index() {
  return (
    <View style={style.View}>

      <Text>Hello </Text>
      <Link href={"/login"}
      style={style.navButton}
      >Login Page</Link>
    </View>
  );
}

const style = StyleSheet.create({
  View : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navButton : {
    width: 100,
    height: 20,
    backgroundColor:"coral",
    borderRadius:8,
    textAlign:"center"
  }
})