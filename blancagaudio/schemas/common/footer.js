const footer = {
  name: 'footer',
  type: 'document',
  title: 'Home Page Pics',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'Footer Links',
      name: 'links',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      title: 'Footer Sizes',
      name: 'sizes',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    {
      name: 'linkedIn',
      type: 'url',
      title: 'LinkedIn URL',
      fieldset: 'links',
    },
    {
      name: 'vimeo',
      type: 'url',
      title: 'Vimeo URL',
      fieldset: 'links',
    },
    {
      name: 'youtube',
      type: 'url',
      title: 'YouTube URL',
      fieldset: 'links',
    },
    {
      name: 'soundCloud',
      type: 'url',
      title: 'SoundCloud URL',
      fieldset: 'links',
    },
    {
      name: 'socialIcons_gap',
      type: 'number',
      title: 'Gaps between each social media icon (in px)',
      validation: (Rule) => Rule.required(),
      fieldset: 'sizes',
    },
    {
      name: 'socialIcons_size_desktop',
      type: 'number',
      title: 'Size of Each Button (in px) for desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'sizes',
    },
    {
      name: 'socialIcons_size_mobile',
      type: 'number',
      title: 'Size of Each Button (in px) for mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'sizes',
    },
  ],
};

export default footer;
