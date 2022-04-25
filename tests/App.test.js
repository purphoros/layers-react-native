import React from 'react';
import { fireEvent, render, waitFor } from '../utils/test-utils';
import { Button, StyleSheet, View } from 'react-native';
import { useLayer } from '../src';

const Modal = ({ layerUuid }) => {
  const { closeLayerByUuid } = useLayer();
  return <View testID="open-modal" style={{ width: "400px", padding: "12px", backgroundColor: "#FFF" }}>
    <View>My Modal</View>
    <Button title="Close modal" onPress={() => closeLayerByUuid(layerUuid)} />
  </View>
}

const Page = () => {
  const { createLayer } = useLayer();
  const onPress = (orientation = "default") => createLayer({ orientation, component: <Modal /> });

  return <View>
    <Button title="Create modal" onPress={() => onPress("modal")} />
  </View>
}

const App = () => <View style={styles.container}>
  <Page />
</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

test('Should create an item', async () => {
  const { getByText, queryByTestId } = render(<App />);

  const createButton = getByText('Create modal');
  expect(createButton).toBeTruthy();
  fireEvent.press(createButton);
  await waitFor(() => expect(queryByTestId('open-modal')).toBeTruthy());

  const closeButton = getByText('Close modal');
  expect(closeButton).toBeTruthy();
  fireEvent.press(closeButton);

  const closedModal = queryByTestId('open-modal');
  expect(closedModal).toBeFalsy();
});