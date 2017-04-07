<?php

function register_spots(){

    $labels = array(
        'name' => 'Spots'
    );

    register_post_type('spots', array(
        'public' => true,
        'labels' => $labels,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'comments'),
        'menu_icon' => 'dashicons-location',
        'show_in_rest' => true,
        'rest_base' => 'spots',
        'rest_controller_class' => 'WP_REST_Posts_Controller'
    ));

}

add_action( 'init', 'register_spots' );
