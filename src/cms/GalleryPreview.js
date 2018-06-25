import React from 'react';

const GalleryPreview = ({ entry, widgetsFor, getAsset }) => (
  <div className="gallery-preview">
    <h1>{entry.getIn(['data', 'title'])}</h1>
    <p>{entry.getIn(['data', 'description'])}</p>

    <h2>Imagens da galeria</h2>
    {widgetsFor('gallery').map((item, i) => (
      <div key={i} className="gallery-item">
        <img className={item.getIn(['data', 'featured']) ? 'featured' : ''} alt="" src={getAsset(item.getIn(['data', 'img']))} />
        <p>{item.getIn(['data', 'description'])}</p>
      </div>
    ))}

    <h2>Imagens do projeto</h2>
    {widgetsFor('project').map((item, i) => (
      <div key={i} className="gallery-item">
        <img className={item.getIn(['data', 'featured']) ? 'featured' : ''} alt="" src={getAsset(item.getIn(['data', 'img']))} />
        <p>{item.getIn(['data', 'description'])}</p>
      </div>
    ))}
  </div>
);

export default GalleryPreview;