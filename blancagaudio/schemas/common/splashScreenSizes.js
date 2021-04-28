const splashScreenSizes = {
  name: 'splashScreenSizes',
  type: 'document',
  title: 'Splash Screen Avatar Sizes',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'splashScreen_size_desktop',
      type: 'number',
      title: 'Splash Screen Avatar Size (in %) for Desktop',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
    },
    {
      name: 'splashScreen_size_mobile',
      type: 'number',
      title: 'Splash Screen Avatar Size (in %) for Mobile',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
    },
  ],
};

export default splashScreenSizes;
