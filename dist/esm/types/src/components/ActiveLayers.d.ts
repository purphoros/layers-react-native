/// <reference types="react" />
interface Props {
    layers: any;
    closeLayerByUuid: (layerUuid: string) => void;
}
declare const ActiveLayers: (props: Props) => JSX.Element;
export default ActiveLayers;
