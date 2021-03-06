// (c) iTechieGamer 2018

WScript.Echo('Make sure that this script is running in command prompt!\nIf not, then terminate the "wscript.exe" process.');

var WShell = new ActiveXObject('WScript.Shell'), fsObject = new ActiveXObject('Scripting.FileSystemObject'),
    currentDir = fsObject.GetParentFolderName(fsObject.GetFile(WScript.ScriptFullName)),
    saveFile = currentDir + '\\OpenTags_' + new Date().getTime() + '.txt',
    xmlHttp = new ActiveXObject('MSXML2.XMLHTTP'), xmlHttp2 = new ActiveXObject('MSXML2.XMLHTTP'), output = '', json;
var verbose = true;

var jsonLib = fsObject.OpenTextFile(currentDir + '\\lib\\json2.js', 1);
eval(jsonLib.ReadAll());
jsonLib.Close();

WScript.Echo('\nNOTE: This script may identify pages as false-positives.\n');

xmlHttp.onreadystatechange = function() {
  if(xmlHttp.readyState == 4) {
    json = JSON.parse(xmlHttp.responseText);
    for(var a = 0; a < (json.query.allpages.length - 1); a++) {
      xmlHttp2.onreadystatechange = function() {
        if(xmlHttp2.readyState == 4) {
          if(xmlHttp2.responseText == '') WScript.Echo('[WARN] Got a blank response at page "' + json.query.allpages[a].title + '"');
          else {
            var b = xmlHttp2.responseText, f;
            if(b.match(/<[^\/!]/g) != null) {
              var c = b.match(/<[^\/!]/g).length,
                  d = b.match(/<\//g).length;
              if(b.match(/\/>/g))
                var e = b.match(/\/>/g).length;
              else var e = 0;
              f = c - d - e;
            }
            if(verbose) WScript.Echo('└ Detected ' + f + ' open tag(s)');
            if(f != 0 && f != undefined) output += json.query.allpages[a].title + '\n';
          }
        }
      };
      if(verbose) WScript.Echo(json.query.allpages[a].title);
      xmlHttp2.open('GET', 'https://minecraft.gamepedia.com/index.php?action=raw&title=' + json.query.allpages[a].title, false);
      xmlHttp2.send();
    }
    if(json['continue']) {
      xmlHttp.open('GET', 'https://minecraft.gamepedia.com/api.php?action=query&list=allpages&aplimit=500&formatversion=2&format=json&apcontinue=' + json['continue'].apcontinue, false);
      xmlHttp.send();
    }
    else {
      var adodbStream = new ActiveXObject('ADODB.Stream');
      adodbStream.Type = 2;
      adodbStream.CharSet = 'Windows-1252';
      adodbStream.Open();
      adodbStream.WriteText('NOTE: This list may contain false-positives.\n\n' + output);
      adodbStream.SaveToFile(saveFile, 2);
      adodbStream.Close();
      WScript.Echo('List of open tags are saved at ' + saveFile);
    }
  }
};
xmlHttp.open('GET', 'https://minecraft.gamepedia.com/api.php?action=query&list=allpages&aplimit=500&formatversion=2&format=json', false);
xmlHttp.send();