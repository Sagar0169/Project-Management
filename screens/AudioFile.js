import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

const AudioFile = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio.Sound());

  useEffect(() => {
    const loadAudio = async () => {
      try {
        await audioRef.current.loadAsync(require("../assets/Images/deep.mp3"));
        audioRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        const { durationMillis } = await audioRef.current.getStatusAsync();
        setDuration(durationMillis);
      } catch (error) {
        console.error("Error loading audio:", error);
      }
    };

    loadAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setSliderValue(status.positionMillis / status.durationMillis);
      setCurrentTime(status.positionMillis);
    }
  };

  const handlePlayPause = async () => {
    try {
      if (isPlaying) {
        await audioRef.current.pauseAsync();
      } else {
        await audioRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  };

  const handleSliderChange = async (value) => {
    setSliderValue(value);

    if (audioRef.current) {
      if (isPlaying) {
        // Pause the audio before setting the new position
        await audioRef.current.pauseAsync();
        await audioRef.current.setPositionAsync(value * duration);
        // Resume playing after setting the new position
        await audioRef.current.playAsync();
      } else {
        // If the audio is not playing, simply set the new position
        await audioRef.current.setPositionAsync(value * duration);
      }
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
    <ImageBackground
      source={{uri:'https://w0.peakpx.com/wallpaper/278/396/HD-wallpaper-v-i-b-e-z-anime-blue-chill-colorfull-cool-gaming-red-vibes-thumbnail.jpg'}}
      style={styles.container}
    >
      <View style={styles.overlay}>
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    height:'100%',
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 15,
    width: "80%",
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 20,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeText: {
    color: "#ffffff",
    fontSize: 16,
  },
  playPauseButton: {
    backgroundColor: "#3498db",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  playPauseButtonText: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export default AudioFile;
