import { Tabs } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return <>

    <Tabs screenOptions={{tabBarActiveTintColor : 'coral'}}>
      <Tabs.Screen name="index" options={{ 
        title: "Home" ,
        tabBarIcon : ({color})=>{
          return <Feather name="home" size={24} color={color} />
        },
        }} />
      <Tabs.Screen name="login" options={{
        title:"Login",
        tabBarIcon : ({color})=>{
          return <MaterialCommunityIcons name="login" size={24} color={color} />
        }
        }} />
    </Tabs>;
  </>

}
