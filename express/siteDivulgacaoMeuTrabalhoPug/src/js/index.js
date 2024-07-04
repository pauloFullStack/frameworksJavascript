import '../sass/style.scss';
import eventsListener from "./events";
eventsListener();













/* O evento DOMContentLoaded é acionado no objeto document quando todo o HTML está completamente carregado e analisado, sem aguardar pelo carregamento de folhas de estilo, imagens e outros recursos externos, como o evento load. */

/* Se você deseja aguardar o carregamento completo de todo o conteúdo da página, incluindo folhas de estilo, imagens e outros recursos, pode usar o evento load: */

// window.addEventListener('load', function() {
//   // Este código será executado quando toda a página estiver completamente carregada
//   console.log('A página foi completamente carregada.');
//   // Aqui você pode realizar operações após o carregamento completo, como a manipulação de recursos carregados.
// });