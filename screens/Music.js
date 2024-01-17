import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Video } from 'expo-av';

const CustomVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

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

  return (
    <View>
      <Video
        ref={videoRef}
        source={require('../assets/Images/short.mp4')} // Replace with your video local path
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={isPlaying}
        isLooping={false}
        style={{ width: '100%', height: 200 }}
      />

      <TouchableOpacity onPress={handlePlayPause}>
        <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomVideoPlayer;
