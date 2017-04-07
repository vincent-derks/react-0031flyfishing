<?php
// Include ACF
include_once('acf/acf.php');

// Set up ACF fields
//include_once(dirname(__FILE__).'/../includes/acf-add-fields.php');

// 3. Hide ACF field group menu item
// add_filter('acf/settings/show_admin', '__return_false');

// Make option pages translatable
add_filter('acf/settings/default_language', 'my_acf_settings_default_language');
function my_acf_settings_default_language( $language ) {
    return 'en';
}

add_filter('acf/settings/current_language', 'my_acf_settings_current_language');
function my_acf_settings_current_language( $language ) {
	return $language;
}