function backupSheetToDrive() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Ana klasöre yedekleme
  var mainFolder = DriveApp.getFolderById("1dhIeMxkn_7uxOFtLMJRHdabnmMsPTbIC"); // Ana Klasör ID'sini değiştirin
  var mainData = [];
  var mainRangeData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
  for (var i = 0; i < mainRangeData.length; i++) {
    var rowData = mainRangeData[i];
    var record = {
      "Sno": rowData[0].toString(),
      "Name": rowData[1].toString(),
      "Phone": rowData[2].toString(),
      "Date": rowData[3].toString(),
      "Time": rowData[4].toString()
    };
    mainData.push(record);
  }
  
  var mainJson = JSON.stringify(mainData);
  var mainFileName = "backup.json"; // Her seferinde aynı dosya adı
  var mainExistingFiles = mainFolder.getFilesByName(mainFileName);
  
  if (mainExistingFiles.hasNext()) {
    var mainFile = mainExistingFiles.next();
    mainFile.setContent(mainJson);
    Logger.log('Ana klasördeki yedek dosyası güncellendi: ' + mainFile.getName());
  } else {
    var mainBlob = Utilities.newBlob(mainJson, "application/json");
    var mainFile = mainFolder.createFile(mainBlob.setName(mainFileName));
    Logger.log('Ana klasörde yeni yedek dosyası oluşturuldu: ' + mainFile.getName());
  }
  
  var mainFileURL = mainFile.getDownloadUrl(); // JSON dosyasının indirme URL'si
  Logger.log("Ana klasördeki JSON dosyasının indirme URL'si: " + mainFileURL);

  // Diğer klasöre yeni yedekleme
  var otherFolder = DriveApp.getFolderById("1WcFB-87n6bmFcj9EoMLVWz3qwL6mZJCE"); // Diğer Klasör ID'sini değiştirin
  var otherData = [];
  var otherRangeData = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
  for (var j = 0; j < otherRangeData.length; j++) {
    var rowDataOther = otherRangeData[j];
    var recordOther = {
      "Sno": rowDataOther[0].toString(),
      "Name": rowDataOther[1].toString(),
      "Phone": rowDataOther[2].toString(),
      "Date": rowDataOther[3].toString(),
      "Time": rowDataOther[4].toString()
    };
    otherData.push(recordOther);
  }
  
  var otherJson = JSON.stringify(otherData, null, 2);
  var otherFileName = "backup_" + Utilities.formatDate(new Date(), "GMT+3", "yyyy-MM-dd__HH:mm:ss") + ".json";
  var otherBlob = Utilities.newBlob(otherJson, "application/json");
  var otherFile = otherFolder.createFile(otherBlob.setName(otherFileName));
  
  Logger.log('Diğer klasöre yeni yedek dosyası oluşturuldu: ' + otherFile.getName());
}
