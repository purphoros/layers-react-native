import React, { useMemo, useState, useCallback, useContext, createContext, useRef, useEffect, cloneElement, FC, ReactElement, isValidElement } from 'react';
import ActiveLayers from './ActiveLayers';
import { v4 as uuidv4 } from 'uuid';

export const MINIMIZED_FLAG = 0;
export const MAXIMIZED_FLAG = 1;

interface Base {
  layerUuid?: string
  updatedOn?: number
  name?: string
  orientation?: string
  component: ReactElement<LayerProps>
}

export interface LayerProps {
  layerUuid?: string
  style?: any
}

export interface Layer extends Base {
  layerUuid: string
}

export interface Context {
  layers: Array<Layer>
  createLayer: (values: Base, callback?: () => void) => void
  closeLayerByUuid: (layerUuid?: string) => void
  closeLayerByName: (name: string) => void
  closeAllLayers: () => void
}

const LayerContext = createContext<any>({ layers: [] });

export const useLayer = () => {
  const context = useContext<Context>(LayerContext);
  if (context === undefined) {
    throw new Error('useLayer was used outside of its Provider');
  }
  return context;
};

interface Props {
  children: React.ReactNode
}

export const LayersProvider: FC<Props> = (props: any) => {
  const { children } = props;
  const callbacks = useRef<(() => void)[]>([]);

  const [ layers, addLayer ] = useState<Array<Layer>>([]);

  const closeLayerByUuid = useCallback((layerUuid: string = "") =>
    addLayer(layers.filter((layer) => layer.layerUuid !== layerUuid)), [ layers ]);

  const closeLayerByName = useCallback((name: string) =>
    addLayer(layers.filter((layer) => layer.name !== name)), [ layers ]);

  const closeAllLayers = useCallback(() => addLayer([]), []);

  const createLayer = useCallback(({
    component,
    name,
    orientation = 'full'
  }: Base, callback?: () => void) => {
    const layerUuid = uuidv4();

    let newLayer = {
      name,
      layerUuid,
      orientation,
      status: MAXIMIZED_FLAG,
      updatedOn: Date.now(),
      component: isValidElement(component) && cloneElement(component as ReactElement<any>, { layerUuid })
    };

    addLayer((existing: any) => [ ...existing, newLayer ]);

    if (callback) callbacks.current.push(callback);
  }, [ ]);

  useEffect(() => {
    callbacks.current.forEach((callback) => callback());
    callbacks.current = [];
  }, [ layers ]);

  const contextValue: Context = useMemo(
    () => ({
      layers,
      createLayer,
      closeLayerByUuid,
      closeLayerByName,
      closeAllLayers
    }),
    [ layers, createLayer, closeLayerByUuid, closeLayerByName, closeAllLayers ]
  );

  const activeLayers = layers
    .sort((a: any, b: any) => a.updatedOn < b.updatedOn ? -1 : a === b ? 0 : 1)
    .filter((d: any) => !!d.status);

  return <LayerContext.Provider value={contextValue}>
    {children}
    {!!activeLayers?.length && <ActiveLayers layers={activeLayers} closeLayerByUuid={closeLayerByUuid} />}
  </LayerContext.Provider>;
};