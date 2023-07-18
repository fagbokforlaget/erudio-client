export const content = {
  namespace: '15a85b2d-76b5-46bf-bccb-e5acd969bac9',
  schemaId: '229434de-872f-486b-ac7a-2b45484579f2',
  content: {
    competencyAims: {
      aims: [
        {
          teacherOnly: false,
          body: '<p>Is</p>',
          title: 'History',
        },
      ],
      hasCompetencyAims: false,
    },
    globalAudio: {
      type: 'none',
      value: '',
    },
    bannerImage: {
      imageId: '73d3a77a-5902-45e1-9bc3-d437cf268d20',
      altText: 'Learn Norwegian English',
      copyright: 'Fagbokforaget',
    },
    useAnchorScrollNav: false,
    altText: 'Introduction',
    copyright: 'Intro',
    author: 'Intro',
    readingTime: 1800,
  },
  type: 'OBJECT',
  createdAt: '2022-09-14T08:13:38.365Z',
  updatedAt: '2022-09-14T08:15:29.275Z',
  id: 'b942d4de-921c-4406-abbd-464dabb7b210',
  tags: [],
  localization: {
    en: {
      competencyAims: {
        aims: [],
        hasCompetencyAims: false,
      },
      linkToContentBlock: {},
      relatedLinks: {},
      globalAudio: {
        type: 'none',
        value: '',
      },
      bannerImage: {},
      useAnchorScrollNav: false,
      altText: 'sdfs',
      copyright: 'dfsdfs',
      author: 'sdfsdf',
    },
  },
};

export const learningPathContent = {
  content: {
    ...content,
    learningPath: { type: 'ref', id: 'b942d4de-921c-4406-abbd-464dabb7b323' },
  },
};

export const structureNodeData = {
  id: 'sample',
  name: 'sample',
  slug: 'sample',
  namespace: 'sample',
  description: 'sample',
  parent: 'sample',
  cover: 'sample',
  order: 45,
  type: 'sample',
  contentId: 'b942d4de-921c-4406-abbd-464dabb7b212',
  contentType: 'sample',
  createdAt: 'sample',
  updatedAt: 'sample',
  accessLevel: 'sample',
  contents: content,
  children: [
    {
      id: 'sample',
      name: 'sample',
      slug: 'sample',
      namespace: 'sample',
      description: 'sample',
      parent: 'sample',
      cover: 'sample',
      order: 45,
      type: 'sample',
      contentId: 'b942d4de-921c-4406-abbd-464dabb7b212',
      contentType: 'sample',
      createdAt: 'sample',
      updatedAt: 'sample',
      accessLevel: 'sample',
      contents: content,
    },
  ],
};
