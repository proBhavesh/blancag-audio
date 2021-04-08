const homePage = {
  name: 'homePageSizes',
  type: 'document',
  title: 'Home Page Sizes',
  __experimental_actions: ['create', 'update', /*'delete',*/ 'publish'],
  fieldsets: [
    {
      title: 'Hero (Video Section)',
      name: 'hero',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'About Section',
      name: 'about',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'Skills Section',
      name: 'skills',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
    {
      title: 'Others',
      name: 'others',
      options: {
        collapsible: true,
        collapsed: true,
        columns: 2,
      },
    },
  ],
  fields: [
    // -- HERO
    {
      name: 'headLine_fontSize_desktop',
      type: 'number',
      title: 'Head Line Font Size (in px) for Desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'hero',
    },
    {
      name: 'headLine_fontSize_mobile',
      type: 'number',
      title: 'Head Line Font Size (in px) for Mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'hero',
    },
    // -- ABOUT
    {
      name: 'aboutHighlight_fontSize_desktop',
      type: 'number',
      title: 'About Highlight Font Size (in px) for Desktop',
      description: 'Will be apllied to highlight content',
      validation: (Rule) => Rule.required(),
      fieldset: 'about',
    },
    {
      name: 'aboutHighlight_fontSize_mobile',
      type: 'number',
      title: 'About Highlight Font Size (in px) for Mobile',
      description: 'Will be apllied to highlight content',
      validation: (Rule) => Rule.required(),
      fieldset: 'about',
    },
    {
      name: 'aboutSection_fontSize_desktop',
      type: 'number',
      title: 'About Section Font Size (in px) for Desktop',
      description: 'Will be apllied to paragraphs content',
      validation: (Rule) => Rule.required(),
      fieldset: 'about',
    },
    {
      name: 'aboutSection_fontSize_mobile',
      type: 'number',
      title: 'About Section Font Size (in px) for Mobile',
      description: 'Will be apllied to paragraphs content',
      validation: (Rule) => Rule.required(),
      fieldset: 'about',
    },
    {
      name: 'aboutPic_size_desktop',
      type: 'number',
      title: 'About Pic Size (in %) for desktop',
      description: 'It is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'about',
    },
    {
      name: 'aboutPic_size_mobile',
      type: 'number',
      title: 'About Pic Size (in %) for mobile',
      description: 'Same as for desktop',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'about',
    },
    {
      name: 'aboutSection_size_mobile',
      type: 'number',
      title: 'About Section Paragraph Size (in %) for Mobile',
      description: 'Will be apllied to paragraphs content',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'about',
    },
    // -- SKILLS
    {
      name: 'skillTitle_fontSize_desktop',
      type: 'number',
      title: 'Skill Title Font Size (in px) for desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'skills',
    },
    {
      name: 'skillTitle_fontSize_mobile',
      type: 'number',
      title: 'Skill Title Font Size (in px) for mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'skills',
    },
    {
      name: 'skillImage_size_desktop',
      type: 'number',
      title: 'Skill Image Size (in %) for desktop',
      description:
        'Skill image is a percent value of each column (try putting 100 to see the size of each column)',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'skills',
    },
    {
      name: 'skillImage_size_mobile',
      type: 'number',
      title: 'Skill Image Size (in %) for mobile',
      description:
        'Same as for desktop, except here it is a percentage of the screen',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'skills',
    },
    {
      name: 'skillContent_fontSize_desktop',
      type: 'number',
      title: 'Skill Content Font Size (in px) for desktop',
      validation: (Rule) => Rule.required(),
      fieldset: 'skills',
    },
    {
      name: 'skillContent_fontSize_mobile',
      type: 'number',
      title: 'Skill Content Font Size (in px) for mobile',
      validation: (Rule) => Rule.required(),
      fieldset: 'skills',
    },
    {
      name: 'skillCard_gaps',
      type: 'number',
      title: 'Gaps between each Skill Card (in px)',
      description:
        'Which in turn effects the look of the paragraphs beneath each card',
      validation: (Rule) => Rule.required(),
      fieldset: 'skills',
    },
    {
      name: 'skillSection_size_mobile',
      type: 'number',
      title: 'Skill Section Paragraph Size (in %) for Mobile',
      description: 'Will be apllied to paragraphs content',
      validation: (Rule) => Rule.required().min(0).max(100),
      fieldset: 'skills',
    },
    // -- OTHERS
    {
      name: 'sectionTitle_fontSize_desktop',
      type: 'number',
      title: "Sections' Title Font Size (in px) for desktop",
      validation: (Rule) => Rule.required(),
      fieldset: 'others',
    },
    {
      name: 'sectionTitle_fontSize_mobile',
      type: 'number',
      title: "Sections' Title Font Size (in px) for mobile",
      validation: (Rule) => Rule.required(),
      fieldset: 'others',
    },
  ],
};

export default homePage;
