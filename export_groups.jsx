#target photoshop

function main(transparent, trim, includeInvisible, includeTopLayers, recursive) {
  if(!documents.length) return;
  var doc = activeDocument;
  var oldPath = activeDocument.path;
  for(var a=0;a<doc.layers.length;a++){
    if(doc.layers[a].visible||includeInvisible) {
      activeDocument.activeLayer = activeDocument.layers.getByName(doc.layers[a].name);
      dupLayers();
      var saveFile= File(oldPath +"/export/"+doc.layers[a].name +".png");
      SavePNG(saveFile, trim);
      app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
  }
}

function dupLayers() {
  var desc143 = new ActionDescriptor();
  var ref73 = new ActionReference();
  ref73.putClass( charIDToTypeID('Dcmn') );
  desc143.putReference( charIDToTypeID('null'), ref73 );
  desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
  var ref74 = new ActionReference();
  ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
  desc143.putReference( charIDToTypeID('Usng'), ref74 );
  executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );
};

function SavePNG(saveFile, trim) {
  pngSaveOptions = new PNGSaveOptions();
  pngSaveOptions.embedColorProfile = true;
  pngSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
  pngSaveOptions.matte = MatteType.NONE;
  pngSaveOptions.PNG8 = false;
  pngSaveOptions.transparency = true;
  if(trim) activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);
  activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
}

main(true,true,false);
