import './mystyles.scss';
import logoImg from './content/logo.svg';



const img = document.createElement('img');
img.src = logoImg;

const imgContainerElement = document.getElementById('imgContainer');

if (imgContainerElement) {
  imgContainerElement.appendChild(img);
}
