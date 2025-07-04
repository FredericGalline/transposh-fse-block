<?php

error_log('🟢 render.php Transposh exécuté');

/**
 * Render callback for Transposh FSE Language Switcher block
 *
 * @param array $attributes Block attributes
 * @param string $content Block content
 * @param WP_Block $block Block instance
 * @return string HTML output
 */

if (! function_exists('transposh_widget')) {
    error_log('🔴 transposh_widget non trouvée');
    $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #ffebee; padding: 10px; border: 1px solid #f44336; color: #d32f2f;">
        <strong>⚠️ Plugin Transposh requis</strong>
        <p>Le plugin Transposh n\'est pas activé ou la fonction transposh_widget() n\'est pas disponible.</p>
    </div>';

    // Utilisation d'echo au lieu de return pour assurer l'affichage
    echo $html;
    return $html;
}

error_log('🟢 transposh_widget trouvée, appel du widget');

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

error_log('🔍 Output du widget: ' . var_export($output, true));
error_log('🔍 Longueur output: ' . strlen($output));

if (empty($output)) {
    error_log('🔴 transposh_widget retour vide');
    $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #fff3e0; padding: 10px; border: 1px solid #ff9800; color: #f57c00;">
        <strong>⚠️ Widget Transposh vide</strong>
        <p>Le widget Transposh n\'a retourné aucun contenu. Vérifiez la configuration du plugin.</p>
    </div>';

    // Utilisation d'echo au lieu de return pour assurer l'affichage
    echo $html;
    return $html;
}

$final_html = '<div class="wp-block-transposh-fse-language-switcher">' . $output . '</div>';
error_log('🟢 HTML final retourné: ' . $final_html);

// Utilisation d'echo au lieu de return pour assurer l'affichage
echo $final_html;
return $final_html;
