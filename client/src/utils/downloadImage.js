import FileSaver from "file-saver";
export default function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}