const demosPageSizes = {
  name: 'demosPageSizes',
  type: 'document',
  title: 'Demos Page Sizes',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'Titles',
      name: 'titles',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'Icons',
      name: 'icons',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    // -- Titles
    {
      name: 'mainPlayer_title_fontSize_desktop',
      type: 'number',
      title: 'Main Player Title Size (in px) (for Desktop only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'titles',
    },
    {
      name: 'vidLight_title_fontSize_desktop',
      type: 'number',
      title:
        'Video Thumbnail (in Slider) Title Size (in px) (for Desktop only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'titles',
    },
    {
      name: 'vid_title_fontSize_mobile',
      type: 'number',
      title: 'Video Title Size (in px) (for Mobile only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'titles',
    },
    // -- ICONS
    {
      name: 'mainPlayer_playIcon_size_desktop',
      type: 'number',
      title: 'Main Player Play Icon Size (in px) (for Desktop only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'icons',
    },
    {
      name: 'vidLight_playIcon_size_desktop',
      type: 'number',
      title:
        'Video Thumbnail (in Slider) Play Icon Size (in px) (for Desktop only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'icons',
    },
    {
      name: 'vidSlider_arrow_size_desktop',
      type: 'number',
      title: 'Video  Slider Arrow Icon Size (in px) (for Desktop only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'icons',
    },
    {
      name: 'vid_playIcon_size_mobile',
      type: 'number',
      title: 'Video Play Icon (in px) (for Mobile only)',
      validation: (Rule) => Rule.required(),
      fieldset: 'icons',
    },
    {
      name: 'backToTopButton_size_mobile',
      type: 'number',
      title: 'Back To Top Button size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'icons',
    },
  ],
};

export default demosPageSizes;
