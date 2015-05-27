if (window.console) {
    console.log("We control the horizontal 9.");
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

function boxLink() {
    console.log("boxLink()");
    setup();
    removeOthers();
    tinymce.activeEditor.formatter.toggle('boxlink-edit');
    tinymce.activeEditor.formatter.toggle('boxlink');
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

function floatLeft() {
    console.log("floatLeft()");
    setup();
    tinymce.activeEditor.formatter.toggle('floatleft');
}
function floatRight() {
    console.log("floatRight()");
    setup();
    tinymce.activeEditor.formatter.toggle('floatright');
}

function verticalRegister() {
    console.log("verticalRegister()");
}
function vertical() {
    console.log("vertical()");
    setup();
try {
    removeOthers();
//    tinymce.activeEditor.formatter.toggle('vertical-edit-color');
//    tinymce.activeEditor.formatter.toggle('vertical-edit-width');
//    tinymce.activeEditor.formatter.toggle('vertical-edit');
    tinymce.activeEditor.insertContent("- V E R T I C A L - L I N E -");
    tinymce.activeEditor.formatter.toggle('vertical');

} catch(e) {
    console.log(e);
}
}

function removeOthers() {
    tinymce.activeEditor.formatter.remove('rightpanel');
    tinymce.activeEditor.formatter.remove('rightimage');
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

        tinymce.activeEditor.formatter.register('vertical-edit', {
           block : 'p',
//           styles : {"background-color": "grey", width: "20px", content : 'V R T C L'},
           styles : {color : '#f0f0f0', width: '40px'},
         });

        tinymce.activeEditor.formatter.register('vertical-edit-color', {
           block : 'p',
//           styles : {"background-color": "grey", width: "20px", content : 'V R T C L'},
           styles : {color : 'grey'},
         });
        tinymce.activeEditor.formatter.register('vertical-edit-width', {block : 'p', styles : {width: '40px'}});

        tinymce.activeEditor.formatter.register('boxlink-edit', {
           block : 'p',
           styles : {borderStyle: 'solid'}
         });
        tinymce.activeEditor.formatter.register('boxlink', {
           block : 'p',
           classes : "tex-boxlink"
         });

        tinymce.activeEditor.formatter.register('rightpanel', {
           block : 'p',
           classes : "tex-rightpanel"
         });

        tinymce.activeEditor.formatter.register('rightimage', {
           block : 'p',
           classes : "tex-rightimage"
         });


        tinymce.activeEditor.formatter.register('floatleft', {
           block: 'div',
           classes: "tex-floatleft",
           wrapper: true
         });

        tinymce.activeEditor.formatter.register('floatright', {
           block: 'div',
           classes: "tex-floatright",
           wrapper: true
         });

        texEditorRegistered = true;
    }
}

function onPage(name) {
    return (document.location.pathname.indexOf(name) + name.length == document.location.pathname.length);
}

function nearPage(name) {
    return (document.location.pathname.indexOf(name) > 0);
}

if (onPage("/edit")) {
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
    toolButton(toolDiv, "BoxLink", boxLink);
    toolButton(toolDiv, "fL", floatLeft);
    toolButton(toolDiv, "fR", floatRight);

    document.body.appendChild(toolDiv);
}

//Security restrictions in the browser may prevent this
//if (window.tinyMCE && nearPage("/custom-editor-test")) {
//    var oldInit = tinyMCE.init;
//    tinyMCE.init = function(options) {
//        console.log("tinyMCE override redux");
//        var contentCSS = ["https://tedgoddard.github.io/canvas-edit/canvasExtensionTest.css"];
//        var oldContentCSS = options["content_css"];
//        if (typeof oldContentCSS == 'string') {
//            contentCSS.push(oldContentCSS);
//        } else {
//            contentCSS = contentCSS.concat(oldContentCSS);
//        }
//        options["content_css"] = contentCSS;
//        console.log(options);
//        oldInit(options);
//    }
//}
