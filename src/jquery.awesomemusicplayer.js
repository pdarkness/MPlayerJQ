(function ($) {

    $.fn.musicPlayer = function (userOptions, mySongList) {
        var pluginOptions = {
            autoPlay: true,
            defaultVol: 0.2,
            compact: false
        };

        var finalOptions = $.extend(pluginOptions, userOptions);

        return this.each(function (elem) {

            $(this).addClass("awesomePlayer"); //for CSS

            //Global variables
            var songListIterator = 0;
            var volume = Math.round(finalOptions.defaultVol * 100);

            //Root elements
            var audioElem = new Audio(mySongList[songListIterator]); //<audio> element

            var volumeWrapper = $('<div class="volwrapper"></div>') //Contains volume controls+info
            var controlWrapper = $('<div class="ctrlwrapper"></div>') //Contains Player controls
            var playlist = $("<ol class='playlist'></ol>");

            //Volume elements
            var volumeIndicator = $('<p class="vol"></p>');
            var incVolume = $("<button class='volbutton' value='+' >&uarr;</button>");
            var decVolume = $("<button class='volbutton' value='-' >&darr;</button>");
            var muteButton = $("<button class='volbutton' value='-' >M</button>");

            //Control elements
            var playButton = $("<button class='playbutton' value='Play' >&#9658;</button>");
            var progressBar = $("<progress id='progressBar' value='0' max='1' ></progress>");
            var lastSongButton = $("<button class='lastSong' value='last' >&larr;</button>");
            var nextSongButton = $("<button class='nextSong' value='next' >&rarr;</button>");

            //Init
            audioElem.volume = finalOptions.defaultVol; //init volume
            refreshPlaylist();
            updateVolumeText();
            if (finalOptions.autoPlay === true) {
                $(audioElem).prop('autoplay', true);
            }

            //Add root elements
            $(this).append(audioElem);
            $(this).append(volumeWrapper);
            $(this).append(controlWrapper);
            $(this).append(playlist);

            //Add volume elements
            volumeWrapper.append(volumeIndicator);
            volumeWrapper.append(decVolume);
            volumeWrapper.append(incVolume);
            volumeWrapper.append(muteButton);

            //Add player control elements
            controlWrapper.append(playButton);
            controlWrapper.append(progressBar);
            controlWrapper.append(lastSongButton);
            controlWrapper.append(nextSongButton);

            //Click listeners
            incVolume.click(function () {
                console.log(audioElem.volume);

                if (volume < 95) {
                    volume += 5;
                    audioElem.volume = volume / 100;
                } else {
                    volume = 100;
                    audioElem.volume = 1;
                }
                updateVolumeText();
            });

            muteButton.click(function () {
                if(audioElem.muted) {
                    audioElem.muted = false;
                    muteButton.removeClass("activeButton");
                }
                else {
                audioElem.muted = true;
                muteButton.addClass("activeButton");
                }
            });

            decVolume.click(function () {
                console.log(audioElem.volume);

                if (volume > 0) {
                    volume -= 5;
                    audioElem.volume = volume / 100;
                } else {
                    volume = 0;
                    audioElem.volume = 0;
                }
                updateVolumeText();
            });

            playButton.click(function () {
                if (audioElem.paused == false) {
                    audioElem.pause();
                } else {
                    audioElem.play();
                }
            });

            nextSongButton.click(function () {
                playNext();
            });

            lastSongButton.click(function () {
                playPrev();
            });

            //Audio player listeners
            $(audioElem).bind('pause', function () {
                playButton.html("&#9658;");
            });

            $(audioElem).bind('play', function () {
                playButton.html("||");
            });

            $(audioElem).bind('ended', function () {
                playNext();
            });

            $(audioElem).on('timeupdate', function () {
                progressBar.attr("value", this.currentTime / this.duration);
            });

            //Helper functions
            function playNext() {
                if (songListIterator < (mySongList.length - 1)) {
                    songListIterator++;
                }
                playSong(songListIterator)();
            }

            function playPrev() {
                if (songListIterator > 0) {
                    songListIterator--;
                }
                playSong(songListIterator)();
            }

            function updateVolumeText() {
                volumeIndicator.html("&#9834; " + volume + "%");
            }

            function playSong(i) {
                return function () {
                    songListIterator = i;
                    $(audioElem).prop('src', mySongList[i]);
                    audioElem.play();
                    refreshPlaylist();
                }
            }

            function refreshPlaylist() {
                playlist.html("");
                for (var song in mySongList) {
                    var element = $('<li>' + mySongList[song] + '</li>');
                    element.click(playSong(song));
                    if (song == songListIterator) {
                        element.addClass('nowPlaying');
                    }
                    if (song % 2 != 0) {
                        element.addClass('odd');
                    }
                    playlist.append(element);
                }
            }

        });
    }
})(jQuery);