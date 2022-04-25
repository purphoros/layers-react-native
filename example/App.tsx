import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LayersProvider, useLayer } from 'layers-react-native';

const Page = () => {
  const { createLayer, closeLayerByUuid } = useLayer();

  const Modal = ({ layerUuid }: any) => <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.modal}>
    <Text>Modal</Text>
    <Button title="close" onPress={() => closeLayerByUuid(layerUuid)} />
  </Animated.View>

  const Bottom = ({ layerUuid }: any) => <Animated.View entering={SlideInDown} exiting={SlideOutDown} style={styles.bottom}>
    <Text>Bottom Menu</Text>
    <Button title="close" onPress={() => closeLayerByUuid(layerUuid)} />
  </Animated.View>

  const Default = ({ layerUuid }: any) => <Animated.View entering={SlideInUp} exiting={SlideOutUp} style={styles.default}>
    <Text>Control</Text>
    <Button title="close" onPress={() => closeLayerByUuid(layerUuid)} />
  </Animated.View>

  const onPress = (orientation = "default") => {
    createLayer({
      orientation,
      component: orientation === "modal" ? <Modal />
        : orientation === "bottom" ? <Bottom />
        : <Default />
    });
  }

  return <View style={styles.container}>
    <View style={styles.button}>
      <Button title="Create modal" onPress={() => onPress("modal")} />
    </View>
    <View style={styles.button}>
      <Button title="Create bottom menu" onPress={() => onPress("bottom")} />
    </View>
    <View style={styles.button}>
      <Button title="Create full control" onPress={() => onPress("default")} />
    </View>
  </View>
}

export default function App() {
  return (<GestureHandlerRootView style={styles.gesture}>
    <StatusBar style="auto" />
    <LayersProvider>
      <View style={styles.container}>
        <Page />
      </View>
    </LayersProvider>
  </GestureHandlerRootView>);
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingBottom: 10
  },
  modal: {
    width: 250,
    padding: 12,
    backgroundColor: "#FFF"
  },
  bottom: {
    padding: 12,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12

  },
  default: {
    flex: 1,
    paddingRight: 12,
    paddingLeft: 12,
    paddingTop: 50,
    backgroundColor: "#CCFBF1"
  }
});
