<?php

/**
 * Test du widget Transposh personnalisé
 * 
 * Ce fichier permet de tester le rendu du widget avec différents paramètres
 */

// Simuler un environnement WordPress minimal
if (!function_exists('esc_html')) {
    function esc_html($text)
    {
        return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    }
}

if (!function_exists('esc_attr')) {
    function esc_attr($text)
    {
        return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
    }
}

if (!function_exists('__')) {
    function __($text, $domain = 'default')
    {
        return $text;
    }
}

// Simuler les données du widget Transposh
$mock_widget_args = [
    [
        'lang' => 'Français',
        'langorig' => 'Français',
        'flag' => 'fr',
        'isocode' => 'fr',
        'url' => 'https://example.com/fr',
        'active' => true
    ],
    [
        'lang' => 'English',
        'langorig' => 'English',
        'flag' => 'en',
        'isocode' => 'en',
        'url' => 'https://example.com/en',
        'active' => false
    ],
    [
        'lang' => 'Español',
        'langorig' => 'Español',
        'flag' => 'es',
        'isocode' => 'es',
        'url' => 'https://example.com/es',
        'active' => false
    ]
];

// Inclure les fonctions du render.php
include 'render.php';

// Test avec différents paramètres
echo "<h2>Test du widget Transposh personnalisé</h2>";

// Test 1: Horizontal avec drapeaux et noms
echo "<h3>Test 1: Horizontal avec drapeaux et noms</h3>";
$test_output = create_custom_transposh_widget($mock_widget_args, true, true, false, 'horizontal', true, 'Choisir la langue');
echo $test_output;

// Test 2: Vertical sans drapeaux
echo "<h3>Test 2: Vertical sans drapeaux</h3>";
$test_output = create_custom_transposh_widget($mock_widget_args, false, true, false, 'vertical', true, '');
echo $test_output;

// Test 3: Dropdown
echo "<h3>Test 3: Dropdown</h3>";
$test_output = create_custom_transposh_widget($mock_widget_args, true, true, false, 'dropdown', true, '');
echo $test_output;

// Test 4: Horizontal avec langue actuelle masquée
echo "<h3>Test 4: Horizontal avec langue actuelle masquée</h3>";
$test_output = create_custom_transposh_widget($mock_widget_args, true, true, true, 'horizontal', true, '');
echo $test_output;

echo "<style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h2, h3 { color: #333; }
    .widget-title { color: #007cba; }
    .transposh-language-link { margin-right: 10px; }
    .transposh-flag { margin-right: 5px; }
    .tr_active { background-color: #007cba; color: white; padding: 2px 5px; border-radius: 3px; }
</style>";
