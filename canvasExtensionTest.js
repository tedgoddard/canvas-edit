if (window.console) {
    console.log("TEx Canvas Editor Extensions 2");
}

//function boxLink() {
//try {
//    setup();
////    removeOthers();
//    tinymce.activeEditor.formatter.toggle('boxlink-edit');
//    tinymce.activeEditor.formatter.toggle('boxlink');
//} catch (e) {
//console.log(e);
//}
//}

//function rightImage() {
//    setup();
//    tinymce.activeEditor.formatter.toggle('rightimage');
//}
//function rightBlurImage() {
//    setup();
//    tinymce.activeEditor.formatter.toggle('rightblurimage');
//}

//function leftText() {
//    setup();
//    tinymce.activeEditor.formatter.toggle('lefttext');
//}
//function floatLeft() {
//    setup();
//    tinymce.activeEditor.formatter.toggle('floatleft');
//}
//function floatRight() {
//    setup();
//    tinymce.activeEditor.formatter.toggle('floatright');
//}

//function removeOthers() {
//    tinymce.activeEditor.formatter.remove('rightimage');
//}

function toolButton(toolDiv, title, operation) {
    var newButton = document.createElement("button");
    toolDiv.appendChild(newButton);
    var buttonTitle = document.createTextNode(title);
    newButton.appendChild(buttonTitle);
    newButton.onclick = operation;
}

var setups = [];
function register(name, tag, wrapper, styles) {
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
        setup();
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

//        tinymce.activeEditor.formatter.register('lefttext', {
//           block: 'p',
//           classes: "tex-lefttext",
//         });
//        tinymce.activeEditor.formatter.register('floatleft', {
//           block: 'div',
//           classes: "tex-floatleft",
//           wrapper: true
//         });
//
//        tinymce.activeEditor.formatter.register('floatright', {
//           block: 'div',
//           classes: "tex-floatright",
//           wrapper: true
//         });

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

    toolButton(toolDiv, ">Image", register('tex-rightimage'));
    toolButton(toolDiv, ">Blur Image", register('tex-rightblurimage'));
    toolButton(toolDiv, "Box Link", register('tex-boxlink'));
    toolButton(toolDiv, "tL", register('tex-lefttext'));
    toolButton(toolDiv, "fL", register('tex-floatleft', 'div', true));
    toolButton(toolDiv, "fR", register('tex-floatright', 'div', true));
//    toolButton(toolDiv, "tL", leftText);
//    toolButton(toolDiv, "fL", floatLeft);
//    toolButton(toolDiv, "fR", floatRight);

    document.body.appendChild(toolDiv);
}

if (onPage("/edit")) {
    addToolbar();
}

console.log("TEx Editor Extensions loaded." + onPage("/edit"));

if (window.tinyMCE && nearPage("/editor-extension-test")) {
    var oldInit = tinyMCE.init;
    tinyMCE.init = function() {
      console.log("MonkeyPatch tinyMCE arguments " + JSON.stringify(arguments[0]));
      arguments[0].content_css = ["/stylesheets_compiled/legacy_normal_contrast/bundles/what_gets_loaded_inside_the_tinymce_editor.css", "https://tedgoddard.github.io/canvas-edit/canvasExtensionTest.css"];
      arguments[0].external_plugins["visualblocks"] = "https://tedgoddard.github.io/canvas-edit/visualblocks/plugin.min.js";
      arguments[0].toolbar[1] += ",visualblocks";
      oldInit.apply(this, arguments);
    }


}

