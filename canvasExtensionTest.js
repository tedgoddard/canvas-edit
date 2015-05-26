if (window.console) {
    console.log("We control the horizontal 2.");
}

function addFancyBox() {
    console.log("addFancyBox()");
    if (window.tinymce) {
        tinymce.activeEditor.formatter.register('fancybox', {
           inline : 'span',
           styles : {color : '#00ff00'},
           classes : "fancybox"
         });
         tinymce.activeEditor.formatter.toggle('fancybox');
    }
}

var toolDiv = document.createElement("div");
toolDiv.style.position = "fixed";
toolDiv.style.bottom = "0px";
toolDiv.style.left = "180px";
toolDiv.style.zIndex = 1000
var formatButton = document.createElement("button");
toolDiv.appendChild(formatButton);
document.body.appendChild(toolDiv);
var buttonTitle = document.createTextNode("Two Panel");
formatButton.appendChild(buttonTitle);
formatButton.onclick = addFancyBox;