import { View, Text, FlatList, StyleSheet, Animated } from "react-native";
import React, { useRef, useState } from "react";
import moviesData from "./moviesData";
import OnBoardingItem from "./OnBoardingItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import { useNavigation } from "@react-navigation/native";

export default function OnBoarding() {
  const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const sildesRef = useRef(null);
  const scrollTo = () => {
    if (currentIndex < moviesData.slice(0, 3).length - 1) {
      sildesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.navigate("Login");
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={moviesData.slice(0, 3)}
        renderItem={({ item }) => <OnBoardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false, 
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={sildesRef}
      />
      <Paginator data={moviesData.slice(0, 3)} scrollX={scrollX} />
      <NextButton
        percentage={(currentIndex + 1) * (100 / moviesData.slice(0, 3).length)}
        scrollTo={scrollTo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex: 1,
  },
});
