if (window.console) {
    console.log("We control the horizontal 3.");
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

function redLetters() {
    console.log("redLetters()");
    if (window.tinymce) {
        tinymce.activeEditor.formatter.register('redletters', {
           inline : 'span',
           styles : {color : '#ff0000'},
           classes : "fancybox"
         });
         tinymce.activeEditor.formatter.toggle('redletters');
    }
}

function rightPanel() {
    console.log("rightPanel()");
    if (window.tinymce) {
        tinymce.activeEditor.formatter.register('rightpanel', {
           block : 'p',
           classes : "tex-rightpanel"
         });
         tinymce.activeEditor.formatter.toggle('rightpanel');
    }
}

function toolButton(toolDiv, title, operation) {
    var newButton = document.createElement("button");
    toolDiv.appendChild(newButton);
    var buttonTitle = document.createTextNode(title);
    newButton.appendChild(buttonTitle);
    newButton.onclick = operation;
}

if (document.location.pathname.indexOf("/edit") + 5 == document.location.pathname.length) {
    var toolDiv = document.createElement("div");
    toolDiv.style.position = "fixed";
    toolDiv.style.bottom = "0px";
    toolDiv.style.left = "180px";
    toolDiv.style.zIndex = 1000;

    toolButton(toolDiv, "Two Panel", addFancyBox);
    toolButton(toolDiv, "Red", redLetters);
    toolButton(toolDiv, "Right Panel", rightPanel);

    document.body.appendChild(toolDiv);
}
