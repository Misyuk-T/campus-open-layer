import { useEffect, useRef, useState } from 'react';
import { FaMinus } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { useAppSelector } from '@src/store/hooks';
import { SearchBar } from '@src/ui';
import {
  BURGER_HEADER_MOBILE_HEIGHT,
  MAP_IMAGE_HEIGHT,
  MAP_IMAGE_WIDTH
} from '@src/utils/constants.ts';
import { defaults as defaultControls } from 'ol/control';
import { getCenter } from 'ol/extent';
import ImageLayer from 'ol/layer/Image';
import Map from 'ol/Map';
import ImageStatic from 'ol/source/ImageStatic';
import View from 'ol/View';

import { Box, Flex, IconButton } from '@chakra-ui/react';

import { OverlaysRenderer } from './components';

import 'ol/ol.css';

import MapImage from '/map.jpg';

const MapComponent = () => {
  const { menu } = useAppSelector((state) => state.sideMenu);
  const { activeLocations, activeLocation } = useAppSelector(
    (state) => state.locations
  );

  const mapElement = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<Map | null>(null);

  const handleZoom = (type: 'in' | 'out') => () => {
    const value = type === 'in' ? 1 : -1;
    if (map) {
      const view = map.getView();
      const zoom = view.getZoom();
      if (zoom !== undefined) {
        view.animate({
          zoom: zoom + value,
          duration: 300
        });
      }
    }
  };

  useEffect(() => {
    const extent: number[] = [0, 0, MAP_IMAGE_WIDTH, MAP_IMAGE_HEIGHT];
    const imageLayer = new ImageLayer({
      source: new ImageStatic({
        url: MapImage,
        imageExtent: extent
      })
    });
    if (!mapElement.current) return;
    const initialMap = new Map({
      target: mapElement.current,
      layers: [imageLayer],
      controls: defaultControls({
        zoom: false,
        attribution: false
      }),
      view: new View({
        center: getCenter(extent),
        enableRotation: false,
        zoom: 0,
        maxZoom: 16,
        minZoom: 0,
        minResolution: 0.3,
        extent: extent,
        smoothExtentConstraint: false,
        smoothResolutionConstraint: false
      })
    });
    setMap(initialMap);
    return () => {
      initialMap.setTarget(undefined);
    };
  }, []);

  return (
    <Box
      w='100%'
      h={{
        base: `calc(100vh - ${BURGER_HEADER_MOBILE_HEIGHT}px)`,
        sm: `calc(100vh - ${BURGER_HEADER_MOBILE_HEIGHT}px)`,
        md: '100vh'
      }}
      bg='gray.100'
      overflow='hidden'
      // iOS fix
      minHeight='-webkit-fill-available'
      maxHeight='-webkit-fill-available'
      position='relative'
    >
      <Box ref={mapElement} width='100%' height='100%' />
      {map && activeLocations.length && (
        <OverlaysRenderer
          map={map}
          activeLocations={activeLocations}
          activeLocation={activeLocation}
        />
      )}
      <Box
        position='absolute'
        width={{ base: '100%', sm: 'auto' }}
        top={{ base: 0, sm: '10px' }}
        right={{ base: '0', sm: '10px' }}
        zIndex='10'
      >
        <Flex alignItems='center' bg='white'>
          <IconButton
            aria-label='zoom out'
            size='lg'
            onClick={handleZoom('out')}
            icon={<FaMinus />}
          />
          <IconButton
            aria-label='zoom in'
            size='lg'
            onClick={handleZoom('in')}
            mr='-1px'
            icon={<FaPlus />}
          />

          {menu && (
            <Box width={{ base: '100%', sm: '230px' }}>
              <SearchBar items={menu} />
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default MapComponent;
