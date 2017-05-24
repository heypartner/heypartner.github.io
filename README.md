# Gloo Project -- Favorites List Widget

This widget allows a user to add favorite resources from Youtube Videos, TED Talks, iheart Radio Podcasts and Amazon Books.  Architecture Notes start after the Examples.

## Getting Started

Go to (https://heypartner.github.io/) to start the app.

1. Click on "Add New Favorite URL" to add a valid location URL from the following 4 resources:

    - **Youtube** -- Any Youtube shareable linke will suffice

    - **TED Talks** -- Go to TED.com and choose a Talk you like.  Then copy the URL in your browser's location bar and paste into the Favorites List

    - **Amazon Books** -- Go to Amazon and select a book.  At the page where you can read descriptions and reviews, copy the URL in your browser's location bar and paste into the Favorites List

    - **iHeart Podcast** -- Go to iheart.com and select a episode of any podcast.  Copy URL into Favorites List

2. **Add** to list by clicking enter after pasting a location URL.
3. **Edit** a Description for you Favorite by Double-Clicking the description area above the resource.  Leave the input field to "save."
4. **Delete** from Favorites by hovering over the favorite and clicking the "X" to the right of the description.
5. Saves are not persisted to a database.


## Examples

This section provides snapshots of Favorites List commnands, and examples URL from the above four resources.

### Screenshot of where to ADD, EDIT and DELETE favorites.

![screenshot](https://s21.postimg.org/hmv746ew7/add-edit-delete.png)

### At Youtube, any shareable URL will work. It is easiest to just choose and video, and copy the URL in your Browser's location bar.

![screenshot](https://s22.postimg.org/y070geaa9/youtube.png)

### At TED, go to any TED Talk page and copy the URL.

![screenshot](https://s22.postimg.org/7135l8ntd/ted.png)

### At iHeart, go to the podcast area.  Find a podcast show, then click on a single episode.  Copy the URL of the episode to save it as a Favorite.

![screenshot](https://s22.postimg.org/6zt7rtlzl/iheart.png)

### At Amazon, go to a Book page where you can read the description, reviews and Add to Cart.  Copy the URL.

![screenshot](https://s22.postimg.org/fgsq2qqoh/amazon.png)


## Built With

* Angularjs latest.  Not special features are used.
* No 3rd-Party Plugins are used.

## Architecture Notes

This project (while small) is designed as if it were a component in a large application.  It has a strong Component architecture to provide separation of concerns and to allow parts of it to be dropped into other apps with no editting, aside from adding it as Module dependencies.

### Directory Structure

|-- root (contains index.html and the app module)  
|--> angular  
|--> core (contains reuable Factories, Services and Filters, independent of this app)  
|--> css  
|--> favs-list (contains Module, Component, Controler and Template for this widget)  

### Main Design Features

The idea with even this small project is the demonstrate AngularJS design principles for making reusable code using Components and Services.  This code is meant to be picked upped and dropped into another application merely by copying the files and adding Components as dependencies in the next app that needs a Favorites List.

Key Components:

1. Favs-List is the primary code you would drop into another app, by doing the following:
    - Placing the ```<favs-list></favs-list>``` directive in HTML.
    - Adding FavsList as a dependency to another app module
2. Media Type Handling -- since Favorites may or may not include handling media resources, all management of media types like Video, Podcasts and Books are separated from the primary collection management feature of FavsList.    
    - Media Handling is implemented as a separate Component to Favs-List, and can be dropped in as a nested Component with a <embed-media></embed-media> directive. This nested component provides the HTML for each media type.
    - Any Component that needs Media Handling also includes FavsEmbed as a dependency to its Constructor and passes a URL to it via a FavsEmbed.embed function.
3. Since Media Handling requires users pasting in potentially unsecure URLs for "src" attributes, I added a Filter to call $sce.  It is used with the ng-src to filter on URL and return a $sce-clean one.  Like this:
    - <iframe ng-src="{{media.embedsrc | trusted }}">


#### Application-Level Files

Contains:
1. index.html  
   - Uses one custom directive in the HTML ```<fav-list></fav-list>```
2. app.module.js -- application module declaration, including dependencies for FavsList and the Filter for Trusted URLs.

#### Main Component Files

These are placed in the favs-list directory, which contains:  

1. favs-list.module.js -- instantiantes the component and injects Media Handling as dependencies.
2. favs-list.component.js -- small file that names the TemplateUrl and Constructor for the component.
3. favs-list.controller.js -- Basic List handling for Adding, Editing, Deleting an item.  Things to note:  
    - This also defines the Favs object to share with the Media Embedding handlers.  They expect an object to contain a URL member to extract a URL from.  Media Handling also expects two more members for storing the trusting EmbedSrc and the Type of Media (video, podcast, book, etc);
4. favs-list.template.html -- the components HTML

#### Media Handling Files

These are not needed by all Favs-List component implementations -- only when the list items contain media and you want the list to display the media onscreen.

The media handling code is divided into Nested HTML via the <embed-media> component directive.  Just post that into any other component template that wants media support.  And there is a Factory for actually created the URLs to embed from the URL the user pastes.  This service is injected into the Favs-List constructor, and called via FavsMedia.embed(favobject) to modify the favorite to support displaying media types.

Since Media Handling could be used by many other apps, independent of Favorite lists, it goes in a Core directory.

Files:
1. core/kw-embedmedia.component.js -- defines the <embed-media> directive, primarily with ng-if looking and Media Types defined by the EmbedMedia factory service.
2. core/kw-embed.factory.js -- this is where the logic is that knows about Youtube, iHeart, Amazon and TED.  No other code needs to know about this.  Other code just inject this factory and calls its "embed" function passing a URL.
3. core/filters/kw-trusted.js -- tiny piece of code for adding a Filter for parsing unsecure URLs with $sce.


## Authors

* **Kevin Willcutts** -  [heypartner](https://github.com/heypartner)
