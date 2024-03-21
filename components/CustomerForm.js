import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Pressable,
  Alert,
  RefreshControl,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { baseUrl, getToken } from "../context/AuthContext";
export default AllCustomer = ({ navigation }) => {
  const [customers, setCustomers] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const getCustomers = async () => {
    axios
      .get(`${baseUrl}/customer/list`, {
        headers: {
          Authorization: await getToken(),
        },
      })
      .then((res) => {
        setCustomers(res.data);
        setRefreshing(false);
      })
      .catch((error) => {
        alert("Network error");
        console.error("Error sending data: ", error);
        setRefreshing(false);
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getCustomers();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  const onPressDelete = async (id) => {
    axios
      .delete(`${baseUrl}/customer/${id}`, {
        headers: {
          Authorization: await getToken(),
        },
      })
      .then((res) => {
        getCustomers();
      })
      .catch((error) => {
        Alert.alert("Failed", "delete unsuccesfull!");
        console.error("Error delete data: ", error);
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getCustomers();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.list}
        data={customers}
        keyExtractor={(item) => {
          return item.id;
        }}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={(post) => {
          const item = post.item;
          return (
            <View style={styles.card}>
              <Image style={styles.cardImage} source={{ uri: item.image }} />
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <View style={styles.timeContainer}>
                    <Image
                      style={styles.iconData}
                      source={{
                        uri: "https://img.icons8.com/color/96/3498db/calendar.png",
                      }}
                    />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("CustomerForm", {
                          customerId: item.id,
                        })
                      }
                      style={styles.socialBarButton}
                    >
                      <FontAwesomeIcon icon={faPen} style={styles.icon} />
                      <Text style={styles.socialBarLabel}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.socialBarSection}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressDelete(item.id);
                      }}
                      style={styles.socialBarButton}
                    >
                      <FontAwesomeIcon icon={faTrash} style={styles.icon} />
                      <Text style={styles.socialBarLabel}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      />
      <Pressable
        style={styles.addBtn}
        onPress={() =>
          navigation.navigate("CustomerForm", {
            customerId: "",
          })
        }
      >
        <Text style={styles.addText}>Create New</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor: "#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "white",
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor: "#EEEEEE",
  },
  cardImage: {
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title: {
    fontSize: 18,
    flex: 1,
  },
  description: {
    fontSize: 15,
    color: "#888",
    flex: 1,
    marginTop: 5,
    marginBottom: 5,
  },
  time: {
    fontSize: 13,
    color: "#808080",
    marginTop: 5,
  },
  icon: {
    color: "#2ECC71",
    width: 20,
    height: 20,
    marginTop: 0,
    marginRight: 5,
  },
  iconData: {
    width: 15,
    height: 15,
    marginTop: 5,
    marginRight: 5,
  },
  timeContainer: {
    flexDirection: "row",
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarSection: {
    justifyContent: "center",
    flexDirection: "row",
    flex: 1,
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: "flex-end",
    justifyContent: "center",
    color: "#2ECC71",
  },
  socialBarButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "green",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  addText: {
    color: "#ffffff",
  },
});
