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
                var player = $("<audio id='audioPlayer'><p>Sorry, your browser does not support this</p></audio>");
                $(this).append( player );




                var audioElem = document.getElementById("audioPlayer");
                audioElem.volume = finalOptions.defaultVol;

                var songListIterator = 0;
                audioElem.src = mySongList[songListIterator];

                if(finalOptions.autoPlay === true)
                    $('#audioPlayer').prop('autoplay', true);

                ///////  PLAY BUTTON /////////
                var playButton = $("<button id='playButton' value='Play' >Play</button>");
                $(this).append( playButton );
                playButton.click( function( ){
                    if (audioElem.paused == false) {
                        audioElem.pause();
                    } else {
                        audioElem.play();
                    }
                });


                //////   VOLUME //////
                var volumeButtonPlus = $("<button id='volumePlus' value='VolUp' >+</button>");
                $(this).append( volumeButtonPlus );

                var volumeButtonMinus = $("<button id='volumeMinus' value='VolDown' >-</button>");
                $(this).append( volumeButtonMinus );

                    volumeButtonMinus.click( function( ){
                        if (audioElem.volume > 0.1)
                        audioElem.volume -= 0.1;
                    });

                    volumeButtonPlus.click( function ( ){
                        if (audioElem.volume < 0.9)
                        audioElem.volume += 0.1;
                    });


                var progressBar = $("<progress id='progressBar' value='0' max='1' ></progress>");
                $(this).append(progressBar);


                player.on('timeupdate', function() {
                    $('#progressBar').attr("value", this.currentTime / this.duration);
                   });

                var nextSongButton = $("<button id='nextSong' value='next' >Next</button>");
                    $(this).append(nextSongButton);
                var lastSongButton = $("<button id='lastSong' value='last' >Last</button>");
                    $(this).append(lastSongButton);

                nextSongButton.click( function(){
                    if(songListIterator < mySongList.length-1)
                        songListIterator = songListIterator+1;
                        $('#audioPlayer').prop('src', mySongList[songListIterator]);
                        audioElem.play();
                });

                lastSongButton.click( function(){
                   if(songListIterator >0)
                        songListIterator = songListIterator-1;
                        $('#audioPlayer').prop('src', mySongList[songListIterator]);
                        audioElem.play();
                });
            });
        }
})(jQuery);