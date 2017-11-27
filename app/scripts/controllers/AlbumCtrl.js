(function () {
    function AlbumCtrl(Fixtures){
      this.data = Fixtures.getAlbum();
    }

      angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
