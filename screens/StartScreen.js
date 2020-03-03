import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberDisplay from "../components/NumberDisplay";
import MainButton from "../components/MainButton";

const StartScreen = props => {
  const [enterValue, setEnterValue] = useState("");
  const [confirm, setConfirm] = useState(false);
  const [number, setNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  useEffect(() => {
    updateLayOut = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayOut);
    return () => {
      Dimensions.removeEventListener("change", updateLayOut);
    };
  });

  validateInputHandler = inputText => {
    setEnterValue(inputText.replace(/[^0-9]/g, ""));
  };

  resetHandler = () => {
    setEnterValue("");
    setConfirm(false);
  };

  confirmHandler = () => {
    const checkNumber = parseInt(enterValue);
    if (isNaN(checkNumber) || checkNumber === 0 || checkNumber === 99) {
      Alert.alert("Invalid Number", "Number must be between 1 to 99", [
        { text: "Okay", style: "destructive", onPress: resetHandler }
      ]);
      return;
    }
    setConfirm(true);
    setEnterValue("");
    setNumber(checkNumber);
    Keyboard.dismiss();
  };

  let display = null;
  if (confirm) {
    display = (
      <Card style={styles.summary}>
        <Text>You Selected</Text>
        <NumberDisplay>{number}</NumberDisplay>
        <MainButton
          onPress={() => {
            props.onStartGame(number);
          }}
        >
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={50}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.startScreen}>
            <Text style={styles.title}>The Game Screen!</Text>
            <Card style={styles.inputText}>
              <Text>Select A Number</Text>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={validateInputHandler}
                value={enterValue}
              />
              <View style={styles.buttonContainers}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetHandler}
                    color={Colors.secondary}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {display}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  startScreen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  title: { fontSize: 20, marginVertical: 10, fontFamily: "open-sans-bold" },
  inputText: {
    minWidth: 300,
    width: "80%",
    maxWidth: "95%",
    alignItems: "center"
  },
  buttonContainers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  // button: {
  //   width: Dimensions.get("window").width / 4
  // },
  input: {
    width: 50,
    textAlign: "center"
  },
  summary: {
    marginTop: 20,
    alignItems: "center"
  }
});

export default StartScreen;
