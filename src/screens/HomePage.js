import React, { useContext, useState } from "react";
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  Layout,
  TopNav,
  Text,
  Button as RapiButton,
  Button,
  useTheme,
  themeColor,
  Section,
} from "react-native-rapi-ui";
import { AuthContext } from "../provider/AuthProvider";
import Header from "./Header";
import { firebase } from "../config/firebase";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = useContext(AuthContext);
  const [isMenuVisible, setisMenuVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <Header navigation={navigation} showBackButton={false}></Header>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDarkmode ? "#17171E" : themeColor.danger600,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../assets/firelogo.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
              borderRadius: 25,
              marginLeft: 25,
              marginRight: 25,
              marginBottom: 25,
              marginTop: 25,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 20,
              }}
              size="h2"
            >
              Fire Emergency?
            </Text>
            <Text
              style={{
                alignSelf: "center",
              }}
            >
              Click below to take a snapshot &
            </Text>
            <Text
              style={{
                alignSelf: "center",
              }}
            >
              report to authorities instantly
            </Text>
            <Text></Text>
            <Text></Text>
            <Button
              text={"REPORT NOW"}
              rightContent={
                <MaterialIcons
                  name="report"
                  size={24}
                  color={themeColor.white}
                />
              }
              color={themeColor.danger600}
              size="lg"
              onPress={() => {
                navigation.navigate("ReportFire");
              }}
            />

            {/* {auth.user === true && (
              <Button
                text={"LOGOUT"}
                rightContent={
                  <MaterialIcons
                    name="logout"
                    size={24}
                    color={themeColor.white}
                  />
                }
                // status="danger"
                color={themeColor.danger600}
                size="lg"
                onPress={() => {
                  firebase.auth().signOut();
                  navigation.navigate("Auth", { screen: "Login" });
                }}
                style={{
                  marginTop: 10,
                }}
              />
            )} */}

            {auth.user === true && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 25,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity>
                  <Text
                    fontWeight="bold"
                    style={{
                      marginLeft: 5,
                      color: isDarkmode ? themeColor.white : themeColor.dark,
                      fontSize: 20,
                    }}
                    onPress={() => {
                      navigation.navigate("FireMap");
                    }}
                  >
                    Fire Map{" "}
                    <FontAwesome5
                      name="map"
                      size={24}
                      color={isDarkmode ? themeColor.white : themeColor.dark}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {auth.user !== true && (
              <View
                style={{
                  alignItems: "center",
                  marginTop: 30,
                  justifyContent: "center",
                }}
              >
                <Text
                  size="md"
                  style={{
                    alignSelf: "center",
                  }}
                >
                  Create an account to send your details along
                </Text>
                <Text
                  size="md"
                  style={{
                    alignSelf: "center",
                  }}
                >
                  with the report & see real-time updates
                </Text>
                <Text
                  size="md"
                  style={{
                    alignSelf: "center",
                  }}
                >
                  on fires near you
                </Text>
              </View>
            )}

            {auth.user !== true && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Auth", { screen: "Register" });
                  }}
                >
                  <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                      marginLeft: 5,
                      color: "#ff4500",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Auth", { screen: "Register" });
                      }}
                    >
                      <Text
                        size="md"
                        fontWeight="bold"
                        style={{
                          marginLeft: 5,
                          color: "#ff4500",
                        }}
                      >
                        Create an Account
                      </Text>
                    </TouchableOpacity>
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {auth.user !== true && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15,
                  justifyContent: "center",
                }}
              >
                <Text size="md">Already have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Auth", { screen: "Login" });
                  }}
                >
                  <Text
                    size="md"
                    fontWeight="bold"
                    style={{
                      marginLeft: 5,
                      color: "#ff4500",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
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
