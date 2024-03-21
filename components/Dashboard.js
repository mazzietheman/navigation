import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faMugHot } from "@fortawesome/free-solid-svg-icons/faMugHot";
import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import AllProduct from "./AllProduct";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import AllCustomer from "./AllCustomer";
import CustomerForm from "./CustomerForm";

import Home from "./Home";
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home1" component={Home} />
    </HomeStack.Navigator>
  );
}
const ProductStack = createNativeStackNavigator();
function ProductStackScreen() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen name="AllProduct" component={AllProduct} />
      <ProfileStack.Screen name="ProductForm" component={ProductForm} />
    </ProductStack.Navigator>
  );
}

const CustomerStack = createNativeStackNavigator();
function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator>
      <CustomerStack.Screen name="Allcustomer" component={AllCustomer} />
      <CustomerStack.Screen name="CustomerForm" component={CustomerForm} />
    </CustomerStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProductList" component={ProductList} />
    </ProfileStack.Navigator>
  );
}

export default function Dashboard({ onLogout }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return (
                <FontAwesomeIcon
                  icon={faHouse}
                  style={focused ? styles.tabIconAcive : styles.tabIcon}
                />
              );
            } else if (route.name === "Product") {
              return (
                <FontAwesomeIcon
                  icon={faMugHot}
                  style={focused ? styles.tabIconAcive : styles.tabIcon}
                />
              );
            } else if (route.name === "Profile") {
              return (
                <FontAwesomeIcon
                  icon={faPlus}
                  style={focused ? styles.tabIconAcive : styles.tabIcon}
                />
              );
            } else if (route.name === "Customer") {
              return (
                <FontAwesomeIcon
                  icon={faUsers}
                  style={focused ? styles.tabIconAcive : styles.tabIcon}
                />
              );
            }
          },
          tabBarInactiveTintColor: "gray",
          tabBarActiveTintColor: "tomato",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Product" component={ProductStackScreen} />
        <Tab.Screen name="Profile" component={ProfileStackScreen} />
        <Tab.Screen name="Customer" component={CustomerStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  tabIcon: {
    color: "#aaaaaa",
  },
  tabIconAcive: {
    color: "#ff0000",
  },
});
