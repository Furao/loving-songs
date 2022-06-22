requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        json: 'json',
        assets: '../assets'
    }
});

// Start the main app logic.
//use plugins as if they were at baseUrl
define([
        'json!assets/songs.json',
    ], function(songs){
        //all dependencies are loaded (including gmaps and other google apis)
        console.log(songs);
        const d = new Date();

        const zeroPad = (num, places) => String(num).padStart(places, '0');
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const date = zeroPad(month,2)+"/"+zeroPad(day,2);
        document.getElementById("date").innerHTML = date;

        const found = songs['songs'].find(element => element['day_of_year'] == date);
        if(found['type'] == 'spotify') {
          const frame = '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/' + found['id'] + '?utm_source=generator&theme=0" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>';
          document.getElementById("song_frame").innerHTML = frame;
        }
        else {
          const frame = '<iframe width="560" height="315" src="https://www.youtube.com/embed/WU0uJcLKiqk ' + found['id'] + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
          document.getElementById("song_frame").innerHTML = frame;
        }

        document.getElementById("song_info").innerHTML = found['song'] + ' by ' + found['artist'];

        element = document.getElementById("love_note");
        if(found['note'] == '') {
          if (!element.classList.contains('is-invisible')) {
            element.classList.add('is-invisible');
          }

        }
        else {
          if (element.classList.contains('is-invisible')) {
            element.classList.remove('is-invisible');
          }
          document.getElementById("love_note_body").innerHTML = found['note'];
        }
    }
);


