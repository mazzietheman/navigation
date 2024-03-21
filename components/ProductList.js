import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/AuthContext";
export default ProductList = () => {
  const { handleLogout } = useAuth();
  const onPressLogout = async () => {
    try {
      await AsyncStorage.removeItem("appuser");
      handleLogout();
    } catch (error) {
      console.error("Error removing item from AsyncStorage: ", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>This is example product list page</Text>
      <Button title="Logout" onPress={onPressLogout} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
