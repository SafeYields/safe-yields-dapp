import { BackgroundImage, Container, ContainerProps } from '@mantine/core';
import { FC, ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  title: string;
  items?: { label: string; href: string }[];
} & Pick<ContainerProps, 'fluid'>;

export const PageContainer: FC<PageContainerProps> = ({ children, title, items, fluid }) => {
  return (
    <Container fluid={fluid}>
      <BackgroundImage src='/assets/background-abstraction.svg'>
        {children}
      </BackgroundImage>
    </Container>
  );
};
