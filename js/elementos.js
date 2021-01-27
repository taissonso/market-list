export {criarElemento, integrarElemento};

export default function criarElemento(elemento) {
    return document.createElement(elemento);
}

function integrarElemento(ondeAdicionar, elemento) {
    return ondeAdicionar.appendChild(elemento);
}