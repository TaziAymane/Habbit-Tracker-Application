import { Stack } from "expo-router";
import LoginScreen from "./login";


export default function RootLayout() {
  return <>

    <Stack>
      <Stack.Screen name="index" options={{ title: "Home"}} />
      <Stack.Screen name="login" options={{ title:"Login"}} />
    </Stack>;
  </>

}
