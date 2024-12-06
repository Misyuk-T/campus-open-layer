import { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { labelPositionType } from '@src/types/global.ts';
import {
  LocationEntityTypeEnum,
  MenuLinkChildrenContent
} from '@src/types/sideMenu.ts';
import { OffCampus } from '@src/ui';
import { MAP_IMAGE_WIDTH } from '@src/utils/constants.ts';
import { boundingExtent } from 'ol/extent';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';

import { BuildingOverlay } from '../BuildingOverlay';

interface OverlaysRendererProps {
  map: Map;
  activeLocations: MenuLinkChildrenContent[];
  activeLocation: MenuLinkChildrenContent | null;
}

const CHAR_WIDTH = 4;
const MAP_OFFSET = 200;
const LABEL_PADDING = 20;

const OverlaysRenderer = ({
  map,
  activeLocations,
  activeLocation
}: OverlaysRendererProps) => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  const onCampusLocations = useMemo(
    () =>
      activeLocations.filter(
        (item) =>
          item.attributes.entity_data.type === LocationEntityTypeEnum.onCampus
      ),
    [activeLocations]
  );
  const offCampusLocations = useMemo(
    () =>
      activeLocations.filter(
        (item) =>
          item.attributes.entity_data.type === LocationEntityTypeEnum.offCampus
      ),
    [activeLocations]
  );
  const isOffCampusLocationExist = offCampusLocations.length > 0;
  const isOverlayRender = onCampusLocations.length > 0 && overlays.length > 0;

  useEffect(() => {
    const newOverlays = onCampusLocations.map((item) => {
      const overlayElement = document.createElement('div');
      const overlay = new Overlay({
        position: [
          item.attributes.location.coordinateX,
          item.attributes.location.coordinateY
        ],
        positioning: 'center-center',
        element: overlayElement,
        id: item.id
      });
      map.addOverlay(overlay);
      return overlay;
    });
    setOverlays(newOverlays);

    if (onCampusLocations.length > 0) {
      const coordinates = onCampusLocations.map((item) => [
        item.attributes.location.coordinateX,
        item.attributes.location.coordinateY
      ]);
      let extent = boundingExtent(coordinates);
      const view = map.getView();
      view.animate({
        center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
        duration: 500,
        zoom: 16,
        easing: (t) => t * (2 - t)
      });
    }

    return () => {
      newOverlays.forEach((overlay) => {
        map.removeOverlay(overlay);
      });
    };
  }, [onCampusLocations, map]);

  useEffect(() => {
    const isLocationValid =
      activeLocation &&
      activeLocation.attributes.entity_data.type ===
        LocationEntityTypeEnum.onCampus;
    if (map && isLocationValid) {
      const view = map.getView();
      const resolution = view.getResolution() || 1;
      const labelLength = activeLocation?.attributes.location.label.length;
      const contentWidth =
        labelLength * (CHAR_WIDTH * resolution) + LABEL_PADDING;
      view.animate({
        center: [
          activeLocation?.attributes.location.coordinateX + contentWidth,
          activeLocation?.attributes.location.coordinateY
        ],
        duration: 500,
        easing: (t) => t * (2 - t)
      });
    }
  }, [map, activeLocation]);

  return (
    <>
      {isOverlayRender &&
        overlays.map((overlay, index) => {
          const childrenItem = onCampusLocations.find(
            (item) => item.id === overlay.getId()
          );
          if (!childrenItem) return null;

          const overlayPosition = overlay.getPosition() as [number, number];
          const labelLength = childrenItem.attributes.location.label.length;
          const approximateLabelWidth =
            labelLength * CHAR_WIDTH + MAP_OFFSET + LABEL_PADDING;
          const isEnoughSpaceWithMaxScale =
            approximateLabelWidth * 2 < MAP_IMAGE_WIDTH - overlayPosition[0];
          const labelPosition: labelPositionType = isEnoughSpaceWithMaxScale
            ? 'right'
            : 'left';

          return ReactDOM.createPortal(
            <BuildingOverlay
              childrenItem={childrenItem}
              labelPosition={labelPosition}
              key={index}
            />,
            overlay.getElement()!
          );
        })}

      {isOffCampusLocationExist && <OffCampus items={offCampusLocations} />}
    </>
  );
};

export default OverlaysRenderer;
