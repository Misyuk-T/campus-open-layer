import { SidebarItem } from '@src/types/global.ts';

export const items: SidebarItem[] = [
  {
    id: 'academic-administrative',
    label: 'Academic/Administrative',
    children: [
      {
        id: '1',
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
      }
    ]
  },
  {
    id: 'residences',
    label: 'Residences',
    children: [
      {
        id: '5',
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
      }
    ]
  },
  {
    id: 'dining-facilities',
    label: 'Dining Facilities',
    children: [
      {
        id: '7',
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
      }
    ]
  },
  {
    id: 'athletic-facilities',
    label: 'Athletic Facilities',
    children: [
      {
        id: '8',
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
      }
    ]
  },
  {
    id: 'off-campus',
    label: 'Off Campus Buildings/Facilities',
    children: [
      {
        id: '10',
        label: 'Marine Biology Lab',
        location: {
          x: 2000,
          y: 1200,
          parent: {
            id: 'off-campus',
            label: 'Off Campus Buildings/Facilities'
          },
          modal: { type: 'imageAndVideo', id: 501 }
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
        label: 'Pathways Center',
        location: {
          x: 1000,
          y: 1500,
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
