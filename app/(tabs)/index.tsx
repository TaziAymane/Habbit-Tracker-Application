import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "@/lib/auth-context";
export default function Index() {
  const { SignOut } = useAuth();
  return (
    <View style={style.View}>
      <Text>Hello </Text>
      <Button mode="text" onPress={SignOut} icon={"logout"}>
        Sign Out
      </Button>
    </View>
  );
}

const style = StyleSheet.create({
  View: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
