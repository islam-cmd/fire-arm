import { React, useState, useContext } from "react";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { StyleSheet, View, Modal } from "react-native";
import { firebase } from "../config/firebase";
import {
  TopNav,
  themeColor,
  useTheme,
  Button as RapiButton,
} from "react-native-rapi-ui";
import { AuthContext } from "../provider/AuthProvider";

export default function ({ navigation, title = null, showBackButton = true }) {
  const { isDarkmode, setTheme } = useTheme();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const auth = useContext(AuthContext);

  function LeftContent() {
    if (showBackButton) {
      return (
        <Ionicons
          name="chevron-back"
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      );
    }
  }

  function LeftAction() {
    if (showBackButton) {
      navigation.goBack();
    }
  }

  function RightContent() {
    if (auth.user === true) {
      return (
        <Feather
          name="more-vertical"
          size={24}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      );
    } else {
      return (
        <Ionicons
          name={isDarkmode ? "sunny" : "moon"}
          size={20}
          color={isDarkmode ? themeColor.white100 : themeColor.dark}
        />
      );
    }
  }

  function RightAction() {
    if (auth.user === true) {
      setIsMenuVisible(true);
    } else {
      if (isDarkmode) {
        setTheme("light");
      } else {
        setTheme("dark");
      }
    }
  }

  return (
    <>
      <TopNav
        middleContent={title}
        leftContent={LeftContent()}
        leftAction={LeftAction}
        rightContent={RightContent()}
        rightAction={RightAction}
      />

      <Modal animationType="slide" transparent={true} visible={isMenuVisible}>
        <View style={styles.centeredView}>
          <View
            style={isDarkmode ? styles.modalViewDark : styles.modalViewLight}
          >
            <View
              style={{
                paddingBottom: 9,
                width: 140,
              }}
            >
              <RapiButton
                onPress={() => {
                  navigation.navigate("Auth", {
                    screen: "EditProfile",
                  });
                  setIsMenuVisible(false);
                }}
                text="Edit Profile"
                leftContent={
                  <FontAwesome5 name="user" size={24} color="white" />
                }
                color="#ff4500"
              />
            </View>
            <View
              style={{
                paddingBottom: 9,
                width: 140,
              }}
            >
              <RapiButton
                onPress={() => {
                  firebase.auth().signOut();
                  navigation.navigate("Auth", { screen: "Login" });
                  setIsMenuVisible(false);
                }}
                leftContent={
                  <MaterialIcons name="logout" size={24} color="white" />
                }
                text="Logout"
                color="#ff4500"
              />
            </View>
            <View
              style={{
                paddingBottom: 9,
              }}
            >
              <RapiButton
                onPress={() => {
                  if (isDarkmode) {
                    setTheme("light");
                  } else {
                    setTheme("dark");
                  }
                }}
                leftContent={
                  <Ionicons
                    name={isDarkmode ? "sunny" : "moon"}
                    size={20}
                    color={isDarkmode ? themeColor.white100 : themeColor.dark}
                  />
                }
                color="white"
              />
            </View>
            <View
              style={{
                paddingBottom: 9,
              }}
            >
              <RapiButton
                onPress={() => {
                  setIsMenuVisible(false);
                }}
                text={<Ionicons name="ios-close" size={24} color="black" />}
                color="white"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  },
  modelTextLight: {
    paddingBottom: 15,
    color: "#000000",
    opacity: 0.5,
  },
});
