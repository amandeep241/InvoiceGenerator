import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
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
      Stack.Screen
        name="home" // This name can reflect the file name, like "home.js"
        options={({ route }) => ({
          title: route.name === 'index' ? 'Home' : 'Default Title',
        })}
      />
    </Stack>
  );
}
