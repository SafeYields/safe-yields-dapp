import { createStyles } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

interface SocialMediaButtonProps {
  href: string;
  iconSrc: string;
  alt: string;
}

const useStyles = createStyles<string>((theme, params, getRef) => {
  return {
    link: {
      backgroundColor: '#9999ff',
      borderRadius: '9999px',
      padding: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      ':hover': {
        boxShadow: '0 0 12px 0 #9999ff',
      },
      width: 40,
      height: 40,
    },
    image: {
      width: '100%',
      height: 'auto',
    },
  };
});

function SocialMediaButton({ href, iconSrc, alt }: SocialMediaButtonProps) {
  const { classes, cx } = useStyles();

  return (
    <a href={href} target={'_blank'} className={cx([classes.link])} rel='noopener noreferrer'>
      <Image src={iconSrc} alt={alt} className={cx([classes.image])} width={0} height={0} />
    </a>
  );
}

export default SocialMediaButton;
