<?php

/**
 * block-filter.php
 *
 * Ce fichier filtre les blocs disponibles dans l'éditeur de blocs WordPress pour les utilisateurs 
 * qui ne sont pas administrateurs. Il restreint l'accès à certains blocs, ne laissant disponibles 
 * que ceux qui sont spécifiquement autorisés, y compris les blocs personnalisés développés.
 *
 * Fonctions principales :
 * 1. Filtrer les blocs disponibles pour les rôles qui ne sont pas administrateurs.
 * 2. Autoriser l'accès aux compositions de blocs (block patterns) personnalisées du thème.
 * 
 * https://developer.wordpress.org/block-editor/reference-guides/core-blocks/
 * 
 * @package    Theme Jetstream
 * @version    1.0.2
 * @author     Galliné Frédéric
 * @since      1.0.0
 */

// Fonction pour obtenir tous les blocs personnalisés automatiquement
function obtenir_blocs_personnalises()
{
    $blocks_directory = get_template_directory() . '/blocks/';
    $block_folders = array_filter(glob($blocks_directory . '*'), 'is_dir');

    $custom_blocks = [];
    foreach ($block_folders as $block_folder) {
        $block = basename($block_folder);
        $custom_blocks[] = 'create-block/' . $block;
    }

    return $custom_blocks;
}

// Filtrer les blocs autorisés pour les rédacteurs et autres rôles non administrateurs
function filtrer_blocs_pour_redacteurs($allowed_blocks, $editor_context)
{
    // Si l'utilisateur est un administrateur, autoriser tous les blocs
    if (current_user_can('administrator')) {
        return $allowed_blocks;
    }

    // Blocs de base autorisés
    $core_blocks = [
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/image',
        'core/gallery',
        'core/column',
        'core/columns',
        'core/cover',
        'core-embed/twitter',
        'core-embed/youtube',
        'core-embed/facebook',
        'core-embed/instagram',
        'core/search',
        'core/pattern',
        'core/template-part',
        'core/preformatted',
        'core/group',
        'core/grid',
        // ajoutez ici d'autres blocs de base autorisés
    ];

    // Obtenir les blocs personnalisés automatiquement
    $custom_blocks = obtenir_blocs_personnalises();

    // Fusionner les blocs de base et les blocs personnalisés
    return array_merge($core_blocks, $custom_blocks);
}

add_filter('allowed_block_types_all', 'filtrer_blocs_pour_redacteurs', 10, 2);
