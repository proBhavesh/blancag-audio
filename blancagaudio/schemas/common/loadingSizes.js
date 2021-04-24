const loadingSizes = {
  name: 'loadingSizes',
  type: 'document',
  title: 'Loading Indicator Sizes',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'loadingIndicator_size_desktop',
      type: 'number',
      title: 'Desktop Size',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
    },
    {
      name: 'loadingIndicator_size_mobile',
      type: 'number',
      title: 'Mobile Size',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
    },
  ],
};

export default loadingSizes;
