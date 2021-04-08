import React from 'react';

const highlightIcon = () => <span style={{ fontWeight: 'bold' }}>H</span>;
const highlightRender = (props) => (
  <span
    style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#bada55' }}
  >
    {props.children}
  </span>
);

const highlightBlock = {
  name: 'highlightBlock',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Heading 1', value: 'h1' }],
      lists: [],
      marks: {
        decorators: [
          {
            title: 'Highlight',
            value: 'highlight',
            blockEditor: {
              icon: highlightIcon,
              render: highlightRender,
            },
          },
        ],
      },
    },
  ],
};

export default highlightBlock;
