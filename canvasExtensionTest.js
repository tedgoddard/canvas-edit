var texPanelImage="data:image/jpeg;base64,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Y4CayvbdPMuLaaJM43SROi5PbLADNb2p6j4Yn057bSdNvba6eSNvOubr7QixoeVUM5OWycnA9OgGN6deU58rptebt+jZjOioxb5035X/AFSOXorpMAooAKKAP//V/K+ivUMwooAKKANzRoNL1FzY67qkunRxxt9imkVp7aGSRgZBIucxRvgEsmBuG5s98MVcJ23VzSnNRbuk797/AKNG9rfhrWPDskX9pwjyJ8G3u4WE1rODjBjlX5Tn0OG9qdoXifVvD6yW9m6TWM//AB8WFynnWcwPXdEeAxz95dpzyc9Kv90+6/H/AC/U1/cSfWP3Nfo1+JpeLVY2/hRACWbw3pqhQCWLEyYAA5JPoOa3NS+JCmO0bwvo9vot1bWUdkLzd9pniij3Yjti4xGgJ+8QXPQgYBreu6clH3tklov87HRXWH5KUVUvywjHRPdX78q/G/kY58HRaVafa/G11/ZazRs0Gnqom1C4BBAzFyIoycZaTsegNcZJLLPLJcTu0ssrbpJJGLu7erMxJY+5NYe0gvhj95zOpSStGF/V3/K343CS4urp/tF7NJPOwXe8kjSsSABjc5LYAGFHYAAYAxTKwjFRVlsYNt7u5bTUNRijMMV5cpGyqhVZ5AuxSGCgBuFBAIAwKqVLpxbu0NTklZMs/bL3/n5n5O7/AF0nX1+919+tVqfJHsHOySSWaZt88kkrYxukdpGx6bmJOPxqOmklsJu4UUxBRQAUUAFFAH//1vyvor1DMKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKACigD/9f8r6K9QzCigAooAKKACigAooAKKACigAooAKKACigAooAKKACigAooA//Q/K+ivUMwooAKKACigAooAKKACigAooAKKACigAooAKKACigAooAKKAP/0fyvor1DMKKACj3oAKKACjrQAUUAFFABRQAUUAFFABRQAUUAFFABRQAUUAf/2Q==";



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
    toolButton(toolDiv, "Link Page", template("<div class='tex-lefttext'>Column One</div><p class='tex-rightblurimage'><img src='" + texPanelImage + "'></p><div class='tex-floatright'><p class='tex-boxlink'>Link One</p><p class='tex-boxlink'>Link Two</p></div>"));

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

