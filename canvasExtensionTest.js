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

if (TEx.onPage("/edit")) {
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


/*jslint browser: true, sloppy: false, eqeq: false, vars: false, maxerr: 50, indent: 4, plusplus: true */
/*global $, jQuery, alert, console, tinyMCE */

// These tools were designed to facilitate rapid course development in the Canvas LMS
// Copyright (C) 2014  Kenneth Larsen - Center for Innovative Design and Instruction
// Utah State University

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// http://www.gnu.org/licenses/agpl-3.0.html

////////////////////////////////////////////////////
// KENNETHWARE CONFIG                             //
////////////////////////////////////////////////////


// Development version will be loaded in the following courses
var iframeID,
    // Path to where the canvasCustomTools folder is located
    klToolsPath = 'https://tedgoddard.github.io/canvas-edit/kennethware/',
    // Path to the tools_variables file
    klToolsVariablesFile = klToolsPath + 'js/tools_variables.js',
    // Path to additional_customization file
    klToolsAdditionalCustomizationFile = klToolsPath + 'js/additional_customization.js',
    // To utilize the features that pull from the Canvas api you will need the hosted php files put their path here
    klApiToolsPath = klToolsPath + 'api/',
    // Path to institutional css file
    klGlobalCSSFile = 'https://tedgoddard.github.io/canvas-edit/kennethware/canvasGlobal.css',
    klFontAwesomePath = '//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css',
    coursenum;

function klGetCourseNum() {
    'use strict';
    var matches, killspot;
    // Parse Course Number - It is stored in the variable "coursenum"
    coursenum = null;
    matches = location.pathname.match(/\/courses\/(.*)/);
    if (matches) {
        coursenum = matches[1];
        killspot = coursenum.indexOf("/", 0);
        if (killspot >= 0) {
            coursenum = coursenum.slice(0, killspot);
        }
    }
}
klGetCourseNum();


// Pull in custom variables
$.getScript(klToolsVariablesFile, function () {
    'use strict';
    console.log("tools_variables.js loaded");
    // Additional Customization
    $.getScript(klToolsAdditionalCustomizationFile, function () {
        console.log("additional_customization.js loaded");
        // Run code to initialize tools
        $.getScript(klToolsPath + "js/master_controls.js", function () {
            console.log("master_controls.js loaded");
        });
    });
});

////////////////////////////////////////////////////
// END KENNETHWARE CONFIG                         //
////////////////////////////////////////////////////