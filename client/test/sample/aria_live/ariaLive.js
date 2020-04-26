// https://timwright.org/blog/2017/02/18/using-aria-live-regions/

function onButtonClick() {
    document.getElementById("header").innerHTML = "This is a better title!";
}

document.getElementById("attach-onclick").addEventListener("click", onButtonClick);

/*
* Occasions where JS will modify the DOM:
* - innerHTML or outerHTML is set
* - any attribute is changed
* - 
*/

