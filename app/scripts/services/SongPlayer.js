(function () {
      function SongPlayer(Fixtures) {
           var SongPlayer = {};

           /**
           * @desc stores album info
           * @type {Object}
           */
           var currentAlbum = Fixtures.getAlbum();

           /**
           * @desc Buzz object audio file
           * @type {Object}
           */
           var currentBuzzObject = null;

           /**
           * @function setSong
           * @desc Stops currently playing song and loads new audio file as currentBuzzObject
           * @param {Object} song
           */
           var setSong = function(song){
             if (currentBuzzObject){
                 currentBuzzObject.stop()
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
            });

             SongPlayer.currentSong = song;
          };

           /**
           * @function playSong
           * @desc plays current Buzz object
           * @param {Object} song
           */
           var playSong = function(song){
             if (currentBuzzObject){
                 currentBuzzObject.play();
                 song.playing = true;
            }
          };

          /**
          * @function stopSong
          * @desc stops current Buzz object
          * @param {Object} song
          */
          var stopSong = function(song){
            if (currentBuzzObject === song){
                currentBuzzObject.stop();
                song.playing = null;
           }
         };

          /**
          * @function song
          * @desc gets index of song
          * @param {Object} song
          */
          var getSongIndex = function(song){
              return currentAlbum.songs.indexOf(song);
          };

          /**
          * @desc current song being used
          * @type {Object}
          */
          SongPlayer.currentSong = null;

           /**
           * @method play
           * @desc stops previous song and plays/sets current song when user initializes it.
           * @param {Object} song
           */
           SongPlayer.play = function(song){
               song = song || SongPlayer.currentSong;
               if(SongPlayer.currentSong !== song){
                  setSong(song);
                  currentBuzzObject.play();
                  song.playing = true;
              }else if (SongPlayer.currentSong === song) {
                  if(currentBuzzObject.isPaused()){
                     currentBuzzObject.play();
                     song.playing = true;
                  }
              }
          };

            /**
            * @method pause
            * @desc pauses current song
            * @param {Object} song
            */
            SongPlayer.pause = function(song){
                song = song || SongPlayer.currentSong;
                currentBuzzObject.pause();
                song.playing = false;
          };

          /**
          * @method stop
          * @desc stops current song
          * @param {Object} song
          */
          SongPlayer.stop = function(song){
              song = song || SongPlayer.currentSong;
              currentBuzzObject.stop();
              song.playing = null;
        };

          /**
          * @method next
          * @desc goes to next song
          */
           SongPlayer.next = function() {
               var currentSongIndex = getSongIndex(SongPlayer.currentSong);
               currentSongIndex++;

               if(currentSongIndex < 0){
                  currentBuzzObject.stop();
                  SongPlayer.currentSong.playing = null;
              }else{
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
              }
          };

           /**
           * @method previous
           * @desc goes to previous song
           */
            SongPlayer.previous = function() {
                var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                currentSongIndex--;

                if(currentSongIndex < 0){
                   currentBuzzObject.stop();
                   SongPlayer.currentSong.playing = null;
               }else{
                  var song = currentAlbum.songs[currentSongIndex];
                  setSong(song);
                  playSong(song);
               }
           };

           return SongPlayer;
      }

      angular
           .module('blocJams')
           .factory('SongPlayer', ['Fixtures', SongPlayer]);
  })();
