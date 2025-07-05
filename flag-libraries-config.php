<?php

/**
 * Configuration des librairies d'icônes de drapeaux pour le bloc Transposh
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuration des librairies d'icônes de drapeaux
 */
function get_transposh_flag_libraries()
{
    return [
        'flagcdn' => [
            'name' => 'FlagCDN',
            'base_url' => 'https://flagcdn.com',
            'format' => 'svg',
            'get_url' => function ($lang_code, $size) {
                $size_map = [
                    'tiny' => 'w20',
                    'small' => 'w40',
                    'medium' => 'w80',
                    'large' => 'w160'
                ];
                $size_param = $size_map[$size] ?? 'w40';
                return "https://flagcdn.com/{$size_param}/{$lang_code}.png";
            }
        ],
        'flagicons' => [
            'name' => 'FlagIcons',
            'base_url' => 'https://flagicons.lipis.dev/flags',
            'format' => 'svg',
            'get_url' => function ($lang_code, $size) {
                $size_map = [
                    'tiny' => '1x1',
                    'small' => '1x1',
                    'medium' => '4x3',
                    'large' => '4x3'
                ];
                $ratio = $size_map[$size] ?? '1x1';
                return "https://flagicons.lipis.dev/flags/{$ratio}/{$lang_code}.svg";
            }
        ],
        'circle-flags' => [
            'name' => 'Circle Flags',
            'base_url' => 'https://hatscripts.github.io/circle-flags',
            'format' => 'svg',
            'get_url' => function ($lang_code, $size) {
                return "https://hatscripts.github.io/circle-flags/flags/{$lang_code}.svg";
            }
        ],
        'rounded-flags' => [
            'name' => 'Rounded Flags',
            'base_url' => 'https://flagicons.lipis.dev/flags',
            'format' => 'svg',
            'get_url' => function ($lang_code, $size) {
                // Utiliser FlagIcons avec style arrondi via CSS
                return "https://flagicons.lipis.dev/flags/4x3/{$lang_code}.svg";
            }
        ],
        'twemoji' => [
            'name' => 'Twemoji',
            'base_url' => 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg',
            'format' => 'svg',
            'get_url' => function ($lang_code, $size) {
                $unicode_map = get_country_unicode_map();
                $unicode = $unicode_map[$lang_code] ?? '';
                if (!$unicode) return '';
                return "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/{$unicode}.svg";
            }
        ],
        'emoji' => [
            'name' => 'Emoji',
            'base_url' => '',
            'format' => 'text',
            'get_url' => function ($lang_code, $size) {
                $emoji_map = get_country_emoji_map();
                return $emoji_map[$lang_code] ?? '';
            }
        ]
    ];
}

/**
 * Configuration des tailles de drapeaux
 */
function get_transposh_flag_sizes()
{
    return [
        'tiny' => [
            'name' => 'Très petit',
            'height' => '12px' // Utiliser seulement height pour préserver le ratio
        ],
        'small' => [
            'name' => 'Petit',
            'height' => '15px'
        ],
        'medium' => [
            'name' => 'Moyen',
            'height' => '24px'
        ],
        'large' => [
            'name' => 'Grand',
            'height' => '36px'
        ]
    ];
}

/**
 * Mapping des codes de pays vers les codes Unicode des emojis
 */
function get_country_unicode_map()
{
    return [
        'fr' => '1f1eb-1f1f7', // France
        'en' => '1f1ec-1f1e7', // Royaume-Uni
        'us' => '1f1fa-1f1f8', // États-Unis
        'es' => '1f1ea-1f1f8', // Espagne
        'it' => '1f1ee-1f1f9', // Italie
        'de' => '1f1e9-1f1ea', // Allemagne
        'pt' => '1f1f5-1f1f9', // Portugal
        'nl' => '1f1f3-1f1f1', // Pays-Bas
        'ru' => '1f1f7-1f1fa', // Russie
        'zh' => '1f1e8-1f1f3', // Chine
        'ja' => '1f1ef-1f1f5', // Japon
        'ko' => '1f1f0-1f1f7', // Corée du Sud
        'ar' => '1f1f8-1f1e6', // Arabie Saoudite
        'pl' => '1f1f5-1f1f1', // Pologne
        'tr' => '1f1f9-1f1f7', // Turquie
        'sv' => '1f1f8-1f1ea', // Suède
        'no' => '1f1f3-1f1f4', // Norvège
        'da' => '1f1e9-1f1f0', // Danemark
        'fi' => '1f1eb-1f1ee', // Finlande
        'el' => '1f1ec-1f1f7', // Grèce
        'he' => '1f1ee-1f1f1', // Israël
        'hi' => '1f1ee-1f1f3', // Inde
        'th' => '1f1f9-1f1ed', // Thaïlande
        'vi' => '1f1fb-1f1f3', // Vietnam
        'id' => '1f1ee-1f1e9', // Indonésie
        'ms' => '1f1f2-1f1fe', // Malaisie
        'tl' => '1f1f5-1f1ed', // Philippines
        'uk' => '1f1fa-1f1e6', // Ukraine
        'cs' => '1f1e8-1f1ff', // République tchèque
        'sk' => '1f1f8-1f1f0', // Slovaquie
        'hu' => '1f1ed-1f1fa', // Hongrie
        'ro' => '1f1f7-1f1f4', // Roumanie
        'bg' => '1f1e7-1f1ec', // Bulgarie
        'hr' => '1f1ed-1f1f7', // Croatie
        'sr' => '1f1f7-1f1f8', // Serbie
        'sl' => '1f1f8-1f1ee', // Slovénie
        'et' => '1f1ea-1f1ea', // Estonie
        'lv' => '1f1f1-1f1fb', // Lettonie
        'lt' => '1f1f1-1f1f9', // Lituanie
        'is' => '1f1ee-1f1f8', // Islande
        'mt' => '1f1f2-1f1f9', // Malte
        'cy' => '1f1e8-1f1fe', // Chypre
        'ie' => '1f1ee-1f1ea', // Irlande
        'be' => '1f1e7-1f1ea', // Belgique
        'lu' => '1f1f1-1f1fa', // Luxembourg
        'ch' => '1f1e8-1f1ed', // Suisse
        'at' => '1f1e6-1f1f9', // Autriche
    ];
}

/**
 * Mapping des codes de pays vers les emojis
 */
function get_country_emoji_map()
{
    return [
        'fr' => '🇫🇷', // France
        'en' => '🇬🇧', // Royaume-Uni
        'us' => '🇺🇸', // États-Unis
        'es' => '🇪🇸', // Espagne
        'it' => '🇮🇹', // Italie
        'de' => '🇩🇪', // Allemagne
        'pt' => '🇵🇹', // Portugal
        'nl' => '🇳🇱', // Pays-Bas
        'ru' => '🇷🇺', // Russie
        'zh' => '🇨🇳', // Chine
        'ja' => '🇯🇵', // Japon
        'ko' => '🇰🇷', // Corée du Sud
        'ar' => '🇸🇦', // Arabie Saoudite
        'pl' => '🇵🇱', // Pologne
        'tr' => '🇹🇷', // Turquie
        'sv' => '🇸🇪', // Suède
        'no' => '🇳🇴', // Norvège
        'da' => '🇩🇰', // Danemark
        'fi' => '🇫🇮', // Finlande
        'el' => '🇬🇷', // Grèce
        'he' => '🇮🇱', // Israël
        'hi' => '🇮🇳', // Inde
        'th' => '🇹🇭', // Thaïlande
        'vi' => '🇻🇳', // Vietnam
        'id' => '🇮🇩', // Indonésie
        'ms' => '🇲🇾', // Malaisie
        'tl' => '🇵🇭', // Philippines
        'uk' => '🇺🇦', // Ukraine
        'cs' => '🇨🇿', // République tchèque
        'sk' => '🇸🇰', // Slovaquie
        'hu' => '🇭🇺', // Hongrie
        'ro' => '🇷🇴', // Roumanie
        'bg' => '🇧🇬', // Bulgarie
        'hr' => '🇭🇷', // Croatie
        'sr' => '🇷🇸', // Serbie
        'sl' => '🇸🇮', // Slovénie
        'et' => '🇪🇪', // Estonie
        'lv' => '🇱🇻', // Lettonie
        'lt' => '🇱🇹', // Lituanie
        'is' => '🇮🇸', // Islande
        'mt' => '🇲🇹', // Malte
        'cy' => '🇨🇾', // Chypre
        'ie' => '🇮🇪', // Irlande
        'be' => '🇧🇪', // Belgique
        'lu' => '🇱🇺', // Luxembourg
        'ch' => '🇨🇭', // Suisse
        'at' => '🇦🇹', // Autriche
    ];
}

/**
 * Fonction pour obtenir l'URL d'un drapeau selon la librairie et la taille
 */
function get_transposh_flag_url($lang_code, $flag_library, $flag_size)
{
    $libraries = get_transposh_flag_libraries();

    if (!isset($libraries[$flag_library])) {
        return '';
    }

    $library = $libraries[$flag_library];
    $get_url_func = $library['get_url'];

    if (!is_callable($get_url_func)) {
        return '';
    }

    return $get_url_func($lang_code, $flag_size);
}

/**
 * Fonction pour obtenir les dimensions d'un drapeau selon la taille
 */
function get_transposh_flag_dimensions($flag_size)
{
    $sizes = get_transposh_flag_sizes();

    if (!isset($sizes[$flag_size])) {
        return ['width' => '20px', 'height' => '15px'];
    }

    return [
        'width' => $sizes[$flag_size]['width'],
        'height' => $sizes[$flag_size]['height']
    ];
}

/**
 * Fonction pour convertir le code de langue Transposh en code de pays
 */
function get_country_code_from_lang($lang_code)
{
    // Mapping des codes de langue vers les codes de pays
    $lang_to_country = [
        'fr' => 'fr',
        'en' => 'gb', // Royaume-Uni par défaut pour l'anglais
        'es' => 'es',
        'it' => 'it',
        'de' => 'de',
        'pt' => 'pt',
        'nl' => 'nl',
        'ru' => 'ru',
        'zh' => 'cn',
        'ja' => 'jp',
        'ko' => 'kr',
        'ar' => 'sa',
        'pl' => 'pl',
        'tr' => 'tr',
        'sv' => 'se',
        'no' => 'no',
        'da' => 'dk',
        'fi' => 'fi',
        'el' => 'gr',
        'he' => 'il',
        'hi' => 'in',
        'th' => 'th',
        'vi' => 'vn',
        'id' => 'id',
        'ms' => 'my',
        'tl' => 'ph',
        'uk' => 'ua',
        'cs' => 'cz',
        'sk' => 'sk',
        'hu' => 'hu',
        'ro' => 'ro',
        'bg' => 'bg',
        'hr' => 'hr',
        'sr' => 'rs',
        'sl' => 'si',
        'et' => 'ee',
        'lv' => 'lv',
        'lt' => 'lt',
        'is' => 'is',
        'mt' => 'mt',
        'cy' => 'cy',
        'ie' => 'ie',
        'be' => 'be',
        'lu' => 'lu',
        'ch' => 'ch',
        'at' => 'at',
    ];

    return $lang_to_country[$lang_code] ?? $lang_code;
}
