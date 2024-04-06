import { Audio } from "expo-av";

export const useSounds = () => {
  const beepSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/sounds/beep-sound.mp3"), {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing beep sound:", error);
    }
  };

  const buzzerSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/sounds/beep-sound-2.wav"), {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing buzzer sound:", error);
    }
  };
  return { beepSound, buzzerSound };
};
