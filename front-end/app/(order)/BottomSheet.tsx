import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

const BottomSheet = ({ isOpen, setIsOpen, children }: BottomSheetProps) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        // onPressOut={() => setIsOpen(false)}
      >
        <View style={styles.modalContent}>{children}</View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "80%",
    padding: 20,
    paddingBottom: 50,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default BottomSheet;
