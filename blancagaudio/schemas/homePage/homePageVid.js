const homePageVid = {
  name: 'homePageVid',
  type: 'document',
  title: 'Home Page Video',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'video',
      type: 'file',
      title: 'Video',
      description: 'This is the video shown on homepage',
      validation: (Rule) => Rule.required(),
      options: {
        accept: 'video/*',
      },
    },
  ],
};

export default homePageVid;
