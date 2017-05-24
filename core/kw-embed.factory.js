'use strict';

function FavsEmbed (){

  function embed(fav) {
    if(/iheart/.test(fav.url)){
      return embedPodcast(fav);
    } else if (/youtube/.test(fav.url)) {
      return embedVideo(fav);
    } else {
      console.log("didn't find anything.")
    }
  }
  function embedPodcast(fav){    
    var result;
    if(result = fav.url.match(/\d{8}/g)) {
      fav.embedSrc = 'https://www.iheart.com/widget/?showId='+ result[0] + '&episodeId=' + result[1];
      fav.embedType = "podcast";
    }    
    return fav;
  }
  function embedVideo(fav){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = fav.url.match(regExp);
    if (match && match[2].length == 11) {
      fav.embedSrc = 'https://www.youtube.com/embed/' + match[2];
      fav.embedType = "video";
      return fav;
    } else {
      //error
      console.log('error parsing youtube url');
    }
  }

  return {
    embed: embed
  }
}

angular
  .module('FavsEmbed', [])
  .factory('FavsEmbed', FavsEmbed);
