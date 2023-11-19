import { React, useEffect, useRef, useState, useContext } from "react";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
  Button as RapiButton,
} from "react-native-rapi-ui";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { saveImageFB } from "./utils/FBStorage";
import { getImageLabel } from "./utils/fireDetection";
import { AuthContext } from "../provider/AuthProvider";
import Header from "./Header";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isMenuVisible, setisMenuVisible] = useState(false);
  const [isFire, setIsFire] = useState(true); // Assume worst-case scenario
  const auth = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  let takePic = async () => {
    let options = {
      quality: 0.25,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    let result = await getImageLabel(newPhoto); // Return value is a string NOT an array
    let resultAsArray = JSON.parse(result);
    let probabilties = resultAsArray["probabilities"]; 
    console.log(probabilties[0]);
    if (probabilties[0] > 0.7) {  // If the probability of fire is greater than 70%
      setIsFire(true);
    } else {
      setIsFire(false);
    }
    setPhoto(newPhoto);
  };

  let savePhoto = () => {
    saveImageFB(photo.uri, auth.userID).then(() => {
      setIsPhotoSaved(true);
      setisModalVisible(true);
    });
  };

  if (photo) {
    if (isPhotoSaved) {
      return (
        <View style={isDarkmode ? styles.container : styles.container}>
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
          >
            <View style={styles.centeredView}>
              <View
                style={
                  isDarkmode ? styles.modalViewDark : styles.modalViewLight
                }
              >
                {isFire ? (
                  <Text
                    style={{
                      alignSelf: "center",
                      paddingBottom: 15,
                      color: "#FF1414",
                    }}
                    size="h2"
                    fontWeight="medium"
                  >
                    FIRE DETECTED!
                  </Text>
                ) : (
                  <Text
                    style={{
                      alignSelf: "center",
                      paddingBottom: 15,
                      color: "#4BAD4F",
                    }}
                    size="h2"
                    fontWeight="medium"
                  >
                    NO FIRE DETECTED!
                  </Text>
                )}

                {isFire ? (
                  <Text
                    size="md"
                    style={
                      isDarkmode ? styles.modelTextDark : styles.modelTextLight
                    }
                  >
                    Click below to connect with a 000 call operator.
                  </Text>
                ) : (
                  <Text
                    size="md"
                    style={
                      isDarkmode ? styles.modelTextDark : styles.modelTextLight
                    }
                  >
                    You’re in no immediate danger. Click below to send a report
                    to 000 call operator
                  </Text>
                )}
                <View
                  style={{
                    paddingBottom: 9,
                  }}
                >
                  <RapiButton
                    onPress={() => {
                      navigation.navigate("App", {
                        screen: "SubmissionConfirm",
                      });
                      setisModalVisible(false);
                    }}
                    text="Connect to 000"
                    color={themeColor.danger600}
                  />
                </View>

                <Text
                  size="sm"
                  style={
                    isDarkmode ? styles.modelTextDark : styles.modelTextLight
                  }
                >
                  Do not wish to report through the app?{" "}
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("App", { screen: "HomePage" });
                    }}
                  >
                    <Text
                      size="sm"
                      style={{
                        textDecorationLine: "underline",
                        color: "#3366FF",
                      }}
                    >
                      Go back
                    </Text>
                  </TouchableOpacity>
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      );
    } else if (!isPhotoSaved) {
      {
        savePhoto();
      }
      return (
        <SafeAreaView
          style={isDarkmode ? styles.containerDark : styles.containerLight}
        >
          <Image
            style={styles.preview}
            source={{ uri: "data:image/jpg;base64," + photo.base64 }}
          />
        </SafeAreaView>
      );
    }
  }

  return (
    <Layout>
      <Header navigation={navigation} title="Report Fire"></Header>
      <Camera style={styles.containerLight} ref={cameraRef}>
        <TouchableOpacity onPress={takePic}>
          <View style={styles.buttonContainer}>
            <Ionicons
              name="ellipse-outline"
              size={90}
              color={themeColor.white100}
            ></Ionicons>
          </View>
        </TouchableOpacity>
      </Camera>
    </Layout>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  modalViewDark: {
    margin: 20,
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalViewLight: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modelTextDark: {
    paddingBottom: 15,
    color: "white",
    opacity: 0.5,
    textAlign: "center",
  },
  modelTextLight: {
    paddingBottom: 15,
    color: "#000000",
    opacity: 0.5,
    textAlign: "center",
  },
});
