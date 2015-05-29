if (window.console) {
    console.log("TEx Canvas Editor Extensions");
}

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
        console.log("tinymce.register " + name + " " + JSON.stringify(options));
        tinymce.activeEditor.formatter.register(name, options);
    });

    return function() {
        setup();
        tinymce.activeEditor.formatter.toggle(name);
    }
}

function template(text) {
    return function() {
        setup();
        tinyMCE.activeEditor.insertContent(text);
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

    toolButton(toolDiv, "Right Image", register('tex-rightimage'));
    toolButton(toolDiv, "Right Blur Image", register('tex-rightblurimage'));
    toolButton(toolDiv, "Box Link", register('tex-boxlink'));
    toolButton(toolDiv, "Left Text", register('tex-lefttext'));
    toolButton(toolDiv, "Float Left", register('tex-floatleft', 'div', true));
    toolButton(toolDiv, "Float Right", register('tex-floatright', 'div', true));
    toolButton(toolDiv, "Link Page", template("<div class='tex-lefttext'>Column One</div><p class='tex-rightimage'><div style='background: lightgrey; width: 400px; height: 800px;'></div></p><div class='tex-floatright'><p class='tex-boxlink'>Link One</p><p class='tex-boxlink'>Link Two</p></div>"));

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
//      arguments[0].paste_data_images = true;
      oldInit.apply(this, arguments);
    }


}

