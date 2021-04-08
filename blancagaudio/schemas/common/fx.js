const fx = {
  name: 'fx',
  type: 'document',
  title: 'Home Page Pics',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'Glitter Ball Button',
      name: 'glitter',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'FX Wheel',
      name: 'fxWheel',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    {
      name: 'colorBall_size_desktop',
      type: 'number',
      title: 'Glitter Ball Button Size (in px) for desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'glitter',
    },
    {
      name: 'colorBall_size_mobile',
      type: 'number',
      title: 'Glitter Ball Button Size (in px) for mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'glitter',
    },
    {
      name: 'fxWheel_size_desktop',
      type: 'number',
      title: 'Size of Each Button (in px) for desktop',
      description: 'The size of each button determines the size of the wheel',
      fieldset: 'fxWheel',
    },
    {
      name: 'fxWheel_size_mobile',
      type: 'number',
      title: 'Size of Each Button (in px) for mobile',
      description: 'The size of each button determines the size of the wheel',
      fieldset: 'fxWheel',
    },
  ],
};

export default fx;
