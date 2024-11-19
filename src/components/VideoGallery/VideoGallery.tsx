import { useState } from 'react';
import ReactPlayer from 'react-player';
import Slider, { Settings } from 'react-slick';
import { VideoData } from '@src/types/global.ts';

import { AspectRatio, Box, Flex, StyleProps, VStack } from '@chakra-ui/react';

import { CustomPlayButton } from './components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface VideoGalleryProps {
  videoUrls: VideoData[];
  sliderOptions?: Settings;
  activeSlideStyles?: StyleProps;
}

const sliderSettings = {
  infinite: false,
  slidesToScroll: 1,
  slidesToShow: 3.3,
  arrows: false
};

const VideoGallery = ({
  videoUrls,
  sliderOptions,
  activeSlideStyles = {}
}: VideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoData>(videoUrls[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const isYoutubePlayer = selectedVideo.url.includes('youtube');

  const handleVideoClick = (video: VideoData) => () => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <Box
      w='100%'
      position='relative'
      sx={{
        '.slick-slider': { overflow: 'hidden' },
        '.slick-list': {
          mx: { base: '-5px', md: '-7px', lg: '-10px' }
        },
        '.slick-slide': {
          px: { base: '5px', md: '7px', lg: '10px' }
        }
      }}
    >
      <AspectRatio
        ratio={16 / 9}
        mb='20px'
        bg='gray.300'
        position='relative'
        {...activeSlideStyles}
      >
        <Box w='100%' h='100%'>
          <ReactPlayer
            url={selectedVideo.url}
            width='100%'
            height='100%'
            playing={isPlaying}
            controls={isYoutubePlayer || isPlaying}
          />
          {!isPlaying && (
            <Flex
              position='absolute'
              top='0'
              left='0'
              width='100%'
              height='100%'
              alignItems='center'
              justifyContent='center'
              cursor='pointer'
              onClick={handlePlayClick}
              zIndex={2}
            >
              <CustomPlayButton size='lg' />
            </Flex>
          )}
        </Box>
      </AspectRatio>

      <Slider {...sliderSettings} {...sliderOptions}>
        {videoUrls.map((video, index) => {
          const isYoutube = video.url.includes('youtube');
          return (
            <VStack
              key={index}
              onClick={handleVideoClick(video)}
              cursor='pointer'
              spacing={1}
              align='center'
            >
              <AspectRatio
                ratio={16 / 9}
                bg='gray.200'
                overflow='hidden'
                position='relative'
              >
                <Box w='100%' h='100%'>
                  <ReactPlayer
                    url={video.url}
                    width='100%'
                    height='100%'
                    controls={false}
                    light={isYoutube}
                  />
                  <Flex
                    position='absolute'
                    top='0'
                    left='0'
                    width='100%'
                    height='100%'
                    alignItems='center'
                    justifyContent='center'
                  >
                    <CustomPlayButton size='sm' />
                  </Flex>
                </Box>
              </AspectRatio>
            </VStack>
          );
        })}
      </Slider>
    </Box>
  );
};

export default VideoGallery;
