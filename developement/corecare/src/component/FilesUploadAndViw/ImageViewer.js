// src/components/ImageViewer.js

import React from 'react';

const ImageViewer = ({ imageUrl }) => {
    return <img src={imageUrl} alt="file" style={{ maxWidth: '100%' }} />;
};

export default ImageViewer;
