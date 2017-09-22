
export class FileUtils {
  static checkFileExtension(fileName: string) : boolean{
    let lastIndexOf = fileName.toUpperCase().lastIndexOf('.PDF');
    if(lastIndexOf != -1 && lastIndexOf+4 == fileName.length){
      return true;
    } else {
      return false;
    }
  }

  static getFileName(fileName: string) : string{
    let lastIndexOf = fileName.toUpperCase().lastIndexOf('.PDF');
    return fileName.substr(0, lastIndexOf);
  }

}
