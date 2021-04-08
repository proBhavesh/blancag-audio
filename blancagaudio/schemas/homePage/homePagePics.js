const homePagePics = {
  name: 'homePagePics',
  type: 'document',
  title: 'Home Page Pics',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'aboutPic',
      type: 'image',
      title: 'About Pic',
      description: 'Pic at the end of the about section',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'toolsPics',
      type: 'array',
      of: [{ type: 'image' }],
      title: 'Tools Pics',
      description:
        'Pics for all the tools (to  be used in the skills+tools section)',
      validation: (Rule) => Rule.unique(),
      options: {
        layout: 'grid',
      },
    },
  ],
};

export default homePagePics;
