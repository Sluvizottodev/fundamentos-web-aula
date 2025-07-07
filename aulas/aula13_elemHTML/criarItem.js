const criaItem = (elemHTML, atrib, valor)=>{
    const obj = document.createElement(elemHTML)
    obj [atrib] = valor
    return obj
}