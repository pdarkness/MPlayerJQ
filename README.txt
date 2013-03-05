How to use MplayerJQ plugin.

First of all since this is a JQuery plugin your website must include Jquery at least v1.5.
Next you must include our script with the following line:
<head>
<script src="musicPlayer.js"></script>

Then we ask you to put this script within the <head> along with the one here below

    <script type="text/javascript" >

        $(document).ready( function( ) {

            // Note: this version assumes a JavaScript array of songs, but
            // the other approach is also acceptable
            var mySongList = [  "songs/song1.mp3",
                                "songs/song2.mp3",
                                "songs/song3.mp3",
                                "songs/song4.mp3",
                                "songs/song5.mp3"
            ];

            $("#thePlayer").musicPlayer( {autoPlay: false, defaultVol: 0.3} , mySongList );
            $("#thePlayer2").musicPlayer( {autoPlay: false, defaultVol: 0.3} , mySongList );
            // Optionally, the function should accept an object containing optional values,
            // such as a boolean "autostart" value, i.e. if the player should start playing
            // immediately etc.
        });
    </script>
</head>

then to get a music player on your site! This plays the links listed in mySongList

<body>
<div id="thePlayer"></div>
<div id="thePlayer2"></div>

That's the basics Enjoy!:)