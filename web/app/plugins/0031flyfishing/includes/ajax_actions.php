<?php
if ( is_admin() ) {
    add_action( 'wp_ajax_handle_post_comment_form', 'handle_post_comment_form' );
    add_action( 'wp_ajax_nopriv_handle_post_comment_form', 'handle_post_comment_form' );
}

// Post comments
function handle_post_comment_form () {

    if (isset ($_POST)) {
        $data = $_POST['data'];

        // Setup empty parameters array
        $params = array();
        parse_str($data, $params);

        $time = current_time('mysql');
        $data = array(
            'comment_post_ID' => $data['postId'],
            'comment_author' => $data['name'],
            'comment_author_email' => $data['email'],
            'comment_author_url' => 'http://',
            'comment_content' => $data['message'],
            'comment_date' => $time,
        );

        $response = wp_new_comment($data);

    } else {

        $response = false;

    }

    header('Content-Type: application/json');
    echo json_encode($response);
    wp_die();
}
