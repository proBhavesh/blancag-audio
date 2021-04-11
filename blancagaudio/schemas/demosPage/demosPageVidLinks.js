const demosPageVidLinks = {
  name: 'demosPageVidLinks',
  type: 'document',
  title: 'Links to Videos for Demos Page',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'vidLinks',
      type: 'array',
      of: [{ type: 'url' }],
      title: 'Video Links',
      description: 'Links to all the videos in the  demos page',
      validation: (Rule) => Rule.unique().min(1),
    },
  ],
};

export default demosPageVidLinks;
