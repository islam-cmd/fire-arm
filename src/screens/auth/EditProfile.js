import React, { useState } from "react";
import { FontAwesome,Ionicons, Feather,FontAwesome5,MaterialIcons } from '@expo/vector-icons';
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  ActivityIndicatorComponent,
  Modal,
  StyleSheet
} from "react-native";
import { getAuth , updateEmail } from "firebase/auth";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
    TopNav,
    Button as RapiButton,
  } from "react-native-rapi-ui";
  import { db } from "../../config/firebase";
  // import { Ionicons } from "@expo/vector-icons";
  // import { AuthContext } from "../provider/AuthProvider";
  
  export default function ({ navigation }) {

    const { isDarkmode, setTheme } = useTheme();
    const [loading, setLoading] = useState(false);
    const [isMenuVisible, setisMenuVisible] = useState(false);
  // const auth = useContext(AuthContext);
    //Initialising Variables
    const auth = getAuth();
    var currentuserid = "";
    const user = auth.currentUser;

    //Gets the current user's id
    if (user !== null) {
      currentuserid = user.uid;
    }

    //Create Object called "updateUserInfo" to store new data 
    const [updateUserInfo, setUserInfo] = useState({
      full_name: "",
      phone: "",
      email: "",
      emergency_name: "",
      emergency_phone: "",
    });

    //Create Object called "currentdocid" to store docid used for referencing to firestore
    const[currentdocid, setcurrentdocid] = useState("")

    //HandleInput to handle and update the "updateUserInfo" object
    const handleInput = (name, value) => {
      setUserInfo({ ...updateUserInfo, [name]: value });
    };

    //Return function to load current user data 
   function viewprofile() {
      db.collection("users")
    .where("id", "==", currentuserid)
    .get()
    .then(snap => { 
      snap.forEach(doc => {
        setcurrentdocid(doc.id);
        const Userdata = doc.data();
        setUserInfo(Userdata);
      });

    });
    }

    //Function which updates firestore with new data 
    async function editprofile() {
      const profileUpdate = db.collection("users")
      .doc(currentdocid)
      .update({
      full_name: updateUserInfo.full_name,
      email: updateUserInfo.email,
      phone: updateUserInfo.phone,
      emergency_name: updateUserInfo.emergency_name,
      emergency_phone: updateUserInfo.emergency_phone,
      });
              
      updateEmail(user, updateUserInfo.email).then(() => {
        console.log("Email Updated");
      }).catch((error) => {
        console.log("Email Update Error");
      });
      
    }

    //Condition which guarentee the "viewprofile" will only run once
    const [temp, setTemp] = useState(true);
    if (temp) { 
      viewprofile();
      setTemp(false);
    }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <TopNav
          middleContent="View Profile"
          leftContent={
            <Ionicons
              name="chevron-back"
              size={20}
              color={isDarkmode ? themeColor.white100 : themeColor.dark}
            />
          }
          leftAction={() => navigation.goBack()}
          rightContent={
            <Feather name="more-vertical" size={24} color={isDarkmode ? themeColor.white100 : themeColor.dark} />
          }
          rightAction={() => {
            setisMenuVisible(true);
          }}
          backgroundColor={themeColor.white}
          borderColor={themeColor.white}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: themeColor.white
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
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
              paddingTop: 5,
              paddingBottom: 20
            }}
          >
            <FontAwesome name="user-circle" size={80} color={themeColor.danger600} />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white200,
              // borderRadius: 40,
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
            }}
          >
            <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15, marginLeft: 15, marginRight: 15,}}
              placeholder="Name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.full_name}
              onChangeText={(value) => handleInput("full_name", value)}
            />

            <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15, }}>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
              placeholder="Email"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              value={updateUserInfo.email}
              onChangeText={(value) => handleInput("email", value)}
            />

            <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>Phone Number</Text>
            <TextInput
              containerStyle={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
              placeholder="Phone Number"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.phone}
              onChangeText={(value) => handleInput("phone", value)}
            />

            <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>Emergency Contact Name</Text>
            <TextInput
              containerStyle={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
              placeholder="Emergency Contact Name"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.emergency_name}
              onChangeText={(value) => handleInput("emergency_name", value)}
            />

            <Text style={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}>Emergency Contact Number</Text>
            <TextInput
              containerStyle={{ marginTop: 15, marginLeft: 15, marginRight: 15 }}
              placeholder="Emergency Contact Number"
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              value={updateUserInfo.emergency_phone}
              onChangeText={(value) => handleInput("emergency_phone", value)}
            />

            <Button
              text={loading ? "Loading" : "Update"}
              onPress={() => {
                editprofile();
              }}
              color={themeColor.danger600}
              style={{
                marginTop: 20,
                marginLeft: 15, marginRight: 15
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
            </View>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isMenuVisible}
        >
          <View style={styles.centeredView}>
            <View
              style={isDarkmode ? styles.modalViewDark : styles.modalViewLight}
            >
            <View
              style={{
                paddingBottom: 9,
                width: 140
              }}
            >
              <RapiButton
                onPress={() => {
                  navigation.navigate("App", {screen: "HomePage",});
                  setisMenuVisible(false);
                }}
                text="Home Page"
                leftContent={<FontAwesome5 name="home" size={24} color="white" />}
                color= {themeColor.danger600}
              />
            </View>
            <View
              style={{
                paddingBottom: 9,
                width: 140
              }}
            >
              <RapiButton   
                onPress={() => {
                  navigation.navigate("App", {screen: "SubmissionConfirm",});
                  setisMenuVisible(false);
                }}
                leftContent={
                  <MaterialIcons name="logout" size={24} color="white" />
                }
                text="Logout"
                color= {themeColor.danger600}
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
              leftContent={<Ionicons name={isDarkmode ? "sunny" : "moon"} size={20} color={isDarkmode ? themeColor.white100 : themeColor.dark}/>}
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
                setisMenuVisible(false);
              }}
              text={<Ionicons name="ios-close" size={24} color="black" />}
              color="white"
            />
          </View>
        </View>
      </View>
    </Modal>
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