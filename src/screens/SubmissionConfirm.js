import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  FlatList,
} from "react-native";
import {
  Layout,
  Text,
  Button,
  useTheme,
  themeColor,
  Section,
  TopNav,
} from "react-native-rapi-ui";
import { firebase } from "../config/firebase";
import Header from "./Header";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: isDarkmode ? "#17171E" : themeColor.danger600,
          }}
        >
          <Header navigation={navigation} showBackButton={false}></Header>
          {/* <TopNav
            leftContent={
              <Ionicons name="chevron-back" size={24} color="black" />
            }
            leftAction={() => navigation.goBack()}
            rightContent={
              <Ionicons
                name={isDarkmode ? "sunny" : "moon"}
                size={20}
                color={isDarkmode ? themeColor.white100 : themeColor.dark}
              />
            }
            rightAction={() => {
              if (isDarkmode) {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
            middleContent="Submission Confirmation"
            backgroundColor={themeColor.white}
            borderColor={themeColor.black}
          /> */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <FontAwesome5 name="check-circle" size={90} color="red" />
            </Text>
            <Text
              style={{
                alignSelf: "center",
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
                paddingBottom: 15,
              }}
              size="xl"
            >
              You have submitted a report of a fire. The authorities are being
              informed.
            </Text>
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
                paddingBottom: 10,
              }}
              size="h3"
            >
              What can you do next?
            </Text>
            <View
              style={{
                flex: 1,
                paddingTop: 22,
                paddingBottom: 0,
              }}
            >
              <ScrollView>
                <Text
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  <Entypo name="dot-single" size={20} color="black" />
                  Go inside but stay alert
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  <Entypo name="dot-single" size={20} color="black" />
                  Shelter in a room on the opposite side of the house from the
                  approaching fire and one that has a clear exit out of the
                  house
                </Text>
                <Text
                  style={{
                    paddingBottom: 10,
                  }}
                >
                  <Entypo name="dot-single" size={20} color="black" />
                  Patrol inside the house, including the roof space looking for
                  sparks and embers
                </Text>
                <Text>
                  <Entypo name="dot-single" size={20} color="black" />
                  Protect yourself from the heat of the fire{" "}
                </Text>
              </ScrollView>
            </View>
            {/* <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5
            }}
            
            ><Entypo name="dot-single" size={20} color="black" />Go inside but stay alert</Text>
            <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5,
              textAlign: "left"
            }}
            >
              <Entypo name="dot-single" size={20} color="black" />
              Shelter in a room on the opposite side of the house from the approaching fire and one that has a clear exit out of the house</Text>
              <Text
            style={{
              alignSelf: "flex-start",
              paddingBottom: 5
            }}
            >
              <Entypo name="dot-single" size={20} color="black" />
              Patrol inside the house, including the roof space looking for sparks and embers</Text>
              <Text
            style={{
              alignSelf: "flex-start",
            }}

            ><Entypo name="dot-single" size={20} color="black" />Protect yourself from the heat of the fire </Text>
            <Text></Text>
            <Text></Text> */}
            <Button
              text={"Home Page"}
              color={themeColor.danger600}
              size="lg"
              onPress={() => {
                navigation.navigate("HomePage");
              }}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 50,
                justifyContent: "center",
              }}
            ></View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
