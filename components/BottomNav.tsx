import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabIcon from './TabIcon';
import SharedStackNav from './SharedStackNav';

const Tabs = createBottomTabNavigator();

function BottomNav() {
  const isLoggedIn = false;
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: 'rgba(255, 255, 255, 0.3)',
          backgroundColor: 'black',
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name="home" color={color} isFocused={focused} />
          ),
        }}>
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Auth"
        options={{
          tabBarIcon: ({ focused, color }) =>
            isLoggedIn ? (
              <TabIcon
                name="heart"
                color={color}
                isFocused={focused}
              />
            ) : (
              <TabIcon
                name="person"
                color={color}
                isFocused={focused}
              />
            ),
        }}>
        {() =>
          isLoggedIn ? (
            <SharedStackNav screenName="Profile" />
          ) : (
            <SharedStackNav screenName="Login" />
          )
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

export default BottomNav;
