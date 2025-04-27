<?php

// Supprime les block pattern  de base
function remove_default_block_patterns()
{
    remove_theme_support('core-block-patterns');
}
add_action('after_setup_theme', 'remove_default_block_patterns');

//Catégories
function block_pattern_categories()
{
    $categories = array(

        'appels-a-l-action' => __('Appels à l\'Action', 'textdomain'),/*1*/
        'blog-et-articles' => __('Blog et Articles', 'textdomain'),/*2*/
        'carousel' => __('Carrousel', 'textdomain'),/*3*/
        'cards' => __('Cartes', 'textdomain'),/*4*/
        'contact-et-cartes' => __('Contact et Cartes', 'textdomain'),/*5*/
        'quote' => __('Citations', 'textdomain'),/*6*/
        'content' => __('Contenu', 'textdomain'),/*7*/
        'teams' => __('Équipes', 'textdomain'),/*8*/
        'faq' => __('FAQ', 'textdomain'),/*9*/
        'feature' => __('Feature section', 'textdomain'),/*10*/
        'galerie-images' => __('Galerie d\'Images', 'textdomain'),/*11*/
        'hero-section' => __('Héros section', 'textdomain'),/*12*/
        'logos' => __('Nuages de logos', 'textdomain'),/*13*/
        'pages' => __('page', 'textdomain'),/*19*/
        'portfolios' => __('Portfolios', 'textdomain'),/*14*/
        'tarifs' => __('Tarifs', 'textdomain'),/*15*/
        'text' => __('Textes', 'textdomain'),/*16*/
        'temoignages' => __('Témoignages', 'textdomain'),/*17*/
        'stats' => __('Stats', 'textdomain'), /*18*/
    );

    foreach ($categories as $id => $label) {
        register_block_pattern_category($id, array('label' => $label));
    }
}
add_action('init', 'block_pattern_categories');
