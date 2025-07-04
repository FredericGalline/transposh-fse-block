<?php

/**
 * Render callback for Transposh FSE Language Switcher block
 * 
 * @param array $attributes Block attributes
 * @param string $content Block content
 * @param WP_Block $block Block instance
 * @return string HTML output
 */

// Sortir si WordPress n'est pas chargé
if (!defined('ABSPATH')) {
    exit;
}

// Vérifier si le plugin Transposh est actif
if (function_exists('transposh_widget')) {
    ob_start();

    // Utiliser call_user_func_array pour éviter l'erreur de lint
    call_user_func_array('transposh_widget', [
        [
            'widget_file' => 'combo/tpw_combo.php',
            'title'       => '',
            'nofollow'    => 1,
            'hide_current' => 0,
            'show_flags'  => 1,
            'show_names'  => 1,
            'style'       => 'horizontal',
        ],
        []
    ]);

    $output = ob_get_clean();

    // Retourner le contenu avec une classe CSS pour le styling
    return '<div class="wp-block-transposh-fse-language-switcher">' . $output . '</div>';
}

// Message d'erreur si Transposh n'est pas actif
return '<div class="wp-block-transposh-fse-language-switcher transposh-inactive">
    <p style="color: #d63638; font-style: italic;">⚠️ Plugin Transposh non actif</p>
</div>';
