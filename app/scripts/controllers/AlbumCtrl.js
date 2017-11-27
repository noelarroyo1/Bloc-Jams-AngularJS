(function () {
    function AlbumCtrl(){
      this.data = albumPicasso;
    }

      angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
