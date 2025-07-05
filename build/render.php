<?php

/**
 * Render callback for Transposh FSE Language Switcher block
 *
 * @param array $attributes Block attributes
 * @param string $content Block content
 * @param WP_Block $block Block instance
 * @return string HTML output
 */

// Vérification de l'existence du plugin Transposh
if (! function_exists('transposh_widget') || ! isset($GLOBALS['my_transposh_plugin'])) {
    $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #ffebee; padding: 10px; border: 1px solid #f44336; color: #d32f2f;">
        <strong>⚠️ Plugin Transposh requis</strong>
        <p>Le plugin Transposh n\'est pas activé ou la fonction transposh_widget() n\'est pas disponible.</p>
    </div>';

    echo $html;
    return $html;
}

// Vérification supplémentaire que le plugin est bien initialisé
global $my_transposh_plugin;
if (!isset($my_transposh_plugin) || !is_object($my_transposh_plugin)) {
    $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #fff3e0; padding: 10px; border: 1px solid #ff9800; color: #f57c00;">
        <strong>⚠️ Plugin Transposh non initialisé</strong>
        <p>Le plugin Transposh n\'est pas correctement initialisé.</p>
    </div>';

    echo $html;
    return $html;
}

// Récupération des attributs avec valeurs par défaut
$show_flags = isset($attributes['showFlags']) ? $attributes['showFlags'] : true;
$show_names = isset($attributes['showNames']) ? $attributes['showNames'] : true;
$hide_current = isset($attributes['hideCurrentLanguage']) ? $attributes['hideCurrentLanguage'] : false;
$style = isset($attributes['style']) ? $attributes['style'] : 'horizontal';
$nofollow = isset($attributes['nofollow']) ? $attributes['nofollow'] : true;
$title = isset($attributes['title']) ? $attributes['title'] : '';
$show_edit_translation = isset($attributes['showEditTranslation']) ? $attributes['showEditTranslation'] : true;

/**
 * Fonction pour créer un widget personnalisé avec les paramètres du bloc
 */
if (!function_exists('create_custom_transposh_widget')) {
    function create_custom_transposh_widget($widget_args, $show_flags, $show_names, $hide_current, $style, $nofollow, $title = '', $show_edit_translation = true)
    {
        global $my_transposh_plugin;

        // Calculer le chemin du plugin pour les images
        $plugpath = parse_url($my_transposh_plugin->transposh_plugin_url, PHP_URL_PATH);

        $output = '';
        $rel_nofollow = $nofollow ? ' rel="nofollow"' : '';

        // Titre du widget
        if (!empty($title)) {
            $output .= '<h3 class="widget-title">' . esc_html($title) . '</h3>';
        }

        // Générer le contenu selon le style
        switch ($style) {
            case 'dropdown':
                $output .= create_dropdown_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow);
                break;
            case 'vertical':
                $output .= create_vertical_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow);
                break;
            case 'horizontal':
            default:
                $output .= create_horizontal_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow);
                break;
        }

        // Ajouter la checkbox "Edit Translation" si applicable
        if ($show_edit_translation) {
            $output .= create_edit_translation_checkbox();
        }

        return $output;
    }
}

/**
 * Widget dropdown personnalisé
 */
if (!function_exists('create_dropdown_widget')) {
    function create_dropdown_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow)
    {
        // Vérification des données
        if (empty($widget_args) || !is_array($widget_args)) {
            return '<div class="transposh-dropdown-widget">Aucune langue disponible</div>';
        }

        $output = '<div class="transposh-dropdown-widget">';
        $output .= '<select name="lang" onchange="window.location.href=this.options[this.selectedIndex].value;" class="transposh-language-select">';

        // Option par défaut
        $output .= '<option value="">' . __('Choisir une langue', 'transposh') . '</option>';

        foreach ($widget_args as $langrecord) {
            // Vérification de la structure des données
            if (!is_array($langrecord) || !isset($langrecord['langorig'], $langrecord['url'], $langrecord['active'])) {
                continue;
            }

            // Masquer la langue actuelle si demandé
            if ($hide_current && $langrecord['active']) {
                continue;
            }

            $selected = $langrecord['active'] ? ' selected="selected"' : '';
            $display_text = '';

            if ($show_names) {
                $display_text = $langrecord['langorig'];
            }

            $output .= '<option value="' . esc_attr($langrecord['url']) . '"' . $selected . '>' . esc_html($display_text) . '</option>';
        }

        $output .= '</select>';
        $output .= '</div>';

        return $output;
    }
}

/**
 * Widget vertical personnalisé
 */
if (!function_exists('create_vertical_widget')) {
    function create_vertical_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow)
    {
        // Vérification des données
        if (empty($widget_args) || !is_array($widget_args)) {
            return '<div class="transposh-vertical-widget">Aucune langue disponible</div>';
        }

        $output = '<div class="transposh-vertical-widget">';
        $output .= '<ul class="transposh-language-list vertical">';

        foreach ($widget_args as $langrecord) {
            // Vérification de la structure des données
            if (!is_array($langrecord) || !isset($langrecord['langorig'], $langrecord['url'], $langrecord['active'], $langrecord['flag'])) {
                continue;
            }

            // Masquer la langue actuelle si demandé
            if ($hide_current && $langrecord['active']) {
                continue;
            }

            $active_class = $langrecord['active'] ? ' class="tr_active"' : '';
            $output .= '<li' . $active_class . '>';
            $output .= '<a href="' . esc_attr($langrecord['url']) . '"' . $rel_nofollow . '>';

            if ($show_flags) {
                $output .= '<img src="' . esc_attr($plugpath . '/img/flags/' . $langrecord['flag'] . '.png') . '" alt="' . esc_attr($langrecord['langorig']) . '" class="transposh-flag" />';
            }

            if ($show_names) {
                $output .= '<span class="transposh-lang-name">' . esc_html($langrecord['langorig']) . '</span>';
            }

            $output .= '</a>';
            $output .= '</li>';
        }

        $output .= '</ul>';
        $output .= '</div>';

        return $output;
    }
}

/**
 * Widget horizontal personnalisé
 */
if (!function_exists('create_horizontal_widget')) {
    function create_horizontal_widget($widget_args, $show_flags, $show_names, $hide_current, $plugpath, $rel_nofollow)
    {
        // Vérification des données
        if (empty($widget_args) || !is_array($widget_args)) {
            return '<div class="transposh-horizontal-widget">Aucune langue disponible</div>';
        }

        $output = '<div class="transposh-horizontal-widget">';
        $output .= '<div class="transposh-language-list horizontal">';

        foreach ($widget_args as $langrecord) {
            // Vérification de la structure des données
            if (!is_array($langrecord) || !isset($langrecord['langorig'], $langrecord['url'], $langrecord['active'], $langrecord['flag'])) {
                continue;
            }

            // Masquer la langue actuelle si demandé
            if ($hide_current && $langrecord['active']) {
                continue;
            }

            $active_class = $langrecord['active'] ? ' tr_active' : '';
            $output .= '<a href="' . esc_attr($langrecord['url']) . '"' . $rel_nofollow . ' class="transposh-language-link' . $active_class . '">';

            if ($show_flags) {
                $output .= '<img src="' . esc_attr($plugpath . '/img/flags/' . $langrecord['flag'] . '.png') . '" alt="' . esc_attr($langrecord['langorig']) . '" class="transposh-flag" />';
            }

            if ($show_names) {
                $output .= '<span class="transposh-lang-name">' . esc_html($langrecord['langorig']) . '</span>';
            }

            $output .= '</a>';
        }

        $output .= '</div>';
        $output .= '</div>';

        return $output;
    }
}

/**
 * Fonction pour créer le toggle "Edit Translation" avec le style WordPress
 */
if (!function_exists('create_edit_translation_checkbox')) {
    function create_edit_translation_checkbox()
    {
        global $my_transposh_plugin;

        $output = '';

        // Vérifier si l'édition est permise
        if (!isset($my_transposh_plugin) || !method_exists($my_transposh_plugin, 'is_editing_permitted')) {
            return $output;
        }

        if ($my_transposh_plugin->is_editing_permitted()) {
            // Créer l'URL pour basculer le mode édition
            $current_uri = isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '';
            $target_lang = $my_transposh_plugin->target_language;
            $is_default_lang = $my_transposh_plugin->options->is_default_language($target_lang);

            // Utilisation de la fonction utilitaire de Transposh pour créer l'URL
            if (class_exists('transposh_utils') && method_exists('transposh_utils', 'rewrite_url_lang_param')) {
                $ref = transposh_utils::rewrite_url_lang_param(
                    $current_uri,
                    $my_transposh_plugin->home_url,
                    $my_transposh_plugin->enable_permalinks_rewrite,
                    ($is_default_lang ? "" : $target_lang),
                    !$my_transposh_plugin->edit_mode
                );

                $checked = $my_transposh_plugin->edit_mode ? 'checked' : '';
                $checked_class = $my_transposh_plugin->edit_mode ? 'is-checked' : '';

                $output .= '<div class="transposh-edit-translation" style="margin-top: 10px;">';
                $output .= '<label class="transposh-toggle-control">';
                $output .= '<input type="checkbox" name="tpedit" value="1" ' . $checked;
                $output .= ' onclick="document.location.href=\'' . esc_attr($ref) . '\';" style="display: none;" />';
                $output .= '<span class="transposh-toggle-track ' . $checked_class . '">';
                $output .= '<span class="transposh-toggle-thumb"></span>';
                $output .= '</span>';
                $output .= '<span class="transposh-toggle-label">' . __('Edit Translation', 'transposh') . '</span>';
                $output .= '</label>';
                $output .= '</div>';
            }
        }

        return $output;
    }
}

// Récupération des arguments du widget Transposh
global $my_transposh_plugin;
if (isset($my_transposh_plugin->widget)) {
    $clean_page = $my_transposh_plugin->get_clean_url();
    $widget_args = $my_transposh_plugin->widget->create_widget_args($clean_page);

    // Vérification que les données de langues sont valides
    if (empty($widget_args) || !is_array($widget_args)) {
        $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #fff3e0; padding: 10px; border: 1px solid #ff9800; color: #f57c00;">
            <strong>⚠️ Données de langues indisponibles</strong>
            <p>Le plugin Transposh n\'a pas pu récupérer les données de langues. Vérifiez la configuration du plugin.</p>
        </div>';

        echo $html;
        return $html;
    }

    $widget_args['title'] = $title;

    // Générer le contenu personnalisé
    $output = create_custom_transposh_widget($widget_args, $show_flags, $show_names, $hide_current, $style, $nofollow, $title, $show_edit_translation);

    if (empty($output)) {
        $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #fff3e0; padding: 10px; border: 1px solid #ff9800; color: #f57c00;">
            <strong>⚠️ Widget Transposh vide</strong>
            <p>Le widget Transposh n\'a retourné aucun contenu. Vérifiez la configuration du plugin.</p>
            <p><small>Style: ' . htmlspecialchars($style) . ' | Drapeaux: ' . ($show_flags ? 'Oui' : 'Non') . ' | Noms: ' . ($show_names ? 'Oui' : 'Non') . '</small></p>
        </div>';

        return $html;
    }

    $final_html = '<div class="wp-block-transposh-fse-language-switcher transposh-style-' . $style . '">' . $output . '</div>';

    // Ajout de styles CSS inline pour le rendu
    $css_styles = '';
    switch ($style) {
        case 'vertical':
            $css_styles = '<style>
                .transposh-style-vertical .transposh-language-list.vertical { display: flex; flex-direction: column; gap: 5px; list-style: none; padding: 0; margin: 0; }
                .transposh-style-vertical .transposh-language-list.vertical li { display: block; }
                .transposh-style-vertical .transposh-language-link { display: flex; align-items: center; gap: 5px; text-decoration: none; }
                .transposh-style-vertical .transposh-flag { width: 16px; height: 12px; }
            </style>';
            break;
        case 'horizontal':
            $css_styles = '<style>
                .transposh-style-horizontal .transposh-language-list.horizontal { display: flex; flex-direction: row; gap: 10px; flex-wrap: wrap; }
                .transposh-style-horizontal .transposh-language-link { display: inline-flex; align-items: center; gap: 5px; text-decoration: none; }
                .transposh-style-horizontal .transposh-flag { width: 16px; height: 12px; }
            </style>';
            break;
        case 'dropdown':
            $css_styles = '<style>
                .transposh-style-dropdown .transposh-language-select { padding: 5px; border: 1px solid #ccc; border-radius: 4px; }
            </style>';
            break;
    }

    // Ajout des styles pour le toggle "Edit Translation"
    $toggle_styles = '<style>
        .transposh-toggle-control { display: flex !important; align-items: center !important; gap: 8px !important; cursor: pointer !important; user-select: none !important; }
        .transposh-toggle-track { position: relative !important; display: inline-block !important; width: 36px !important; height: 18px !important; border-radius: 9px !important; transition: background-color 0.2s ease !important; cursor: pointer !important; }
        .transposh-toggle-track:not(.is-checked) { background-color: #ddd !important; }
        .transposh-toggle-track.is-checked { background-color: #007cba !important; }
        .transposh-toggle-thumb { position: absolute !important; top: 2px !important; width: 14px !important; height: 14px !important; background-color: white !important; border-radius: 50% !important; transition: left 0.2s ease !important; box-shadow: 0 1px 3px rgba(0,0,0,0.3) !important; }
        .transposh-toggle-track:not(.is-checked) .transposh-toggle-thumb { left: 2px !important; }
        .transposh-toggle-track.is-checked .transposh-toggle-thumb { left: 20px !important; }
        .transposh-toggle-label { font-size: 13px !important; color: #555 !important; }
        .transposh-toggle-control:hover .transposh-toggle-track:not(.is-checked) { background-color: #bbb !important; }
        .transposh-toggle-control:hover .transposh-toggle-track.is-checked { background-color: #005a87 !important; }
    </style>';

    $final_html = $css_styles . $toggle_styles . $final_html;

    echo $final_html;
    return $final_html;
} else {
    $html = '<div class="wp-block-transposh-fse-language-switcher" style="background: #fff3e0; padding: 10px; border: 1px solid #ff9800; color: #f57c00;">
        <strong>⚠️ Widget Transposh non initialisé</strong>
        <p>Le widget Transposh n\'est pas correctement initialisé.</p>
    </div>';

    echo $html;
    return $html;
}
