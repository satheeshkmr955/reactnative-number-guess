import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { ScreenOrientation } from "expo";

import NumberDisplay from "../components/NumberDisplay";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderList = (i, itemData) => (
  <View key={i} style={styles.listItem}>
    <Text style={DefaultStyles.bodyText}>#{i - itemData.index}</Text>
    <Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
  </View>
);

const GameScreen = props => {
  // ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT);
  const { userChoice, onOver } = props;
  const firstGuess = generateRandomBetween(0, 100, userChoice);

  const [currentNumber, setCurrentNumber] = useState(firstGuess);
  const [guessArr, setGuessArr] = useState([firstGuess.toString()]);
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width
  );

  const [deviceHeight, setDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const curLow = useRef(1);
  const curHigh = useRef(100);

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

  useEffect(() => {
    if (currentNumber === userChoice) {
      onOver(guessArr.length);
    }
  }, [currentNumber, userChoice, onOver]);

  const validateHintGuess = direction => {
    if (
      (direction === "lower" && currentNumber < userChoice) ||
      (direction === "greater" && currentNumber > userChoice)
    ) {
      Alert.alert("Don't Lie!", "You known these is wrong.", [
        { text: "Sorry!", style: "cancel" }
      ]);
      return;
    }
    if (direction === "lower") {
      curHigh.current = currentNumber;
    } else {
      curLow.current = currentNumber;
    }
    const nextGuess = generateRandomBetween(
      curLow.current,
      curHigh.current,
      currentNumber
    );
    setCurrentNumber(nextGuess);
    setGuessArr(guessArr => [nextGuess.toString(), ...guessArr]);
  };

  let listContainerStyle = styles.listContainer;
  if (deviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (deviceHeight < 500) {
    return (
      <View style={styles.container}>
        <Text style={DefaultStyles.title}>Opponents Guess</Text>
        <View style={styles.landscape}>
          <MainButton
            onPress={() => {
              validateHintGuess("lower");
            }}
          >
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberDisplay>{currentNumber}</NumberDisplay>
          <MainButton
            onPress={() => {
              validateHintGuess("greater");
            }}
          >
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
        <View style={listContainerStyle}>
          {/*<ScrollView contentContainerStyle={styles.list}>
            {guessArr.map((guess, i) => renderList(guess, guessArr.length - i))}
          </ScrollView>*/}
          <FlatList
            keyExtractor={item => item}
            data={guessArr}
            renderItem={renderList.bind(this, guessArr.length)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={DefaultStyles.title}>Opponents Guess</Text>
      <NumberDisplay>{currentNumber}</NumberDisplay>
      <Card
        style={{
          ...styles.buttonCard,
          marginTop: deviceHeight > 600 ? 20 : 5
        }}
      >
        <MainButton
          onPress={() => {
            validateHintGuess("lower");
          }}
        >
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton
          onPress={() => {
            validateHintGuess("greater");
          }}
        >
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={listContainerStyle}>
        {/*<ScrollView contentContainerStyle={styles.list}>
          {guessArr.map((guess, i) => renderList(guess, guessArr.length - i))}
        </ScrollView>*/}
        <FlatList
          keyExtractor={item => item}
          data={guessArr}
          renderItem={renderList.bind(this, guessArr.length)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "80%"
  },
  listContainer: {
    width: "60%",
    flex: 1
  },
  landscape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%"
  },
  listContainerBig: {
    width: "80%",
    flex: 1
  },
  list: {
    // alignItems: "center",
    justifyContent: "flex-end",
    flexGrow: 1
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default GameScreen;
