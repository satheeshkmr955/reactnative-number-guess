import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Colors from "../constants/colors";

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIos,
          android: styles.headerAndroid
        })
      }}
    >
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIos: {
    backgroundColor: "white",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  title: {
    color: Platform.OS === "ios" ? Colors.primary : "white",
    fontSize: 18,
    fontFamily: "open-sans-bold"
  }
});

export default Header;
