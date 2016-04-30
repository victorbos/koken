koken-semantic-images
=====================

Adds semantic information to images displayed by Koken using shema.org based microformats.

##Usage
###Install
Download or clone this repository. Copy everything to:
 ```
storage/plugins/pulponair-semantic-images/
```
###Configure the plugin
Login to your koken installation and switch to settings->plugin. You should see a new plugin entry called "Semantic Images". If not you might need to clear the "system caches" and or reload the koken admin interface.

Next click on setup and configure the plugins behavior. If finished: enabled the plugin

###Check output

Surft to a frontend page containing at least one image. Check the source code and look for:
```
...<span itemscope itemtype="http://schema.org/ImageObject">...
```

You might also want to check your site using: http://www.google.de/webmasters/tools/richsnippets or http://linter.structured-data.org/

Done :)

http://www.victorbos.nl/koken/storage/cache/images/000/086/salomonszegel-blad,xlarge.1461352151.jpg
http://www.victorbos.nl/koken/storage/cache/images/000/086/salomonszegel-blad.1461352151.jpg
http://www.victorbos.nl/koken/storage/cache/images/000/086/salomonszegel-blad,small.1461352151.jpg

<span itemscope itemtype="http://schema.org/ImageObject">
<img class="height_limit k-lazy-loading"
        data-alt="Bladeren"
        data-lazy-fade="400"
        data-visibility="public"
        data-respond-to="width"
        data-presets="tiny,60,40 small,100,67 medium,480,320 medium_large,800,534 large,1024,683 xlarge,1600,1067 huge,1600,1067"
        data-base="http://www.victorbos.nl/koken/storage/cache/images/000/086/salomonszegel-blad,"
        data-extension="1461352151.jpg"/>
<meta itemprop="name"
content="Rollend blad**VALUE**" /
><meta itemprop="caption" content="Jong  blad Salomonszegel, Polygonatum multiflorum**VALUE**" />
<meta itemprop="contentUrl" content="http://www.victorbos.nl/content/rollend-blad-1/**VALUE**" />
<meta itemprop="thumbnailUrl" content="http://www.victorbos.nl/koken/storage/cache/images/000/086/salomonszegel-blad,small.1461352151.jpg**VALUE**" />
<meta itemprop="author" content="Victor Bos" />
<meta itemprop="dateCreated" content="2012-04-01" />
<meta itemprop="datePublished" content="2012-04-01" />
</span>
