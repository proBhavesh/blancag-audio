const skillsSection = {
  name: 'skillsSection',
  type: 'document',
  title: 'Skills Section Content',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'skillImage',
      type: 'image',
      title: 'Skill Image',
      options: {
        hotspot: true, // <-- Defaults to false
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'skillText',
      type: 'richText',
      title: 'Skill Text',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'skillImage',
    },
  },
};

export default skillsSection;
