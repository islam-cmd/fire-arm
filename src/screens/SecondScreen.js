import React, { useState } from "react";
import { 
  View,
  Linking,  
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image, } from "react-native";
import {
  Layout,
  Button,
  Text,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { useCamera, useFile } from "./utils/FBStorage";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

  return (
    <Layout>
      <TopNav
        middleContent="Second Screen"
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
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
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      > 
        <Button text="1" onPress={useFile} />
        <Button text="2" onPress={useCamera} />
        <Text fontWeight="bold">user</Text>
      </View>
    </Layout>
  );
}
