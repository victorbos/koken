<?php

class VictorBBClone extends KokenPlugin
{

    function __construct()
    {
//        $this->register_filter('site.output', 'render');
        $this->register_hook('before_closing_body', 'add_bbclone_code');
    }

//    function render($content){
//        if (preg_match('/<title[^>]*>(.*?)<\/title>/ims', $content, $match))
//            $title=$match[0];
//        return '<!--******'.$title.'*****-->'.$content;
//    }

    function add_bbclone_code()
    {
        define("_BBC_PAGE_NAME", 'victorbos.nl');
        define("_BBCLONE_DIR", $this->data->bbclone_dir);
        define("COUNTER", _BBCLONE_DIR . "mark_page.php");
        if (is_readable(COUNTER)) include_once(COUNTER);
    }
}
