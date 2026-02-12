import * as React from "react";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import { Modal, Portal } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const AmplifyImage = ({
  uri,
  visible,
  setVisible,
}: {
  uri: string;
  title: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) => {
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center" as const,
    alignItems: "center" as const,
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Pressable style={styles.touchableArea} onPress={hideModal}>
          <Image
            source={{ uri }}
            style={{
              width: width,
              height: height,
            }}
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  touchableArea: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AmplifyImage;
