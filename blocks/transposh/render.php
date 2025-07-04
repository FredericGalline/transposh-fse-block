<?php

/**
 * Render callback for Transposh FSE Language Switcher block
 *
 * @param array $attributes Block attributes
 * @param string $content Block content
 * @param WP_Block $block Block instance
 * @return string HTML output
 */

if (! function_exists('transposh_widget')) {
    return '<!-- Transposh plugin non actif -->';
}

ob_start();

call_user_func_array('transposh_widget', [
    [
        'widget_file'  => 'combo/tpw_combo.php',
        'title'        => '',
        'nofollow'     => 1,
        'hide_current' => 0,
        'show_flags'   => 1,
        'show_names'   => 1,
        'style'        => 'horizontal',
    ],
    []
]);

$output = ob_get_clean();

return '<div class="wp-block-transposh-fse-language-switcher">' . $output . '</div>' . '<div>DEBUG TRANSPOSED BLOCK</div>';
