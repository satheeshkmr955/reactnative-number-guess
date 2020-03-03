import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
// import { ScreenOrientation } from "expo";

import DefaultStyles from "../constants/default-styles";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
  // ScreenOrientation.unlockAsync();
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  useEffect(() => {
    updateLayOut = () => {
      setDeviceWidth(Dimensions.get("window").width);
      setDeviceHeight(Dimensions.get("window").height);
    };

    Dimensions.addEventListener("change", updateLayOut);
    return () => {
      Dimensions.removeEventListener("change", updateLayOut);
    };
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={DefaultStyles.title}>The Game is Over!</Text>
        <View
          style={{
            ...styles.imageContainer,
            ...{
              height: deviceWidth * 0.7,
              width: deviceWidth * 0.7,
              borderRadius: (deviceWidth * 0.7) / 2,
              marginVertical: deviceHeight / 30
            }
          }}
        >
          <Image
            source={require("../assets/images/success.png")}
            fadeDuration={1000}
            // source={{
            //   uri:
            //     "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=500&w=500"
            // }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            ...styles.textContainer,
            ...{ marginHorizontal: deviceHeight / 60 }
          }}
        >
          <Text
            style={{
              ...DefaultStyles.bodyText,
              ...styles.text,
              ...{ fontSize: deviceHeight < 400 ? 16 : 20 }
            }}
          >
            Your Phone needed{" "}
            <Text style={styles.primaryText}>{props.roundCount}</Text> rounds to
            guess the number{" "}
            <Text style={styles.primaryText}>{props.number}</Text>
          </Text>
        </View>

        <MainButton onPress={props.onRestart}>Start New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "black",
    overflow: "hidden",
    shadowColor: "black",
    shadowRadius: 200
  },
  image: {
    width: "100%",
    height: "100%"
  },
  textContainer: {
    marginVertical: 15
  },
  text: {
    textAlign: "center",
    fontFamily: "open-sans"
  },
  primaryText: {
    color: Colors.secondary,
    fontFamily: "open-sans-bold"
  }
});

export default GameOverScreen;
