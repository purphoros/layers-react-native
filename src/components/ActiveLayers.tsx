import React, { cloneElement, useEffect, useReducer } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Layer } from './Context';

interface Props {
  layers: any
  closeLayerByUuid: (layerUuid: string) => void
}

const getActive = (items: any) => items
  .filter((d: any) => !!d.status)
  .sort((a: any, b: any) => a.updatedOn > b.updatedOn ? 1 : a === b ? 0 : -1);

const reducer = (existing: any, layers: any) => {
  if (layers?.length !== existing?.length) {
    return layers;
  }
  return existing;
}

const ActiveLayers = (props: Props) => {
  const { layers, closeLayerByUuid } = props;
  const [ activeLayers = [], dispatch ] = useReducer(reducer, getActive(layers));

  useEffect(() => {
    dispatch(getActive(layers));
  }, [ layers ]);

  const alignments: { [k: string]: any } = {
    modal: {
      alignItems: "center", justifyContent: "center"
    },
    default: {

    },
    bottom: {
      justifyContent: "flex-end"
    }
  }

  return <React.Fragment>
    {activeLayers.map((layer: Layer) => {
      const { layerUuid, component, orientation = "modal" } = layer;
      const custom = (orientation && alignments[orientation]) ? alignments[orientation] : alignments.default;
      return <View key={layerUuid} style={{ ...custom, ...styles.container }}>
        <Pressable style={styles.closable} onPress={() => layerUuid && closeLayerByUuid(layerUuid)} />
        {cloneElement(component, { ...component.props, style: { ...component.props.style, ...styles.component }, ...layer })}
      </View>
    })}
  </React.Fragment>
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "scroll",
    backgroundColor: "transparent"
  },
  closable: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  component: {
    backgroundColor: "#FF0000",
    position: "relative"
  }
});

export default ActiveLayers;