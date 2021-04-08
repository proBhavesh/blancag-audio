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
      accept: 'video/*',
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default homePageVid;
