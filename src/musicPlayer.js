(function($){

    $.fn.musicPlayer = function( userOptions , mySongList){
        var songsNow = "";
        for(var i=0;i<mySongList.length;i++){
            songsNow = songsNow + ("<source src='");
            songsNow = songsNow + mySongList[i];
            songsNow = songsNow + ("' />\n");
        }
        console.log(songsNow);

        var pluginOptions = {
            autoPlay: true,
            defaultVol: 0.2,
            compact: false
        };

        var finalOptions = $.extend( pluginOptions, userOptions);

            return this.each ( function( elem ){
                //búa til html fyrir spilara
                //hengja á html elementið sem við erum að vinna á
                var player = $("<audio id='audioPlayer'> "+ songsNow +" <p>Sorry, your browser does not support this</p></audio>");
                $(this).append( player );
                if(finalOptions.autoPlay === true)
                    $('#audioPlayer').prop('autoplay', true);


                var audioElem = document.getElementById("audioPlayer");
                audioElem.volume = finalOptions.defaultVol;



                ///////  PLAY BUTTON /////////
                var playButton = $("<button id='playButton' value='Play' />");
                playButton.click( function( ){
                    if (audioElem.paused == false) {
                        audioElem.pause();
                    } else {
                        audioElem.play();
                    }
                });
                $(this).append( playButton );

                //////   VOLUME //////
                var volumeButtonPlus = $("<button id='volumePlus' value='VolUp' />");
                $(this).append( volumeButtonPlus );

                var volumeButtonMinus = $("<button id='volumeMinus' value='VolDown' />");
                $(this).append( volumeButtonMinus );

                    volumeButtonMinus.click( function( ){
                        if (audioElem.volume > 0.1)
                        audioElem.volume -= 0.1;
                        console.log(audioElem.volume);
                    });

                    volumeButtonPlus.click( function ( ){
                        if (audioElem.volume < 0.9)
                        audioElem.volume += 0.1;
                        console.log(audioElem.volume);
                    });


                var progressBar = $("<progress id='progressBar' value='0' max='1' ></progress>");
                $(this).append(progressBar);


                player.on('timeupdate', function() {
                    $('#progressBar').attr("value", this.currentTime / this.duration);
                   });



            });
        }
})(jQuery);