<?php

//add_action('init', 'add_menu_route');

add_action( 'rest_api_init', function () {
  register_rest_route( '0031flyfishing/v1', '/menus/(?P<menu>[a-z0-9 .\-]+)', array(
    'methods' => 'GET',
    'callback' => 'get_menu_items',
  ) );
} );

function get_menu_items ($data) {
    $navigation = wp_get_nav_menu_items( $data['menu'] );
    $menu = array();
    foreach ($navigation as $item){
        //debug($item->title);
        $menuItem = array(
            'title' => $item->title,
            'link' => $item->url,
            'classes' => $item->classes
        );
        $menu[] = $menuItem;
    }
    return $navigation;
}
