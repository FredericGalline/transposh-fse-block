<?php
// Inclure les fichiers de filtrage des blocs
require_once get_template_directory() . '/inc/blocks.php';

// Inclure les fichiers de blocs personnalisés et block patterns
require_once get_template_directory() . '/inc/blocks-patterns.php';

function remove_default_patterns_and_categories()
{
    remove_theme_support('core-block-patterns');

    // Optionnellement, retirer aussi les styles des patterns
    wp_dequeue_style('wp-block-library-theme');
    wp_dequeue_style('wp-block-library');
}

add_action('init', 'remove_default_patterns_and_categories');

// Ajouter les scripts et styles pour le lightbox
function custom_gallery_lightbox_scripts()
{
    // Fancybox CSS
    wp_enqueue_style(
        'fancybox',
        'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css',
        array(),
        '4.0.0'
    );

    // Fancybox JS
    wp_enqueue_script(
        'fancybox',
        'https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js',
        array(),
        '4.0.0',
        true
    );

    // Custom JS for Lightbox Initialization
    wp_enqueue_script(
        'custom-gallery-lightbox',
        get_template_directory_uri() . '/assets/js/gallery-lightbox.js',
        array('fancybox'),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'custom_gallery_lightbox_scripts');

// Forcer les liens des galeries vers les fichiers médias
function force_gallery_link_to_file($attr)
{
    $attr['link'] = 'file'; // Force le lien vers le fichier média
    return $attr;
}
add_filter('shortcode_atts_gallery', 'force_gallery_link_to_file');



// Ajouter l'enregistrement automatique des blocs personnalisés
function register_custom_blocks()
{
    $block_directories = glob(get_template_directory() . '/blocks/*', GLOB_ONLYDIR);

    foreach ($block_directories as $block_dir) {
        $block_json_path = $block_dir . '/block.json';

        if (file_exists($block_json_path)) {
            register_block_type($block_json_path);
        }
    }
}
add_action('init', 'register_custom_blocks');

// Désactiver la validation `kses` pour les blocs spécifiques lors de la sauvegarde
add_filter('content_save_pre', function ($content) {
    // Liste des blocs spécifiques pour lesquels désactiver le nettoyage
    $blocs_du_theme = [
        'create-block/card-custom',
        'create-block/card-horizontal',
        'create-block/card-vertical',
        'create-block/icon-svg',
        'create-block/service-card',
    ];

    // Parcourt les blocs dans le contenu pour identifier ceux de ton thème
    $parsed_blocks = parse_blocks($content);
    foreach ($parsed_blocks as $block) {
        if (isset($block['blockName']) && in_array($block['blockName'], $blocs_du_theme, true)) {
            // Désactive temporairement `kses` pour les blocs de ton thème
            remove_filter('content_save_pre', 'wp_filter_post_kses');
            remove_filter('content_filtered_save_pre', 'wp_filter_post_kses');
            break; // Pas besoin de vérifier davantage, un bloc suffit
        }
    }

    return $content;
}, 1);

function nettoyer_svg($svg)
{
    // Exemple simple : retirer les balises potentiellement dangereuses
    $svg = preg_replace('/<script.*?<\/script>/s', '', $svg); // Supprime les scripts
    $svg = preg_replace('/on\w+=".*?"/', '', $svg); // Supprime les événements (onload, onclick, etc.)
    return $svg;
}

add_filter('content_save_pre', function ($content) {
    // Désactiver les filtres de nettoyage pour le contenu sauvegardé
    remove_filter('content_save_pre', 'wp_filter_post_kses');
    remove_filter('content_filtered_save_pre', 'wp_filter_post_kses');

    return $content;
}, 1);

// Enregistrement des styles personnalisés
function lamaisonsurlasorgue_enqueue_styles()
{
    // Chargement du style principal du thème
    wp_enqueue_style(
        'lamaisonsurlasorgue-style',
        get_stylesheet_uri(),
        array(),
        filemtime(get_stylesheet_directory() . '/style.css')
    );

    wp_enqueue_style(
        'lamaisonsurlasorgue-custom-blocks',
        get_template_directory_uri() . '/assets/css/custom-blocks.css',
        array(),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'lamaisonsurlasorgue_enqueue_styles');

// Ajouter les styles personnalisés à l'éditeur également
function lamaisonsurlasorgue_enqueue_editor_styles()
{
    add_editor_style('assets/css/custom-blocks.css');
}
add_action('after_setup_theme', 'lamaisonsurlasorgue_enqueue_editor_styles');
