const editor = document.getElementById("code");
const lineIndex = document.getElementById("line-index");

/* Detecta evento de clique ao pressionar sobre as teclas  ENTER  */
/* editor.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    createChildElement(lineIndex);
    updateLineIndex();
  }
}); */

/* Detecta um linha removida e atualiza o numero de índice de cada linha na barra lateral esquerda */
function changeObserver() {
  // Cria um novo observador de mutação
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      // Verifica se algum nó filho foi removido
      if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
        removeChildElement(lineIndex);
        updateLineIndex();
      }

      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        createChildElement(lineIndex);
        updateLineIndex();
      }
    });
  });
  // Configurações do observador para observar mudanças nos filhos do elemento 'code'
  const config = { childList: true };
  // Inicia a observação do elemento 'code' com as configurações definidas
  observer.observe(editor, config);
}

function createChildElement(element) {
  element.innerHTML += "<div></div>";
}

function removeChildElement(element) {
  if (element.children.length > 1) {
    const elementRemoved = element.firstElementChild;

    element.removeChild(elementRemoved);
  }
}

/* Atualiza o número do indíce de cada linha na barra lateral esquerda
 * Obtem todos os elementos filhos de lineIndex e percorre
 * com o metodo forEach altersndo o seu valor.
 */
function updateLineIndex() {
  const lineIndexChild = lineIndex.querySelectorAll("div");
  lineIndexChild.forEach((element, i) => {
    element.innerHTML = i + 1;
  });
}

changeObserver();
