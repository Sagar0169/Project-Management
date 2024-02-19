import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  BackHandler,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";

const CustomVideoPlayer = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        // Stop the video when the back button is pressed
        stopVideo();
        navigation.goBack();
        return true; // Prevent default behavior (exit the app)
      }
    );

    return () => {
      // Cleanup the event listener when the component unmounts
      backHandler.remove();
      // Stop the video when the component unmounts
      stopVideo();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setSliderValue(status.positionMillis / status.durationMillis);
          setCurrentTime(status.positionMillis);
          setDuration(status.durationMillis);

          // Check if the video has reached its end
          if (status.didJustFinish) {
            // Stop the video
            stopVideo();
            // Navigate to the desired screen
            navigation.navigate("Login");
          }
        }
      });
    }
  }, [navigation]);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value) => {
    if (videoRef.current) {
      setSliderValue(value);
      videoRef.current.setPositionAsync(value * duration);
    }
  };

  const stopVideo = async () => {
    if (videoRef.current) {
      await videoRef.current.stopAsync();
      setIsPlaying(false);
    }
  };

  const formatTime = (timeMillis) => {
    const totalSeconds = Math.floor(timeMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require("../assets/Images/short.mp4")}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={isPlaying}
        isLooping={false}
        style={styles.video}
      />

      <View style={styles.overlay}>
        {/* Your existing overlay components */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={sliderValue}
          onValueChange={handleSliderChange}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <TouchableOpacity
          onPress={handlePlayPause}
          style={styles.playPauseButton}
        >
          <Text style={styles.playPauseButtonText}>
            {isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>

        {/* Add your Text component here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    padding: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
  },
  playPauseButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
  },
  playPauseButtonText: {
    fontSize: 20,
    color: "#ffffff",
  },
  overlayText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default CustomVideoPlayer;
