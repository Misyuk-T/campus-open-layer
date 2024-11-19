import { VideoGallery } from '@src/components';
import { VideoData } from '@src/types/global.ts';

import { Stack } from '@chakra-ui/react';

interface VideoSliderProps {
  videos: VideoData[];
}

const VideoSlider = ({ videos }: VideoSliderProps) => {
  return (
    <Stack w='100%' pb={{ base: '130px', md: '30px', lg: '60px' }} mt='20px'>
      <VideoGallery videoUrls={videos} />
    </Stack>
  );
};

export default VideoSlider;
