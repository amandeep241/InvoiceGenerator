import { Stack } from "expo-router"
import { Image, Text, View, StyleSheet } from 'react-native';
export default function GenerateInvoiceLayout() {
  return (
    <Stack 
    screenOptions={{
      headerStyle: {
        backgroundColor: '#3F51B5',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
    >
        <Stack.Screen 
          name="Home" 
          // options= {{ title: "Create Invoice" }}
         
          >
        </Stack.Screen>
    </Stack>
  )
}