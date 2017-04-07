<?php
function rest_add_acf_fields_to_spots () {
    register_rest_field( 'post', 'lat', array(
        'get_callback' => function( $post ) {
            return get_field('lat', $post['id']);
        },
        'schema' => array(
            'description' => __( 'Lat' ),
            'type'        => 'string'
        ),
    ) );

    register_rest_field( 'post', 'lng', array(
        'get_callback' => function( $post ) {
            return get_field('lng', $post['id']);
        },
        'schema' => array(
            'description' => __( 'Lng' ),
            'type'        => 'string'
        ),
    ) );
}

add_action( 'rest_api_init', 'rest_add_acf_fields_to_spots');
