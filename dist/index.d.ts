import React, { FC, ReactElement } from 'react';

interface Base {
    layerUuid?: string;
    updatedOn?: number;
    name?: string;
    orientation?: string;
    component: ReactElement<LayerProps>;
}
interface LayerProps {
    layerUuid?: string;
    style?: any;
}
interface Layer extends Base {
    layerUuid: string;
}
interface Context {
    layers: Array<Layer>;
    createLayer: (values: Base, callback?: () => void) => void;
    closeLayerByUuid: (layerUuid?: string) => void;
    closeLayerByName: (name: string) => void;
    closeAllLayers: () => void;
}
declare const useLayer: () => Context;
interface Props {
    children: React.ReactNode;
}
declare const LayersProvider: FC<Props>;

export { Context, Layer, LayerProps, LayersProvider, useLayer };
