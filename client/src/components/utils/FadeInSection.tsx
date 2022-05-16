import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';

const fadeInSection = {
  opacity: '0',
  transform: 'translateY(-25px)',
  visibility: 'hidden',
  transition: 'all 2.5s ease-out',
};

const fadeInSectionVisible = {
  opacity: '1',
  transform: 'none',
  visibility: 'visible',
};

interface FadeInSectionProps {
  children: JSX.Element[] | JSX.Element;
}

const FadeInSection = (props: FadeInSectionProps) => {
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (!isVisible) setVisible(entry.isIntersecting);
      }),
    );
    observer.observe(domRef.current);

    const currentDomRef = domRef.current;

    return () => observer.unobserve(currentDomRef);
  }, [isVisible]);

  return (
    <Box
      ref={domRef}
      sx={{
        ...fadeInSection,
        ...(isVisible ? fadeInSectionVisible : undefined),
      }}
    >
      {props.children}
    </Box>
  );
};

export default FadeInSection;
