import { Container, ContainerProps } from '@mantine/core';
import { FC, ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
  title: string;
  items?: { label: string; href: string }[];
} & Pick<ContainerProps, 'fluid'>;

export const PageContainer: FC<PageContainerProps> = ({ children, title, items, fluid }) => {
  return (
    <Container fluid={fluid} >
      {children}
    </Container>
  );
};

//
// styles={_ => ({
//   body: {
//     backgroundImage: 'assets/background-abstraction.svg',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     minHeight: '100vh',
//   },
// })}
