import React from 'react';

export default function Iframe({src, title}) {
  const calculateSize = () => {
    const height = window.innerHeight * .8;
    const width = 16 / 9 * height;
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  };

  const { width, height } = calculateSize();

  return (
    <iframe src={src} allowFullScreen title={title} width={width} height={height} />
  );
}
