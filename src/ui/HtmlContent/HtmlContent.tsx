import { createMarkup } from '@src/utils/helpers';

import { Box } from '@chakra-ui/react';

interface HtmlContentProps {
  content: string;
}

const HtmlContent = ({ content }: HtmlContentProps) => {
  return content ? (
    <Box
      color='white'
      textStyle='paragraphMedium'
      lineHeight='140%'
      sx={{
        '& a': {
          textDecoration: 'underline'
        },
        '& ul': {
          listStyleType: 'disc',
          marginLeft: '1.5em',
          my: '0.7em'
        },
        '& ol': {
          listStyleType: 'decimal',
          marginLeft: '1.5em',
          marginBottom: '1em'
        },
        '& li': {
          marginBottom: '0.5em'
        },
        '& em': {
          fontStyle: 'italic'
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontWeight: 'bold',
          marginBottom: '0.75em'
        },
        '& h1': {
          fontSize: '2xl'
        },
        '& h2': {
          fontSize: 'xl'
        },
        '& h3': {
          fontSize: 'lg'
        },
        '& h4': {
          fontSize: 'md'
        },
        '& h5': {
          fontSize: 'sm'
        },
        '& h6': {
          fontSize: 'xs'
        },
        '& blockquote': {
          borderLeft: '4px solid',
          borderColor: 'gray.600',
          paddingLeft: '1em',
          fontStyle: 'italic',
          color: 'gray.200',
          marginBottom: '1em'
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          marginBottom: '1em'
        },
        '& table': {
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '1em'
        },
        '& th, & td': {
          border: '1px solid',
          borderColor: 'gray.700',
          padding: '0.5em',
          textAlign: 'left'
        }
      }}
      dangerouslySetInnerHTML={createMarkup(content)}
    />
  ) : null;
};

export default HtmlContent;
