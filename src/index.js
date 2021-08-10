import './index.css';
import App from './App';
import ReactPanelElement from './ReactPanelElement.js';

customElements.define('react-panel', ReactPanelElement(App));
