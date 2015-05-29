if (window.console) {
    console.log("TEx Canvas Editor Extensions");
}

function boxLink() {
    setup();
    removeOthers();
    tinymce.activeEditor.formatter.toggle('boxlink-edit');
    tinymce.activeEditor.formatter.toggle('boxlink');
}

function rightImage() {
    setup();
    tinymce.activeEditor.formatter.toggle('rightimage');
}
function rightBlurImage() {
    setup();
    tinymce.activeEditor.formatter.toggle('rightblurimage');
}

function leftText() {
    setup();
    tinymce.activeEditor.formatter.toggle('lefttext');
}
function floatLeft() {
    setup();
    tinymce.activeEditor.formatter.toggle('floatleft');
}
function floatRight() {
    setup();
    tinymce.activeEditor.formatter.toggle('floatright');
}

function removeOthers() {
    tinymce.activeEditor.formatter.remove('rightimage');
}

function toolButton(toolDiv, title, operation) {
    var newButton = document.createElement("button");
    toolDiv.appendChild(newButton);
    var buttonTitle = document.createTextNode(title);
    newButton.appendChild(buttonTitle);
    newButton.onclick = operation;
}

var setups = [];
function register(name, tag, styles, wrapper) {
    if (!tag) {
        tag = 'p';
    }
    var options = {
        block: tag,
        classes: name
    }
    if (styles) {
        options.styles = styles;
    }
    if (wrapper) {
        options.wrapper = wrapper;
    }
    setups.push(function() {
        console.log("tinymce register " + name + " " + JSON.stringify(options));
        tinymce.activeEditor.formatter.register(name, options);
    });

    return function() {
        tinymce.activeEditor.formatter.toggle(name);
    }
}

var texEditorRegistered = false;
function setup() {
    if (!window.tinymce) {
        return;
    }
    if (!texEditorRegistered) {

        for (i = 0; i < setups.length; i++) {
            setups[i]();
        }

        tinymce.activeEditor.formatter.register('boxlink-edit', {
           block : 'p',
           styles : {borderStyle: 'solid'}
         });
        tinymce.activeEditor.formatter.register('boxlink', {
           block : 'p',
           classes : "tex-boxlink"
         });

        tinymce.activeEditor.formatter.register('rightimage', {
           block : 'p',
           classes : "tex-rightimage"
         });

//        tinymce.activeEditor.formatter.register('rightblurimage', {
//           block : 'p',
//           classes : "tex-rightblurimage"
//         });

        tinymce.activeEditor.formatter.register('lefttext', {
           block: 'p',
           classes: "tex-lefttext",
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
    var pathName = document.location.pathname;
    return (pathName.substr(pathName.length - name.length) == name);
}

function nearPage(name) {
    return (document.location.pathname.indexOf(name) > 0);
}

function addToolbar() {
    var toolDiv = document.createElement("div");
    toolDiv.style.position = "fixed";
    toolDiv.style.bottom = "0px";
    toolDiv.style.left = "180px";
    toolDiv.style.zIndex = 1000;

    toolButton(toolDiv, "Right Image", rightImage);
//    toolButton(toolDiv, "Right Blur Image", rightBlurImage);
    toolButton(toolDiv, ">Blur Image", register('tex-rightblurimage'));
    toolButton(toolDiv, "BoxLink", boxLink);
    toolButton(toolDiv, "tL", leftText);
    toolButton(toolDiv, "fL", floatLeft);
    toolButton(toolDiv, "fR", floatRight);

    document.body.appendChild(toolDiv);
}

if (onPage("/edit")) {
console.log("adding toolbar");
    addToolbar();
}

console.log("TEx Editor Extensions loaded." + onPage("/edit"));
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
