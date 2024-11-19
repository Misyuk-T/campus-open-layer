import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { SidebarChildrenItem } from '@src/types/global.ts';
import { boundingExtent } from 'ol/extent';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';

import { BuildingOverlay } from '../BuildingOverlay';

interface OverlaysRendererProps {
  map: Map;
  activeLocations: SidebarChildrenItem[];
}

const OverlaysRenderer = ({ map, activeLocations }: OverlaysRendererProps) => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);

  const isOverlayRender = activeLocations.length > 0 && overlays.length > 0;

  useEffect(() => {
    overlays.forEach((overlay) => {
      map.removeOverlay(overlay);
    });
    setOverlays([]);

    const newOverlays = activeLocations.map((item) => {
      const overlayElement = document.createElement('div');
      const overlay = new Overlay({
        position: [item.location.x, item.location.y],
        positioning: 'center-center',
        element: overlayElement,
        id: item.id
      });
      map.addOverlay(overlay);
      return overlay;
    });
    setOverlays(newOverlays);

    if (activeLocations.length > 0) {
      const coordinates = activeLocations.map((item) => [
        item.location.x,
        item.location.y
      ]);
      let extent = boundingExtent(coordinates);
      const view = map.getView();
      view.animate({
        center: [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2],
        duration: 500,
        easing: (t) => t * (2 - t)
      });
    }

    return () => {
      newOverlays.forEach((overlay) => {
        map.removeOverlay(overlay);
      });
    };
  }, [activeLocations, map]);

  return (
    <>
      {isOverlayRender &&
        overlays.map((overlay) => {
          const childrenItem = activeLocations.find(
            (item) => item.id === overlay.getId()
          );
          return childrenItem
            ? ReactDOM.createPortal(
                <BuildingOverlay childrenItem={childrenItem} />,
                overlay.getElement()!
              )
            : null;
        })}
    </>
  );
};

export default OverlaysRenderer;
