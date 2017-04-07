<?php
// Setup the 0031flyfishing theme functions
add_action( 'after_setup_theme', 'theme_setup' );
function theme_setup () {
    add_theme_support( 'post-thumbnails' );
	register_nav_menus( array(
		'main_menu' => __( 'Main Menu', '0031' ),
	) );
}

// Remove inline styles for gallery items
add_filter( 'use_default_gallery_style', '__return_false' );

// Load custom styles and javascript
add_action( 'wp_enqueue_scripts', 'enqueue_styles' );
add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );

// Load the custom styles
function enqueue_styles () {
	wp_enqueue_style( 'bootstrap-css', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css', false );
	wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', false);
    wp_enqueue_style( 'passion-one', '//fonts.googleapis.com/css?family=Passion+One', false);
    wp_enqueue_style( 'open-sans', '//fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700', false);
    wp_enqueue_style( 'crimson-text', '//fonts.googleapis.com/css?family=Crimson+Text:400,400i,600,600i,700,700i', false);
	wp_enqueue_style( 'core', get_template_directory_uri() . '/style.css', false );
}

// Load the custom JS
function enqueue_scripts () {
    wp_enqueue_script( 'tweenmax', get_template_directory_uri() . '/js/libs/TweenMax.min.js', array('jquery'), null, true);
    wp_enqueue_script( 'morph-svg', get_template_directory_uri() . '/js/libs/MorphSVGPlugin.min.js', array('jquery', 'tweenmax'), null, true);
    wp_enqueue_script( 'google-maps-api', '//maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyC6r1upTynq3E6j9lPpEzaLgycMfxkZMc4', null, null, false);
	wp_enqueue_script( 'bundle-js', get_template_directory_uri() . '/js/bundle.js', array('morph-svg'), null, true );
    wp_localize_script( 'bundle-js', 'ajax_requests', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
}
