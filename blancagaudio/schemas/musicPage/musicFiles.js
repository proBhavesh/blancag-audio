const musicFiles = {
  name: 'musicFiles',
  type: 'document',
  title: 'Music Files for Music Page',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'music_files',
      type: 'array',
      of: [{ type: 'musicFile' }],
      validation: (Rule) => Rule.unique().min(1),
    },
  ],
};

export default musicFiles;
