# Layers for React Native

A library for creating layers for React native, helpful with things like modals, menus etc.

## Installation

```sh
npm install layers-react-native
```

## Setup

### Add LayersProvider to root of the app

Import `LayersProvider` from `layers-react-native` and add it as a root item.

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { LayersProvider } from 'layers-react-native';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <LayersProvider>
      <App />
    </LayersProvider>
  </React.StrictMode>
);
```

## Layers

From here you can create new layers, close them or minimize/maximize them.

### useLayer


### Create layer - createLayer

Import `useLayer` from `layers-react-native` and use `createLayer` to create a new layer.

```jsx
import { useLayer } from 'layers-react-native';

const Component = () => {
  const { createLayer } = useLayer();

  const Modal = () => <div style={{ position: "relative", width: "400px", padding: "12px", backgroundColor: "#FFF" }}>Modal</div>

  const onClick = () => {
    createLayer({
      orientation: "modal",
      component: <Modal />
    });
  }

  return <button onClick={onClick}>Open</button>
}

export default Component;
```

### Close layer

When you create a layer `layerUuid` is attached to the props of the component that can be used for actions such as closing that layer.

```js
  const { createLayer, closeLayerByUuid } = useLayer();

  const Modal = ({ layerUuid }) => <div style={{ position: "relative", width: "400px", padding: "12px", backgroundColor: "#FFF" }}>
    <div>Modal</div>
    <button onClick={() => closeLayerByUuid(layerUuid)}>Close</button>
  </div>
```