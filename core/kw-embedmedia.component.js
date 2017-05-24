'use strict';

angular
  .module('EmbedMedia', [])
  .component('embedMedia', {
    bindings: {
      embedtype: '@',
      embedsrc: '@',
      id: '@'
    },
    controller: 'embedMediaController as media',
    template: `          
      <div ng-if="media.embedtype === 'podcast'">
        <iframe width="398" height="224" ng-src="{{media.embedsrc | trusted}}" frameborder="0"></iframe>
      </div>
      <div  ng-if="media.embedtype === 'video'">
        <iframe width="560" height="315" ng-src="{{media.embedsrc | trusted}}" frameborder="0" allowfullscreen="1" title="YouTube video player"></iframe>
      </div>
    `   
  })
  .controller('embedMediaController', function embedMediaController () {});
