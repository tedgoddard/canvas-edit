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
    setup();
    tinymce.activeEditor.formatter.toggle('rightpanel');
}

function rightImage() {
    console.log("rightImage()");
    setup();
    tinymce.activeEditor.formatter.toggle('rightimage');
}

function verticalRegister() {
    console.log("verticalRegister()");
}
function vertical() {
    console.log("vertical()");
    setup();
try {
    tinymce.activeEditor.formatter.remove('rightpanel');
    tinymce.activeEditor.formatter.remove('rightimage');
    tinymce.activeEditor.formatter.toggle('vertical-edit-color');
    tinymce.activeEditor.formatter.toggle('vertical-edit-width');
    tinymce.activeEditor.formatter.toggle('vertical');
} catch(e) {
    console.log(e);
}
}

function toolButton(toolDiv, title, operation) {
    var newButton = document.createElement("button");
    toolDiv.appendChild(newButton);
    var buttonTitle = document.createTextNode(title);
    newButton.appendChild(buttonTitle);
    newButton.onclick = operation;
}

var texEditorRegistered = false;
function setup() {
    if (!window.tinymce) {
        return;
    }
    if (!texEditorRegistered) {

        tinymce.activeEditor.formatter.register('vertical', {
           block : 'p',
           classes : "tex-vertical-line"
         });

        tinymce.activeEditor.formatter.register('vertical-edit-color', {
           block : 'p',
//           styles : {"background-color": "grey", width: "20px", content : 'V R T C L'},
           styles : {color : 'grey'},
         });
        tinymce.activeEditor.formatter.register('vertical-edit-width', {
           block : 'p',
           styles : {width: '40px'},
         });

        tinymce.activeEditor.formatter.register('rightpanel', {
           block : 'p',
           classes : "tex-rightpanel"
         });

        tinymce.activeEditor.formatter.register('rightimage', {
           block : 'p',
           classes : "tex-rightimage"
         });


        texEditorRegistered = true;
    }
}

if (document.location.pathname.indexOf("/edit") + 5 == document.location.pathname.length) {
    var toolDiv = document.createElement("div");
    toolDiv.style.position = "fixed";
    toolDiv.style.bottom = "0px";
    toolDiv.style.left = "180px";
    toolDiv.style.zIndex = 1000;

    toolButton(toolDiv, "Setup", setup);
    toolButton(toolDiv, "Two Panel", addFancyBox);
    toolButton(toolDiv, "Red", redLetters);
    toolButton(toolDiv, "Right Panel", rightPanel);
    toolButton(toolDiv, "Right Image", rightImage);
    toolButton(toolDiv, "|", vertical);

    document.body.appendChild(toolDiv);
}
