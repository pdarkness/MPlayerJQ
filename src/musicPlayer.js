(function($){

    $.fn.musicPlayer = function( userOptions , mySongList){
        var pluginOptions = {
            autoPlay: true,
            defaultVol: 0.2,
            compact: false
        };

        var finalOptions = $.extend( pluginOptions, userOptions);

            return this.each ( function( elem ){
                //búa til html fyrir spilara
                //hengja á html elementið sem við erum að vinna á


                $(this).addClass("awesomePlayer");
                var songListIterator = 0;
                var audioElem = new Audio(mySongList[songListIterator]);
                var player = $(audioElem);
                player.attr('volume',finalOptions.defaultVol);
                var volume = Math.round(finalOptions.defaultVol*100);
                $(this).append( audioElem );
                var currentPlaying = $('<p></p>');
                var volumeIndicator = $('<p class="vol"></p>');
                var playlist = $("<ol class='playlist'></ol>");
                refreshPlaylist();
                if(finalOptions.autoPlay === true) {
                    $('#audioPlayer').prop('autoplay', true);
                }

                ///////  PLAY BUTTON /////////
                nowPlaying();
                $(this).append(volumeIndicator);

                var volumebar = $('<input type="range" min="0" max="100" />');
                $(this).append( volumebar );
               // $(this).append(currentPlaying);
                var playButton = $("<button class='playbutton' value='Play' >&#9658;</button>");
                $(this).append( playButton );
                playButton.click( function( ){
                    if (audioElem.paused == false) {
                        audioElem.pause();
                    } else {
                        audioElem.play();
                    }
                });
                updateVolumeText();



                player.bind('pause', function(){
                    playButton.html("&#9658;");
                });

                player.bind('play', function(){
                    playButton.html("||");
                });

                player.bind('ended', function(){
                    playNext();
                });
                //////   VOLUME //////



                volumebar.change( function ( ){
                            audioElem.volume = this.value / 100;
                            updateVolumeText();
                    });


                var progressBar = $("<progress id='progressBar' value='0' max='1' ></progress>");
                $(this).append(progressBar);


                player.on('timeupdate', function() {
                    progressBar.attr("value", this.currentTime / this.duration);
                   });

                var lastSongButton = $("<button class='lastSong' value='last' >&larr;</button>");
                    $(this).append(lastSongButton);

                var nextSongButton = $("<button class='nextSong' value='next' >&rarr;</button>");

                $(this).append(playlist);
                function playNext() {
                    if(songListIterator < (mySongList.length-1) )
                        songListIterator++;
                    player.prop('src', mySongList[songListIterator]);
                    audioElem.play();
                    refreshPlaylist();
                }
                function playPrev() {
                    if(songListIterator >0)
                        songListIterator--;
                    player.prop('src', mySongList[songListIterator]);
                    audioElem.play();
                    refreshPlaylist();
                }
                function nowPlaying(){
                    currentPlaying.html(mySongList[songListIterator]);
                }
                function updateVolumeText(){
                    volumeIndicator.html("&#9834;:" + volumebar.val() + "%");
                }
                $(this).append(nextSongButton);
                nextSongButton.click( function(){
                    playNext();
                });
                lastSongButton.click( function(){
                   playPrev();
                });
                function playSong( i ){
                    return function(){
                            songListIterator = i;
                            player.prop('src', mySongList[i]);
                            audioElem.play();
                    }
                }
                function refreshPlaylist() {
                    playlist.html("");
                    for(var song in mySongList) {
                        var element = $('<li>' + mySongList[song]  + '</li>');
                        element.click(playSong(song));
                        if(song == songListIterator) {
                            element.addClass('nowPlaying');
                        }
                        if( song % 2 != 0) {
                            element.addClass('odd');
                        }
                        playlist.append(element);
                    }
                }
                $(this).append(playlist);
            });
        }
})(jQuery);