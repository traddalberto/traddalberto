import CMS from 'netlify-cms';
import GalleryPreview from './GalleryPreview';

CMS.registerPreviewStyle('/previewStyle.css');

CMS.registerPreviewTemplate('projetos', GalleryPreview);
