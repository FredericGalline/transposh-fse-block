<?php

/**
 * blocks.php
 *
 * Ce fichier inclut les fichiers de blocs personnalisés et gère l'enregistrement 
 * des catégories de blocs pour le thème.
 * 
 * @package    Theme Jetstream
 * @version    1.0.0
 * @author     Galliné Frédéric
 * @since      1.0.0
 */

// Enregistrer la nouvelle catégorie de blocs
function register_category($categories)
{
    $category = array(
        'slug' => 'jetstream',
        'title' => 'Jetstream',
    );
    array_splice($categories, 1, 0, array($category));
    return $categories;
}
add_filter('block_categories_all', 'register_category');

// Inclure les fichiers de blocs
$blocks_directory = get_template_directory() . '/blocks/';
$block_folders = array_filter(glob($blocks_directory . '*'), 'is_dir');

foreach ($block_folders as $block_folder) {
    $block = basename($block_folder);
    $block_file = $blocks_directory . $block . '/' . $block . '.php';
    if (file_exists($block_file)) {
        include($block_file);
    }
}

include(get_template_directory() . '/block-patterns/index.php');
