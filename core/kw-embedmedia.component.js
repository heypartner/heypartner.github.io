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
      <div  ng-if="media.embedtype === 'book'">
        <iframe width="550" height="336" ng-src="{{media.embedsrc | trusted}}" frameborder="0" allowfullscreen style="max-width:100%"></iframe>
      </div>
      <div ng-if="media.embedtype === 'TED'">
        <div style="max-width:640">
          <div style="position:relative;height:0;padding-bottom:56.25%">
            <iframe ng-src="{{media.embedsrc | trusted}}" width="640" height="360" style="position:absolute;left:0;top:0;width:100%;height:100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    `   
  })
  .controller('embedMediaController', function embedMediaController () {});
