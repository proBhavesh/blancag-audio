const musicPageSizes = {
  name: 'musicPageSizes',
  type: 'document',
  title: 'Music Page Sizes',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'Main Player',
      name: 'mainPlayer',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'PlayList',
      name: 'playlist',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 1,
      },
    },
  ],
  fields: [
    // -- Main player
    {
      name: 'mainPlayer_title_fontSize_desktop',
      type: 'number',
      title: 'MAIN PLAYER Song Title Size (in px) for Desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_title_fontSize_mobile',
      type: 'number',
      title: 'MAIN PLAYER Song Title Size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_byLine_fontSize_desktop',
      type: 'number',
      title: 'MAIN PLAYER By-Line Size (in px) for Desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_byLine_fontSize_mobile',
      type: 'number',
      title: 'MAIN PLAYER By-Line Size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_duration_fontSize_desktop',
      type: 'number',
      title: 'MAIN PLAYER Duration Size (in px) for Desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_duration_fontSize_mobile',
      type: 'number',
      title: 'MAIN PLAYER Duration Size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_icons_size_desktop',
      type: 'number',
      title: 'MAIN PLAYER Icon Sizes (in px) for Desktop',
      description:
        'Will be applied to all the icons in the main player (the circle for the play/pause button will be adjusted accordingly)',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    {
      name: 'mainPlayer_icons_size_mobile',
      type: 'number',
      title: 'MAIN PLAYER Icon Sizes (in px) for Mobile',
      description:
        'Will be applied to all the icons in the main player (the circle for the play/pause button will be adjusted accordingly)',
      validation: (Rule) => Rule.required(),
      fieldset: 'mainPlayer',
    },
    // -- Playlist
    {
      name: 'playlist_fontSize_desktop',
      type: 'number',
      title: 'PLAYLIST Size (in px) for Desktop',
      description:
        'Everything is the same size in desktop (including share icons)',
      validation: (Rule) => Rule.required(),
      fieldset: 'playlist',
    },
    {
      name: 'playlist_title_fontSize_mobile',
      type: 'number',
      title: 'PLAYLIST Title Size (in px) for Mobile',
      description: 'Will also be applied to share icons',
      validation: (Rule) => Rule.required(),
      fieldset: 'playlist',
    },
    {
      name: 'playlist_duration_fontSize_mobile',
      type: 'number',
      title: 'PLAYLIST Duration Size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'playlist',
    },
  ],
};

export default musicPageSizes;
