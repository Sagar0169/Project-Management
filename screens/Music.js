import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";

const CustomVideoPlayer = ({ isVisible, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setSliderValue(status.positionMillis / status.durationMillis);
          setCurrentTime(status.positionMillis);
          setDuration(status.durationMillis);
        }
      });
    }
  }, []);

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

  const handleSliderChange = async (value) => {
    if (videoRef.current) {
      setSliderValue(value);
      const newPosition = value * duration;
      await videoRef.current.setPositionAsync(newPosition);
      setCurrentTime(newPosition);
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
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>
        <Video
          ref={videoRef}
          source={require("../assets/Images/short.mp4")} // Replace with your video local path
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={isPlaying}
          isLooping={false}
          style={styles.video}
        />

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

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none", // Allows touches to pass through
  },

  modalContainer: {
    margin: 30,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    elevation: 5,
    padding: 20,
  },
  video: {
    width: "100%",
    aspectRatio: 9 / 16, // Adjusted for 9:16 aspect ratio
  },
  slider: {
    width: "100%",
    height: 40,
    marginTop: 10,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeText: {
    color: "#000000",
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 20,
  },
  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default CustomVideoPlayer;
