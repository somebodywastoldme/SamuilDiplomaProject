import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, styled } from '@mui/material';

interface PageTitleWrapperProps {
  children?: ReactNode;
  padding?: number;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children, padding }) => {
  const PageTitle = styled(Box)(
    ({ theme }) => `
          padding: ${padding ? padding + 'px' : theme.spacing(4)};
  `
  );
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <Container maxWidth="lg">{children}</Container>
    </PageTitle>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
