import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validEmail, setvalidEmail] = useState(false);
  const [checkPassword, setcheckPassword] = useState("");

  const handleEmail = (text) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setvalidEmail(false);
    } else {
      setvalidEmail(true);
    }
  };
  //we might remove this password check and move it into registration. I think it might make more sense there or we can keep it in both places.
  const checkPasswordValidity = (value) => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return "Password must not contain Whitespaces.";
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return "Password must have at least one Uppercase Character.";
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return "Password must have at least one Lowercase Character.";
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return "Password must contain at least one Digit.";
    }

    const isValidLength = /^.{6,16}$/;
    if (!isValidLength.test(value)) {
      return "Password must be 6-16 Characters Long.";
    }

    return null;
  };

  async function login() {
    setcheckPassword(checkPasswordValidity(password));
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setLoading(false);
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Login Failed", "Invalid email, try again.");
          break;

        case "auth/invalid-password":
          Alert.alert("Login Failed", "Incorrect password, try again.");
          break;

        case "auth/invalid-credential":
          Alert.alert(
            "Login Failed",
            "Incorrect username or password, try again."
          );
          break;

        default:
          Alert.alert(
            "Login Failed",
            "Email and password combination does not match."
          );
      }
    }).then((userCredential) => {
      setLoading(false);
      
      if (userCredential !== undefined) {
        navigation.navigate('App', {screen: 'HomePage'});
      }
    });
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            }}
          >
            <Image
              resizeMode="cover"
              style={{
                height: 220,
                width: 220,
              }}
              source={require("../../../assets/login.png")}
            />
          </View>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 30,
              }}
              size="h2"
            >
              Login
            </Text>
            <Text>Email</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => handleEmail(text)}
            />

            {validEmail ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                Please enter a valid email!
              </Text>
            ) : (
              <Text> </Text>
            )}

            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Enter your password"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            {!validEmail && checkPassword ? (
              <Text status="danger" size="sm" style={{ marginTop: 10 }}>
                {checkPassword}
              </Text>
            ) : (
              <Text></Text>
            )}

            {email == "" || password == "" || validEmail ? (
              <Button
                text={loading ? "Loading" : "Continue"}
                status="danger"
                disabled="true"
                onPress={() => {
                  login();
                }}
                style={{
                  marginTop: 20,
                }}
              />
            ) : (
              <Button
                text={loading ? "Loading" : "Continue"}
                status="danger"
                onPress={() => {
                  login();
                }}
                style={{
                  marginTop: 20,
                }}
              />
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
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
                  Register here
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" fontWeight="bold">
                  Forget password
                </Text>
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  isDarkmode ? setTheme("light") : setTheme("dark");
                }}
              >
                <Text
                  size="md"
                  fontWeight="bold"
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {isDarkmode ? "☀️ Light Theme" : "🌑 Dark Theme"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
