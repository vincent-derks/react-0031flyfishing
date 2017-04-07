<?php
function rest_add_comment_count_to_post () {

    register_rest_field( 'post', 'thumbnail', array(
        'get_callback' => function( $post ) {
            $thumbnail = array(
                'old' => get_post_meta($post['id'], 'thumb', true)
            );
            return $thumbnail;
        },
        'schema' => array(
            'description' => __( 'Thumbnail' ),
            'type'        => 'string'
        ),
    ) );

    register_rest_field( 'post', 'commentCount', array(
        'get_callback' => function( $post ) {
            $comments = get_comments( array(
                'post_id' => $post['id']
            ) );
            return (int) count($comments);
        },
        'schema' => array(
            'description' => __( 'Comment count.' ),
            'type'        => 'integer'
        ),
    ) );

    register_rest_field( 'post', 'comments', array(
        'get_callback' => function( $post ) {
            $comments = get_comments( array(
                'post_id' => $post['id'],
                'order' => 'ASC'
            ) );
            $filteredComments = array();
            foreach ($comments as $comment) {
                $filteredComments[] = array(
                    'author' => $comment->comment_author,
                    'content' => $comment->comment_content,
                    'avatar' => get_avatar_url($comment->comment_email, array('size'=>48)),
                    'date' => $comment->comment_date
                );
            }
            return $filteredComments;
        },
        'schema' => array(
            'description' => __( 'Comment count.' ),
            'type'        => 'integer'
        ),
    ) );
}

add_action( 'rest_api_init', 'rest_add_comment_count_to_post');
