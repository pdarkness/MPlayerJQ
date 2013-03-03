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
            defaultVol: 100,
            compact: false
        };

        var finalOptions = $.extend( pluginOptions, userOptions);

            return this.each ( function( elem ){
                //búa til html fyrir spilara
                //hengja á html elementið sem við erum að vinna á
                var player = $("<audio id='audioPlayer'> "+ songsNow +" <p>Sorry, your browser does not support this</p></audio>");
                $(this).append( player );
                var audioElem = document.getElementById("audioPlayer");

                var playButton = $("<button id='playButton' value='Play' />");
                playButton.click( function( ){
                    if (audioElem.paused == false) {
                        audioElem.pause();
                    } else {
                        audioElem.play();
                    }

                });

                var volumeButtonPlus = $("<button id='volumePlus' value='what' />");
                $(this).append( volumeButtonPlus );
                volumeButtonPlus.click( function ( ){
                    audioElem.volume += 0.1;
                })
                var volumeButtonMinus = $("<button id='volumeMinus' value='lowerThatShit' />");
                $(this).append( volumeButtonMinus );
                volumeButtonMinus.click( function( ){
                    audioElem.volume -= 0.1;
                })

                $(this).append( playButton );

                player.on("progress", function(e){
                   // fix this
                })



            });
        }
})(jQuery);