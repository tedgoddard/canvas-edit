/*
  canvasExtension.js
  TExMobile

  Created by Ted Goddard on 2015-01-14.
  Copyright (c) 2015 Robots and Pencils Inc. All rights reserved.
*/

var TEx = TEx || {};

if (window.console) {
    console.log("TEx Canvas Editor Extensions");
}

TEx.toolButton = function(toolDiv, title, operation) {
    var newButton = document.createElement("button");
    toolDiv.appendChild(newButton);
    var buttonTitle = document.createTextNode(title);
    newButton.appendChild(buttonTitle);
    newButton.onclick = operation;
}

TEx.setups = [];
TEx.register = function(name, tag, wrapper, styles) {
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
    TEx.setups.push(function() {
        console.log("tinymce.register " + name + " " + JSON.stringify(options));
        tinymce.activeEditor.formatter.register(name, options);
    });

    return function() {
        TEx.setup();
        tinymce.activeEditor.formatter.toggle(name);
    }
}

TEx.template = function(text) {
    return function() {
        TEx.setup();
        tinyMCE.activeEditor.insertContent(text);
    }
}

TEx.texEditorRegistered = false;
TEx.setup = function() {
    if (!window.tinymce) {
        return;
    }
    if (!TEx.texEditorRegistered) {
        for (i = 0; i < TEx.setups.length; i++) {
            TEx.setups[i]();
        }
        TEx.texEditorRegistered = true;
    }
}

TEx.onPage = function(name) {
    var pathName = document.location.pathname;
    return (pathName.substr(pathName.length - name.length) == name);
}

TEx.nearPage = function(name) {
    return (document.location.pathname.indexOf(name) > 0);
}

TEx.addToolbar = function() {
    var toolDiv = document.createElement("div");
    toolDiv.style.position = "fixed";
    toolDiv.style.bottom = "0px";
    toolDiv.style.left = "180px";
    toolDiv.style.zIndex = 1000;

    TEx.toolButton(toolDiv, "Right Image", TEx.register('tex-rightimage'));
    TEx.toolButton(toolDiv, "Right Blur Image", TEx.register('tex-rightblurimage'));
    TEx.toolButton(toolDiv, "Box Link", TEx.register('tex-boxlink'));
    TEx.toolButton(toolDiv, "Left Text", TEx.register('tex-lefttext'));
    TEx.toolButton(toolDiv, "Float Left", TEx.register('tex-floatleft', 'div', true));
    TEx.toolButton(toolDiv, "Float Right", TEx.register('tex-floatright', 'div', true));
    TEx.toolButton(toolDiv, "Link Template", TEx.template("<div class='tex-lefttext'>Column One</div><p class='tex-rightimage'><img src='https://tedgoddard.github.io/canvas-edit/tex-panel-small.png'></p><div class='tex-floatright'><p class='tex-boxlink'>Link One</p><p class='tex-boxlink'>Link Two</p></div>"));

    document.body.appendChild(toolDiv);
}

if (onPage("/edit")) {
    TEx.addToolbar();
}

if (window.tinyMCE && TEx.onPage("/edit")) {
    var oldInit = tinyMCE.init;
    tinyMCE.init = function() {
      console.log("MonkeyPatch tinyMCE arguments " + JSON.stringify(arguments[0]));
      arguments[0].content_css = ["/stylesheets_compiled/legacy_normal_contrast/bundles/what_gets_loaded_inside_the_tinymce_editor.css", "https://tedgoddard.github.io/canvas-edit/canvasExtensionTest.css"];
      arguments[0].external_plugins["visualblocks"] = "https://tedgoddard.github.io/canvas-edit/visualblocks/plugin.min.js";
      arguments[0].toolbar[1] += ",visualblocks";
      oldInit.apply(this, arguments);
    }

}
