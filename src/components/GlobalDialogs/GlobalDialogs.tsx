import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { closeModals } from '@src/store/reducers/modals';
import { Drawer } from '@src/ui';

import {
  ImageAndText,
  ImageAndVideo,
  ImageSlider,
  VerticalVideos,
  VideoSlider
} from './components';

const data = {
  title: 'Buhl Humanities Building',
  options: [
    { label: 'Department of Communication', value: 'communication' },
    { label: 'Criminal Justice', value: 'criminal_justice' },
    { label: 'English', value: 'english' },
    { label: 'Human Studies', value: 'human_studies' },
    { label: 'Philosophy', value: 'philosophy' },
    { label: 'Psychology', value: 'psychology' },
    { label: 'Sociology', value: 'sociology' },
    { label: 'History', value: 'history' },
    { label: 'Fine Arts', value: 'fine_arts' },
    { label: 'Anthropology', value: 'anthropology' },
    { label: 'Languages and Literature', value: 'languages_literature' },
    { label: 'Political Science', value: 'political_science' }
  ],
  paragraphs: [
    {
      image: 'https://placehold.co/400x200',
      anchorClass: 'criminal_justice'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Lorem Ipsum Dolor Amet',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop",
      anchorClass: 'communication'
    },
    {
      title: 'English',
      text: 'This is another section without an image.',
      anchorClass: 'english'
    },
    {
      image: 'https://placehold.co/400x200',
      text: 'Just an image and text without a title.',
      anchorClass: 'human_studies'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Philosophy and Logic',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop",
      anchorClass: 'philosophy'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Exploring Psychology',
      text: 'Psychology studies human behavior and mental processes.',
      anchorClass: 'psychology'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Understanding Society',
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop",
      anchorClass: 'sociology'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'The History We Share',
      text: 'History is the study of past events and their impact on the present and future.',
      anchorClass: 'history'
    },
    {
      title: 'The Beauty of Fine Arts',
      text: 'Fine arts include creative disciplines like painting, sculpture, and music.',
      anchorClass: 'fine_arts'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Anthropology: The Human Story',
      text: 'Anthropology examines human cultures, societies, and evolution.',
      anchorClass: 'anthropology'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'The Power of Language',
      text: 'Languages and Literature explore the art of communication and storytelling.',
      anchorClass: 'languages_literature'
    },
    {
      image: 'https://placehold.co/400x200',
      title: 'Political Science in Action',
      text: 'Political science studies governance, politics, and policy-making processes.',
      anchorClass: 'political_science'
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

const verticalVideoData = {
  title: 'Buhl Humanities Building',
  description: '',
  videos: [
    {
      url: 'https://www.youtube.com/embed/Idg5Lrvrh2g',
      title: 'Sample Video 1'
    },
    {
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=0.1',
      title: 'Sample Video 2'
    },
    {
      url: 'https://www.youtube.com/embed/hq7EJRgJXog',
      title: 'Sample Video 3'
    },
    {
      url: 'https://www.youtube.com/embed/OeE_Bg-MOY8',
      title: 'Sample Video 4'
    },
    {
      url: 'https://www.youtube.com/embed/DTsfyxrVFWA',
      title: 'Sample Video 5'
    },
    {
      url: 'https://www.youtube.com/embed/gPD0wRAD1Uo',
      title: 'Sample Video 6'
    },
    {
      url: 'https://www.youtube.com/embed/4WiI9_3CFew',
      title: 'Sample Video 7'
    },
    {
      url: 'https://www.youtube.com/embed/iaXUlonZ3ls',
      title: 'Sample Video 8'
    },
    {
      url: 'https://www.youtube.com/embed/5aWuEKZAkbc',
      title: 'Sample Video 9'
    },
    {
      url: 'https://www.youtube.com/embed/Nk0LMXMNCGs',
      title: 'Sample Video 10'
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
    modals: {
      imageAndText,
      videoGallery,
      imageSlider,
      imageAndVideo,
      verticalVideos
    }
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
        isOpen={verticalVideos}
        onClose={onClose}
        title={verticalVideoData.title}
        description={verticalVideoData.description}
        withScroll={false}
      >
        <VerticalVideos videos={verticalVideoData.videos} />
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
