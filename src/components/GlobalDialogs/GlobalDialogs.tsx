import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { closeModals } from '@src/store/reducers/modals';
import { Drawer } from '@src/ui';

import {
  ImageAndText,
  ImageAndVideo,
  ImageSlider,
  VideoSlider
} from './components';

const data = {
  title: 'Buhl Humanities Building',
  options: [
    { label: 'Department of Communication', value: 'communication' },
    { label: 'Criminal Justice', value: 'criminal_justice' },
    { label: 'English', value: 'english' },
    { label: 'Human Studies', value: 'human_studies' }
  ],
  paragraphs: [
    {
      image: 'https://placehold.co/400x200',
      anchorClass: 'criminal_justice'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Lorem Ipsum Dolor Amet',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      anchorClass: 'communication'
    },
    {
      title: 'Another Section',
      text: 'This is another section without an image.',
      anchorClass: 'english'
    },
    {
      image: 'https://placehold.co/400x200',
      text: 'Just an image and text without a title.',
      anchorClass: 'human_studies'
    }
  ]
};

const videoData = {
  title: 'Buhl Humanities Building',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam.',
  videos: [
    {
      url: 'https://www.youtube.com/embed/bD_nlDO09f4',
      title: 'Sample Video 1'
    },
    {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=0.1',
      title: 'Sample Video 2'
    },
    {
      url: 'https://www.youtube.com/embed/WM6lmEU7g5w',
      title: 'Sample Video 3'
    },
    {
      url: 'https://www.youtube.com/embed/yqq_h6TpUNk',
      title: 'Sample Video 4'
    }
  ]
};

const imageSliderData = {
  title: 'Buhl Humanities Building',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  iconItems: [
    {
      icon: 'https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png',
      text: 'Directions',
      link: '/directions'
    },
    {
      icon: 'https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png',
      text: 'Parking',
      link: '/parking'
    },
    {
      icon: 'https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png',
      text: 'Calendar of events',
      link: '/calendar'
    }
  ],
  infoItems: [
    {
      icon: 'https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png',
      text: 'Capacity: 4,000'
    }
  ],
  sliderItems: [
    'https://placehold.co/400x250',
    'https://placehold.co/600x300',
    'https://placehold.co/500x350'
  ]
};

const imageAndVideoData = {
  title: 'Admissions Office: Miller Hall',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in uienply voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat norin proident, sunt in culpa qui',
  img: {
    url: 'https://placehold.co/500x350',
    alt: 'Campus Map'
  },
  videos: [
    {
      url: 'https://www.youtube.com/embed/bD_nlDO09f4',
      title: 'Campus Overview'
    },
    {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      title: 'Inside the Library'
    }
  ],
  info: {
    img: {
      url: 'https://wikis.tid.es/gvp-public/images/thumb/9/9f/Infobox_info_icon_white.svg.png/600px-Infobox_info_icon_white.svg.png',
      alt: 'Campus Map'
    },
    title: 'Headline',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam.'
  }
};

const smallDrawerSize = { base: 'full', md: 'xl', xl: 'lg' };

const GlobalDialogs = () => {
  const dispatch = useAppDispatch();
  const {
    modals: { imageAndText, videoGallery, imageSlider, imageAndVideo }
  } = useAppSelector((state) => state.modals);

  const onClose = () => {
    dispatch(closeModals());
  };

  return (
    <>
      <Drawer
        isOpen={imageAndText}
        onClose={onClose}
        title={data.title}
        options={data.options}
        size={smallDrawerSize}
      >
        <ImageAndText paragraphs={data.paragraphs} />
      </Drawer>

      <Drawer
        isOpen={videoGallery}
        onClose={onClose}
        title={videoData.title}
        description={videoData.description}
      >
        <VideoSlider videos={videoData.videos} />
      </Drawer>

      <Drawer
        isOpen={imageSlider}
        onClose={onClose}
        title={imageSliderData.title}
      >
        <ImageSlider
          title={imageSliderData.title}
          description={imageSliderData.description}
          iconItems={imageSliderData.iconItems}
          sliderItems={imageSliderData.sliderItems}
          infoItems={imageSliderData.infoItems}
        />
      </Drawer>

      <Drawer
        isOpen={imageAndVideo}
        onClose={onClose}
        title={imageAndVideoData.title}
      >
        <ImageAndVideo
          title={imageAndVideoData.title}
          text={imageAndVideoData.text}
          videos={imageAndVideoData.videos}
          img={imageAndVideoData.img}
          info={imageAndVideoData.info}
        />
      </Drawer>
    </>
  );
};

export default GlobalDialogs;
