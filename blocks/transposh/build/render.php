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

// Récupération des attributs avec valeurs par défaut
$show_flags = isset($attributes['showFlags']) ? $attributes['showFlags'] : true;
$show_names = isset($attributes['showNames']) ? $attributes['showNames'] : true;
$hide_current = isset($attributes['hideCurrentLanguage']) ? $attributes['hideCurrentLanguage'] : false;
$style = isset($attributes['style']) ? $attributes['style'] : 'horizontal';
$nofollow = isset($attributes['nofollow']) ? $attributes['nofollow'] : true;
$title = isset($attributes['title']) ? $attributes['title'] : '';

error_log('🔍 Attributs reçus: ' . json_encode($attributes));
error_log('🔍 Style sélectionné: ' . $style);

// Détermination du widget_file selon le style
$widget_file = 'combo/tpw_combo.php'; // par défaut
switch ($style) {
    case 'dropdown':
        $widget_file = 'dropdown/tpw_dropdown.php';
        break;
    case 'vertical':
        $widget_file = 'list/tpw_list.php';
        break;
    case 'horizontal':
    default:
        $widget_file = 'combo/tpw_combo.php';
        break;
}

error_log('🔍 Widget file calculé: ' . $widget_file);

error_log('🔍 Widget file final: ' . $widget_file);

// Paramètres pour le widget Transposh
$widget_args = [
    'title'        => $title,
    'nofollow'     => $nofollow ? 1 : 0,
    'hide_current' => $hide_current ? 1 : 0,
    'show_flags'   => $show_flags ? 1 : 0,
    'show_names'   => $show_names ? 1 : 0,
];

// Ajout de paramètres spécifiques selon le style
switch ($style) {
    case 'dropdown':
        $widget_args['widget_file'] = 'dropdown/tpw_dropdown.php';
        $widget_args['display_style'] = 'dropdown';
        break;
    case 'vertical':
        $widget_args['widget_file'] = 'list/tpw_list.php';
        $widget_args['display_style'] = 'list';
        break;
    case 'horizontal':
    default:
        $widget_args['widget_file'] = 'combo/tpw_combo.php';
        $widget_args['display_style'] = 'combo';
        break;
}

error_log('🔍 Widget args final: ' . json_encode($widget_args));

// Alternative 1: Essayer avec les paramètres de widget standard
if (class_exists('transposh_widget_class')) {
    $widget = new transposh_widget_class();
    $widget_instance = [
        'title' => $title,
        'widget_file' => $widget_args['widget_file'],
        'show_flags' => $show_flags,
        'show_names' => $show_names,
        'hide_current' => $hide_current,
        'nofollow' => $nofollow,
    ];
    
    ob_start();
    $widget->widget([], $widget_instance);
    $output = ob_get_clean();
    
    error_log('🔍 Output via widget class: ' . var_export($output, true));
    
    if (!empty($output)) {
        $final_html = '<div class="wp-block-transposh-fse-language-switcher">' . $output . '</div>';
        error_log('🟢 HTML final retourné (widget class): ' . $final_html);
        echo $final_html;
        return $final_html;
    }
}

// Alternative 2: Fonction transposh_widget standard
ob_start();

call_user_func_array('transposh_widget', [
    $widget_args,
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
        <p><small>Style: ' . htmlspecialchars($style) . ' | Drapeaux: ' . ($show_flags ? 'Oui' : 'Non') . ' | Noms: ' . ($show_names ? 'Oui' : 'Non') . '</small></p>
    </div>';

    // Utilisation d'echo au lieu de return pour assurer l'affichage
    echo $html;
    return $html;
}

$final_html = '<div class="wp-block-transposh-fse-language-switcher transposh-style-' . $style . '">' . $output . '</div>';

// Ajout de styles CSS inline pour forcer l'affichage selon le style choisi
$css_styles = '';
switch ($style) {
    case 'vertical':
        $css_styles = '<style>.transposh-style-vertical .transposh_flags { display: flex; flex-direction: column; gap: 5px; } .transposh-style-vertical .transposh_flags a { display: block; }</style>';
        break;
    case 'horizontal':
        $css_styles = '<style>.transposh-style-horizontal .transposh_flags { display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap; } .transposh-style-horizontal .transposh_flags a { display: inline-block; }</style>';
        break;
    case 'dropdown':
        // Pour le dropdown, on laisse le comportement par défaut
        break;
}

$final_html = $css_styles . $final_html;
error_log('🟢 HTML final retourné: ' . $final_html);

// Utilisation d'echo au lieu de return pour assurer l'affichage
echo $final_html;
return $final_html;
