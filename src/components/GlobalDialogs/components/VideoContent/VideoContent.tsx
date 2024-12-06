import { Popup3Data } from '@src/types/modals.ts';

import { VerticalVideos, VideoSlider } from './components';

interface VideosProps {
  data: Popup3Data;
  maxHeight?: number;
}

const VideoContent = ({ data, maxHeight }: VideosProps) => {
  const isVertical = data.attributes?.field_video_orientation;

  return isVertical ? (
    <VerticalVideos
      videos={data.attributes.field_campus_video}
      maxHeight={maxHeight}
    />
  ) : (
    <VideoSlider videos={data.attributes.field_campus_video} />
  );
};

export default VideoContent;
