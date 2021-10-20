// ==UserScript==
// @name         Spotify Lyrics Button
// @namespace    vanawy
// @version      0.1
// @description  Add search lyrics buttons for songs on open.spotify.com
// @author       @Vanawy [Vanawy Firo]
// @match        https://open.spotify.com/*
// @icon         https://www.google.com/s2/favicons?domain=spotify.com
// @require      http://code.jquery.com/jquery-latest.js
// @updateURL    https://github.com/Vanawy/spotify-song-lyrics/blob/master/spotify-song-lyrics.user.js?raw=true
// @grant        none
// ==/UserScript==

(function() {
    let i = 0;
    $(document).on("mouseenter","[data-testid='tracklist-row']",function() {
        let attr = $(this).parent().attr('id');

        // For some browsers, `attr` is undefined; for others,
        // `attr` is false.  Check for both.
        if (typeof attr === typeof undefined || attr === false) {
            $( this ).wrap( "<div class='song' id='song"+i+"'></div>" );
            let current_song = $("#song"+i);
            let artist = escapeHTML(current_song.find('[aria-colindex="2"] div span a').text());
            let title = escapeHTML(current_song.find('[aria-colindex="2"] div div').text());
            let buttons = "<div style='' id='sl_song"+i+"'>" +
                "<a target='_blank' href='https://www.google.com/search?q="+encodeURI(artist+" - "+title+" lyrics")+"'> [Search Lyrics]</a>" +
                "<a target='_blank' href='https://genius.com/search?q="+encodeURI(artist+" - "+title)+"'> [Genius Lyrics]</a>" +
                "</div>";
            current_song
                .append(buttons);
            i++;
        }else{
            $("#sl_"+attr).css("display", "contents");
        }
    });
    $(document).on("mouseleave",".song",function() {
        let attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "none");
    });
    $(document).on("mouseenter",".song",function() {
        let attr = $(this).attr('id');
        $("#sl_"+attr).css("display", "contents");
    });
})();

function escapeHTML(text) {
  var map = {
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[<>"']/g, function(m) { return map[m]; });
}
