const util = {
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    savePic2SysGallery(context, { sType, oVm }) {
      oVm.$toast('已开始下载，请稍候');
      return new Promise((resolve) => {
        let downloadTask = window.plus.downloader.createDownload(context.getters.oFileInfo[sType].url, {}, (download) => {
          window.plus.gallery.save(download.filename.split('?')[0], (event) => {
            window.plus.io.resolveLocalFileSystemURL(download.filename, (file) => {
              file.remove(() => {
                resolve();
              });
            });
          });
        });
        downloadTask.start();
      });
    }
  }
}

export default util;