const musicFile = {
  name: 'musicFile',
  type: 'document',
  title: 'One Music File',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'track_cover',
      type: 'image',
      title: 'Cover Image',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'track_title',
      type: 'string',
      title: 'Track Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'track_file',
      type: 'file',
      title: 'Track File',
      validation: (Rule) => Rule.required(),
      options: {
        accept: 'audio/*',
      },
    },
  ],
};

export default musicFile;
