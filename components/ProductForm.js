import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { baseUrl, getToken } from "../context/AuthContext";
export default ProductForm = ({ route, navigation }) => {
  const { productId } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [mimeType, setMimeType] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setImageUri(result.assets[0].uri);
      setMimeType(result.assets[0].mimeType);
    }
  };
  useEffect(() => {
    getProduct();
  }, [productId]);
  const getProduct = async () => {
    if (productId != "") {
      axios
        .get(`${baseUrl}/product/row/${productId}`, {
          headers: {
            Authorization: await getToken(),
          },
        })
        .then((res) => {
          setName(res.data.row.title);
          setDescription(res.data.row.description);
          if (res.data.row.image != "") {
            setImageUri(res.data.row.image);
            setImage(true);
          }
        })
        .catch((error) => {
          alert("Network error");
          console.log("Error sending data: ", error);
        });
    }
  };
  const onPressSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("title", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("mimeType", mimeType);
    axios
      .post(`${baseUrl}/product/save`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: await getToken(),
        },
      })
      .then((response) => {
        setLoading(false);
        navigation.navigate("AllProduct");
      })
      .catch((error) => {
        console.error("Error sending data: ", error);
        setLoading(false);
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Product</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="#999"
            />
          </View>
          <View style={styles.inputContainer}>
            <Button title="Select Image" onPress={pickImage} />
            {image && (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 300, height: 150 }}
              />
            )}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={onPressSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#20B2AA",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 120,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "contain",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 20,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#00BFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
};
