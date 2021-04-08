const homePageText = {
  name: 'homePageText',
  type: 'document',
  title: 'Home Page Content',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'headLine',
      type: 'richText',
      title: 'Head Line',
      description:
        'This is the text shown over the video on homepage (min. 10 chars and max. 60 chars)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'aboutHighlight',
      type: 'highlightBlock',
      title: 'About Highlight',
      description: 'This is the text shown before the about section starts',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'aboutContent',
      type: 'richText',
      title: 'About Content',
      description: 'This is the main about content',
      validation: (Rule) => Rule.required(),
    },
  ],
};

export default homePageText;
