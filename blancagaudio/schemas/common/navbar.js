const navbar = {
  name: 'navbar',
  type: 'document',
  title: 'Home Page Pics',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'NavBar Sizes',
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
      name: 'textLogo',
      type: 'image',
      title: 'Text Logo',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'textLogo_size_desktop',
      type: 'number',
      title: 'Text Logo Size (in %) for Desktop',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'sizes',
    },
    {
      name: 'textLogo_size_mobile',
      type: 'number',
      title: 'Text Logo Size (in %) for Mobile',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'sizes',
    },
    {
      name: 'navLink_fontSize_mobile',
      type: 'number',
      title: 'Menu Items Font Size (in px) for mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'sizes',
    },
  ],
};

export default navbar;
