import { Stack } from 'expo-router';
import FeedScreen from '../screens/FeedScreen'; // adjust path if needed


export default function HomeScreen() {
  return (<>
  <Stack.Screen options={{title : "Sortir à Paris"}}/>
    <FeedScreen />
  </>)
}