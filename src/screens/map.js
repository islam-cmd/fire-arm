import React from "react";
import { View, Linking } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import react, { useState, useEffect } from "react";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import * as fireData from "./fire.json";
import mapStyles from "./mapStyles";
import Header from "./Header";

function Map(){
  const [setFire, setSelectedFire] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedFire(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return( 
  
  <GoogleMap 
    defaultZoom={10} 
    defaultCenter = {{lat: 45.421532, lng: -75.697189 }} 
    defaultOptions={{ styles: mapStyles }}
    >

{fireData.features.map(fire => (
        <Marker
          key={fire.properties.FIRE_ID}
          position={{
            lat: fire.geometry.coordinates[1],
            lng: fire.geometry.coordinates[0]
          }}
           onClick={() => {
             setSelectedFire(fire);
           }}
        />
      ))} 

      {setFire && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedFire(null);
          }}
          position={{
            lat: setFire.geometry.coordinates[1],
            lng: setFire.geometry.coordinates[0]
          }}
        >
          <div>
            <h2>{setFire.properties.NAME}</h2>
            <p>{setFire.properties.DESCRIPTIO}</p>
          </div>
        </InfoWindow>
      )}

  </GoogleMap>

  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const auth = getAuth();
  
  return (
    <Layout>
      <Header navigation={navigation} title="Fire Map"></Header>

      { // We cannot use normal HTML as JSX so we get a compile error here.

      /* <div style = {{width: '100vw', height: '100vh'}}>
        <WrappedMap
          googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCRRZScwi8p5-AbpmZty9ajh2s-wde7u3I'}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div> */
      }

      <View style={{width: '100%', height: '100%'}}>
        <WrappedMap
          googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCRRZScwi8p5-AbpmZty9ajh2s-wde7u3I'}
          loadingElement={<View style={{width: '100%', height: '100%'}}/>}
          containerElement={<View style={{width: '100%', height: '100%'}}/>}
          mapElement={<View style={{width: '100%', height: '100%'}}/>}
        />
      </View>
    </Layout>
  );
}
