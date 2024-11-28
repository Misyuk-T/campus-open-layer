import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { CustomPlayButton } from '@src/components/VideoGallery/components';
import { ScrollBar } from '@src/ui';

import {
  AspectRatio,
  Box,
  Flex,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';

interface VideoData {
  url: string;
  title: string;
}

interface VerticalVideosProps {
  videos: VideoData[];
  maxHeight?: number;
}

const VerticalVideos = ({ videos, maxHeight }: VerticalVideosProps) => {
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const [selectedVideo, setSelectedVideo] = useState<VideoData>(videos[0]);
  const [isPlayingId, setIsPlayingId] = useState<string>('');
  const [isReadyToPlay, setIsReadyToPlay] = useState<{
    [url: string]: boolean;
  }>({});

  const isYoutubePlayer = videos[0].url.includes('youtube');
  const availableHeight = maxHeight ? `${maxHeight}px` : '100%';
  const isMainVideoPlaying = isPlayingId === selectedVideo.url;
  const isAllVideosReady =
    Object.values(isReadyToPlay).length === videos.length;

  const handlePlayClick = () => {
    setIsPlayingId(selectedVideo.url);
  };

  const handleVideoClick = (video: VideoData) => () => {
    setSelectedVideo(video);
    if (isMobile) {
      setIsPlayingId(video.url);
    }
  };

  const handleReady = (url: string) => () => {
    setIsReadyToPlay((prevState) => ({ ...prevState, [url]: true }));
  };

  useEffect(() => {
    setIsPlayingId('');
  }, [isMobile]);

  return (
    <Flex
      w='100%'
      h='100%'
      gap={{ base: '5px', md: '8px' }}
      justifyContent='flex-start'
      alignItems='flex-start'
      maxHeight={maxHeight}
      pl={{ base: '25px', sm: '30px', xl: '40px', '2xl': '60px' }}
    >
      <Flex
        display={{ base: 'none', lg: 'flex' }}
        width='40%'
        minWidth={{ base: 'none', sm: '315px', md: '300px' }}
        alignItems='center'
        bg='black'
        height={`calc(${availableHeight} - 20px)`}
        mb='20px'
        flex={1}
      >
        <AspectRatio ratio={9 / 16} w='100%' position='relative'>
          <Box w='100%' h='100%'>
            <ReactPlayer
              key={
                isReadyToPlay[selectedVideo.url]
                  ? selectedVideo.url
                  : `${selectedVideo.url}-loading`
              }
              url={selectedVideo.url}
              onReady={handleReady(selectedVideo.url)}
              width='100%'
              height='100%'
              playing={isMainVideoPlaying && !isMobile}
              controls={isYoutubePlayer || isMainVideoPlaying}
            />
            {!isMainVideoPlaying && (
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
      </Flex>

      <Box
        width={{ base: '100%', lg: '60%' }}
        mt={{ base: '-20x', sm: '-15px', lg: '-20px' }}
        pb='30px'
      >
        <ScrollBar maxHeight={availableHeight}>
          <Flex
            flexWrap='wrap'
            justifyContent='flex-start'
            alignItems='start'
            pr={{ base: '25px', sm: '30px', xl: '40px', '2xl': '60px' }}
          >
            {videos.map((video) => {
              const isYoutube = video.url.includes('youtube');
              const isPlayingVideo = isPlayingId === video.url && isMobile;

              return (
                <Box
                  key={video.url}
                  w={{
                    base: '100%',
                    sm: '50%',
                    '2xl': '33.33%'
                  }}
                  cursor='pointer'
                  onClick={handleVideoClick(video)}
                  px={{ base: '5px', md: '8px' }}
                  py={{ base: '20px', sm: '15px', lg: '20px' }}
                >
                  <AspectRatio
                    ratio={{ base: 1, md: 9 / 16 }}
                    w='100%'
                    borderStyle='solid'
                    borderWidth='1px'
                    borderColor={{
                      base: 'transparent',
                      md: isPlayingVideo ? 'white' : 'transparent'
                    }}
                  >
                    <Box w='100%' h='100%' bg='black' position='relative'>
                      <ReactPlayer
                        key={isAllVideosReady ? video.url : selectedVideo.url}
                        url={video.url}
                        onReady={handleReady(video.url)}
                        width='100%'
                        height='100%'
                        playing={isPlayingVideo}
                        controls={isYoutube}
                        light={!isPlayingVideo && isYoutube && !isMobile}
                      />
                      {!isPlayingVideo && (
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
                      )}
                    </Box>
                  </AspectRatio>
                  <Text
                    mt='15px'
                    fontSize='12px'
                    textStyle='paragraphMedium'
                    lineHeight='140%'
                    color='white'
                  >
                    {video.title}
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </ScrollBar>
      </Box>
    </Flex>
  );
};

export default VerticalVideos;
