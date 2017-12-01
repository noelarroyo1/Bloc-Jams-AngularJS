(function () {
    function AlbumCtrl(Fixtures, SongPlayer){
      this.data = Fixtures.getAlbum();
      this.songPlayer = SongPlayer;
    }

      angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();
