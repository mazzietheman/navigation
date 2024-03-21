import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
export default Home = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is home example page</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  tabIcon: {
    color: "#aaaaaa",
  },
  tabIconAcive: {
    color: "#ff0000",
  },
});
