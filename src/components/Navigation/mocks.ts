import { LocationTypeEnum, SidebarItem } from '@src/types/global.ts';

export const items: SidebarItem[] = [
  {
    id: 'academic-administrative',
    label: 'Academic/Administrative',
    children: [
      {
        id: '1',
        type: LocationTypeEnum.onCampus,
        label: 'Open Modal 1',
        location: {
          x: 1200,
          y: 700,
          parent: {
            id: 'academic-administrative',
            label: 'Academic/Administrative'
          },
          modal: { type: 'imageAndText', id: 101 }
        }
      },
      {
        id: '2',
        type: LocationTypeEnum.onCampus,
        label: 'Open Modal 2',
        location: {
          x: 1400,
          y: 800,
          parent: {
            id: 'academic-administrative',
            label: 'Academic/Administrative'
          },
          modal: { type: 'videoGallery', id: 102 }
        }
      },
      {
        id: '3',
        type: LocationTypeEnum.onCampus,
        label: 'Open Modal 3',
        location: {
          x: 1600,
          y: 900,
          parent: {
            id: 'academic-administrative',
            label: 'Academic/Administrative'
          },
          modal: { type: 'imageSlider', id: 103 }
        }
      },
      {
        id: '4',
        type: LocationTypeEnum.onCampus,
        label: 'Open Modal 4',
        location: {
          x: 1800,
          y: 1000,
          parent: {
            id: 'academic-administrative',
            label: 'Academic/Administrative'
          },
          modal: { type: 'imageAndVideo', id: 104 }
        }
      },
      {
        id: '5',
        type: LocationTypeEnum.onCampus,
        label: 'Open Modal 5',
        location: {
          x: 2200,
          y: 1300,
          parent: {
            id: 'academic-administrative',
            label: 'Academic/Administrative'
          },
          modal: { type: 'verticalVideos', id: 104 }
        }
      }
    ]
  },
  {
    id: 'residences',
    label: 'Residences',
    children: [
      {
        id: '5',
        type: LocationTypeEnum.onCampus,
        label: 'Benedum Hall',
        location: {
          x: 1200,
          y: 1300,
          parent: {
            id: 'residences',
            label: 'Residences'
          },
          modal: { type: 'imageSlider', id: 201 }
        }
      },
      {
        id: '6',
        type: LocationTypeEnum.onCampus,
        label: 'Hanna Hall',
        location: {
          x: 1400,
          y: 1500,
          parent: {
            id: 'residences',
            label: 'Residences'
          },
          modal: { type: 'imageAndVideo', id: 202 }
        }
      },
      {
        id: '18',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Residence',
        location: {
          x: 1600,
          y: 1600,
          parent: {
            id: 'residences',
            label: 'Residences'
          },
          modal: { type: 'imageAndVideo', id: 203 },
          preview: 'https://placehold.co/400x300'
        }
      }
    ]
  },
  {
    id: 'dining-facilities',
    label: 'Dining Facilities',
    children: [
      {
        id: '7',
        type: LocationTypeEnum.onCampus,
        label: 'Goodwin Performing Arts Center',
        location: {
          x: 1800,
          y: 1700,
          parent: {
            id: 'dining-facilities',
            label: 'Dining Facilities'
          },
          modal: { type: 'videoGallery', id: 301 }
        }
      },
      {
        id: '19',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Dining 1',
        location: {
          x: 1900,
          y: 1800,
          parent: {
            id: 'dining-facilities',
            label: 'Dining Facilities'
          },
          modal: { type: 'imageSlider', id: 302 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '20',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Dining 2',
        location: {
          x: 2000,
          y: 1900,
          parent: {
            id: 'dining-facilities',
            label: 'Dining Facilities'
          },
          modal: { type: 'videoGallery', id: 303 },
          preview: 'https://placehold.co/400x300'
        }
      }
    ]
  },
  {
    id: 'athletic-facilities',
    label: 'Athletic Facilities',
    children: [
      {
        id: '8',
        type: LocationTypeEnum.onCampus,
        label: 'Paul R. Stewart Science Hall',
        location: {
          x: 2100,
          y: 1900,
          parent: {
            id: 'athletic-facilities',
            label: 'Athletic Facilities'
          },
          modal: { type: 'imageSlider', id: 401 }
        }
      },
      {
        id: '9',
        type: LocationTypeEnum.onCampus,
        label: 'CSI Center',
        location: {
          x: 2300,
          y: 2000,
          parent: {
            id: 'athletic-facilities',
            label: 'Athletic Facilities'
          },
          modal: { type: 'imageAndText', id: 402 }
        }
      },
      {
        id: '21',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Athletic Facility',
        location: {
          x: 2400,
          y: 2100,
          parent: {
            id: 'athletic-facilities',
            label: 'Athletic Facilities'
          },
          modal: { type: 'imageAndText', id: 403 },
          preview: 'https://placehold.co/400x300'
        }
      }
    ]
  },
  {
    id: 'off-campus',
    label: 'Off Campus Buildings/Facilities',
    children: [
      {
        id: '122',
        type: LocationTypeEnum.offCampus,
        label: 'Alston Farm (off campus)',
        location: {
          x: 0,
          y: 0,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'videoGallery', id: 602 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '123',
        type: LocationTypeEnum.offCampus,
        label: 'Marine Biology Lab',
        location: {
          x: 0,
          y: 0,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndVideo', id: 501 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '124',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 1',
        location: {
          x: 100,
          y: 100,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageSlider', id: 502 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '125',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 2',
        location: {
          x: 200,
          y: 200,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'videoGallery', id: 503 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '126',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 3',
        location: {
          x: 300,
          y: 300,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndText', id: 504 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '127',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 4',
        location: {
          x: 400,
          y: 400,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndVideo', id: 505 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '128',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 5',
        location: {
          x: 500,
          y: 500,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageSlider', id: 506 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '129',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 6',
        location: {
          x: 600,
          y: 600,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'videoGallery', id: 507 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '130',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 7',
        location: {
          x: 700,
          y: 700,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndText', id: 508 },
          preview: 'https://placehold.co/400x300'
        }
      },
      {
        id: '131',
        type: LocationTypeEnum.offCampus,
        label: 'Off Campus Building 8',
        location: {
          x: 800,
          y: 800,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndVideo', id: 509 },
          preview: 'https://placehold.co/400x300'
        }
      }
    ]
  },
  {
    id: 'parking-accessibility',
    label: 'Parking & Accessibility',
    children: [
      {
        id: '11',
        type: LocationTypeEnum.onCampus,
        label: 'Eberly Library',
        location: {
          x: 1500,
          y: 1400,
          parent: {
            id: 'parking-accessibility',
            label: 'Parking & Accessibility'
          },
          modal: { type: 'imageAndText', id: 601 }
        }
      },
      {
        id: '12',
        type: LocationTypeEnum.onCampus,
        label: 'Alston Farm (off campus)',
        location: {
          x: 1700,
          y: 1600,
          parent: {
            id: 'parking-accessibility',
            label: 'Parking & Accessibility'
          },
          modal: { type: 'videoGallery', id: 602 }
        }
      }
    ]
  },
  {
    id: 'public-safety',
    label: 'Public Safety/Emergency',
    children: [
      {
        id: '13',
        type: LocationTypeEnum.onCampus,
        label: 'Stover Campus Center',
        location: {
          x: 400,
          y: 600,
          parent: {
            id: 'public-safety',
            label: 'Public Safety/Emergency'
          },
          modal: { type: 'imageSlider', id: 701 }
        }
      }
    ]
  },
  {
    id: 'points-of-interest',
    label: 'Points of Interest',
    children: [
      {
        id: '14',
        type: LocationTypeEnum.onCampus,
        label: 'Center for Criminal and Forensic Investigation',
        location: {
          x: 900,
          y: 1200,
          parent: {
            id: 'points-of-interest',
            label: 'Points of Interest'
          },
          modal: { type: 'imageAndVideo', id: 801 }
        }
      }
    ]
  },
  {
    id: 'student-perspectives',
    label: 'Student Perspectives',
    children: [
      {
        id: '15',
        type: LocationTypeEnum.onCampus,
        label: 'Veteran and Military Affiliated Center',
        location: {
          x: 1100,
          y: 1400,
          parent: {
            id: 'student-perspectives',
            label: 'Student Perspectives'
          },
          modal: { type: 'imageAndText', id: 901 }
        }
      },
      {
        id: '16',
        type: LocationTypeEnum.onCampus,
        label: 'Fine Arts Center',
        location: {
          x: 1300,
          y: 1600,
          parent: {
            id: 'student-perspectives',
            label: 'Student Perspectives'
          },
          modal: { type: 'videoGallery', id: 902 }
        }
      }
    ]
  },
  {
    id: 'library',
    label: 'Library',
    children: [
      {
        id: '17',
        type: LocationTypeEnum.onCampus,
        label: 'Pathways Center',
        location: {
          x: 3730,
          y: 1200,
          parent: {
            id: 'library',
            label: 'Library'
          },
          modal: { type: 'imageSlider', id: 1001 }
        }
      }
    ]
  }
];
