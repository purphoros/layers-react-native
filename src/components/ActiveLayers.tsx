import React, { cloneElement, useEffect, useReducer } from 'react';
import { Pressable, View } from 'react-native';

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
      return <View key={layerUuid} style={{ ...custom, display: "flex", flexDirection: "column", position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", overflow: "auto", backgroundColor: "transparent" }}>
        <Pressable style={{ position: "absolute", top: "0px", right: "0px", bottom: "0px", left: "0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }} onPress={() => layerUuid && closeLayerByUuid(layerUuid)} />
        {cloneElement(component, { ...component.props, style: { ...component.props.style, backgroundColor: "#FF0000", position: "relative" }, ...layer })}
      </View>
    })}
  </React.Fragment>
}

export default ActiveLayers;