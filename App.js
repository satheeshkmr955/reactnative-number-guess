import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartScreen from "./screens/StartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const getFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [counter, setCounter] = useState(0);
  const [loadingData, setLoadingData] = useState(false);

  if (!loadingData) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => {
          setLoadingData(true);
        }}
        onError={err => {
          console.log(err);
        }}
      />
    );
  }

  const startNewGameHandler = () => {
    setCounter(0);
    setUserNumber(null);
  };

  const startGameHandler = enteredNumber => {
    setUserNumber(enteredNumber);
  };

  const counterHandler = curCount => {
    setCounter(curCount);
  };

  let content = <StartScreen onStartGame={startGameHandler} />;

  if (userNumber && counter <= 0) {
    content = <GameScreen userChoice={userNumber} onOver={counterHandler} />;
  } else if (counter > 0) {
    content = (
      <GameOverScreen
        roundCount={counter}
        number={userNumber}
        onRestart={startNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.mainScreen}>
      <Header title="Guess A Number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainScreen: {
    flex: 1
  }
});
