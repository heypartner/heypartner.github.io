'use strict';

function FavsEmbed (){

  function embed(fav) {
    if(/iheart/.test(fav.url)){
      return embedPodcast(fav);
    } else if (/youtube/.test(fav.url)) {
      return embedVideo(fav);
    } else if (/ted.com/.test(fav.url)) {
      return embedTEDVideo(fav);
    } else if (/amazon/.test(fav.url)) {
      return embedBook(fav);
    } else {
      return embedLink(fav);
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
  function embedBook(fav){
    var result;
    if(result = fav.url.match("/([a-zA-Z0-9]{10})(?:[/?]|$)")) {
      fav.embedSrc = 'https://read.amazon.com/kp/card?asin='+ result[0] + '&preview=inline&linkCode=kpe&ref_=cm_sw_r_kb_dp_pX4hzbME3Y9BB';
      fav.embedType = "podcast";
    }    
    return fav;
  }
  function embedTEDVideo(fav){
    fav.embedSrc = "https://embed." + fav.url.slice(12);
    fav.embedType = "TED";
    return fav;
  }
  function embedLink(fav) {
    console.log("not supported, yet.");
    alert("Not supported.  Try locationURLs from Youtube, iheart podcasts, Amazon Books or TED Talks.");
  }

  return {
    embed: embed
  }
}

angular
  .module('FavsEmbed', [])
  .factory('FavsEmbed', FavsEmbed);
