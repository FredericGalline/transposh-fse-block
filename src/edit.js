/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";

/**
 * WordPress components for the sidebar controls
 */
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
} from "@wordpress/components";

/**
 * WordPress data package for accessing global data
 */
import { useSelect } from "@wordpress/data";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Configuration des langues réalistes basées sur les langues communes de Transposh
 * Avec support pour différentes librairies d'icônes de drapeaux
 */
const TRANSPOSH_LANGUAGES = {
	fr: {
		code: "fr",
		name: "Français",
		emoji: "🇫🇷",
		flags: {
			flagcdn: "https://flagcdn.com/w20/fr.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/fr.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1eb-1f1f7.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/fr.svg",
			"rounded-flags": "https://flagcdn.com/w20/fr.png",
		},
	},
	en: {
		code: "en",
		name: "English",
		emoji: "🇺🇸",
		flags: {
			flagcdn: "https://flagcdn.com/w20/us.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/us.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1fa-1f1f8.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/us.svg",
			"rounded-flags": "https://flagcdn.com/w20/us.png",
		},
	},
	es: {
		code: "es",
		name: "Español",
		emoji: "🇪🇸",
		flags: {
			flagcdn: "https://flagcdn.com/w20/es.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/es.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ea-1f1f8.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/es.svg",
			"rounded-flags": "https://flagcdn.com/w20/es.png",
		},
	},
	de: {
		code: "de",
		name: "Deutsch",
		emoji: "🇩🇪",
		flags: {
			flagcdn: "https://flagcdn.com/w20/de.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/de.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e9-1f1ea.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/de.svg",
			"rounded-flags": "https://flagcdn.com/w20/de.png",
		},
	},
	it: {
		code: "it",
		name: "Italiano",
		emoji: "🇮🇹",
		flags: {
			flagcdn: "https://flagcdn.com/w20/it.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/it.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ee-1f1f9.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/it.svg",
			"rounded-flags": "https://flagcdn.com/w20/it.png",
		},
	},
	pt: {
		code: "pt",
		name: "Português",
		emoji: "🇵🇹",
		flags: {
			flagcdn: "https://flagcdn.com/w20/pt.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/pt.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f5-1f1f9.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/pt.svg",
			"rounded-flags": "https://flagcdn.com/w20/pt.png",
		},
	},
	nl: {
		code: "nl",
		name: "Nederlands",
		emoji: "🇳🇱",
		flags: {
			flagcdn: "https://flagcdn.com/w20/nl.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/nl.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f3-1f1f1.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/nl.svg",
			"rounded-flags": "https://flagcdn.com/w20/nl.png",
		},
	},
	ru: {
		code: "ru",
		name: "Русский",
		emoji: "🇷🇺",
		flags: {
			flagcdn: "https://flagcdn.com/w20/ru.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/ru.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f7-1f1fa.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/ru.svg",
			"rounded-flags": "https://flagcdn.com/w20/ru.png",
		},
	},
	zh: {
		code: "zh",
		name: "中文",
		emoji: "🇨🇳",
		flags: {
			flagcdn: "https://flagcdn.com/w20/cn.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/cn.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1e8-1f1f3.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/cn.svg",
			"rounded-flags": "https://flagcdn.com/w20/cn.png",
		},
	},
	ja: {
		code: "ja",
		name: "日本語",
		emoji: "🇯🇵",
		flags: {
			flagcdn: "https://flagcdn.com/w20/jp.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/jp.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1ef-1f1f5.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/jp.svg",
			"rounded-flags": "https://flagcdn.com/w20/jp.png",
		},
	},
	ar: {
		code: "ar",
		name: "العربية",
		emoji: "🇸🇦",
		flags: {
			flagcdn: "https://flagcdn.com/w20/sa.png",
			flagicons: "https://flagicons.lipis.dev/flags/4x3/sa.svg",
			twemoji:
				"https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/1f1f8-1f1e6.svg",
			"circle-flags": "https://hatscripts.github.io/circle-flags/flags/sa.svg",
			"rounded-flags": "https://flagcdn.com/w20/sa.png",
		},
	},
};

/**
 * Configuration des librairies d'icônes de drapeaux
 */
const FLAG_LIBRARIES = {
	flagcdn: {
		name: __("FlagCDN (PNG)", "transposh"),
		description: __("Drapeaux PNG haute qualité", "transposh"),
		format: "png",
	},
	flagicons: {
		name: __("Flag Icons (SVG)", "transposh"),
		description: __("Drapeaux SVG vectoriels", "transposh"),
		format: "svg",
	},
	emoji: {
		name: __("Emoji natifs", "transposh"),
		description: __("Emojis de drapeaux du système", "transposh"),
		format: "emoji",
	},
	twemoji: {
		name: __("Twemoji (SVG)", "transposh"),
		description: __("Emojis Twitter en SVG", "transposh"),
		format: "svg",
	},
	"circle-flags": {
		name: __("Circle Flags (SVG)", "transposh"),
		description: __("Drapeaux circulaires en SVG", "transposh"),
		format: "svg",
	},
	"rounded-flags": {
		name: __("Rounded Flags (PNG)", "transposh"),
		description: __("Drapeaux avec coins arrondis", "transposh"),
		format: "png",
	},
};

/**
 * Configuration des tailles de drapeaux
 */
const FLAG_SIZES = {
	tiny: {
		name: __("Très petit", "transposh"),
		dimensions: { width: 12, height: 9 },
		description: __("12×9px - Idéal pour les espaces restreints", "transposh"),
	},
	small: {
		name: __("Petit", "transposh"),
		dimensions: { width: 16, height: 12 },
		description: __("16×12px - Taille recommandée", "transposh"),
	},
	medium: {
		name: __("Moyen", "transposh"),
		dimensions: { width: 24, height: 18 },
		description: __("24×18px - Bonne visibilité", "transposh"),
	},
	large: {
		name: __("Grand", "transposh"),
		dimensions: { width: 32, height: 24 },
		description: __("32×24px - Maximum recommandé", "transposh"),
	},
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		showFlags,
		showNames,
		hideCurrentLanguage,
		style,
		nofollow,
		title,
		showEditTranslation,
		flagLibrary,
		flagSize,
	} = attributes;

	const blockProps = useBlockProps();

	// Récupération des langues configurées sur le site (simulation réaliste)
	const siteLanguages = useSelect((select) => {
		// Tenter de récupérer les langues configurées
		const siteData = select("core").getSite();
		const currentLang = siteData?.language || "fr";

		// Simulation des langues configurées typiques pour un site français
		const configuredLanguages = [
			currentLang.substring(0, 2), // Langue principale
			"en", // Anglais (très commun)
			"es", // Espagnol
			"de", // Allemand
			"it", // Italien
		];

		// Suppression des doublons et limitation à 5 langues max
		const uniqueLanguages = [...new Set(configuredLanguages)].slice(0, 5);

		return uniqueLanguages.map(
			(langCode) => TRANSPOSH_LANGUAGES[langCode] || TRANSPOSH_LANGUAGES.fr,
		);
	}, []);

	// Langue actuelle (première de la liste)
	const currentLanguage = siteLanguages[0] || TRANSPOSH_LANGUAGES.fr;

	// Fonction pour obtenir les classes CSS selon le style
	const getWidgetClasses = () => {
		switch (style) {
			case "dropdown":
				return "transposh-dropdown-widget";
			case "vertical":
				return "transposh-vertical-widget";
			case "horizontal":
			default:
				return "transposh-horizontal-widget";
		}
	};

	// Fonction pour rendre un lien de langue
	const renderLanguageLink = (language, isActive = false, isSpan = false) => {
		const Element = isSpan ? "span" : "a";
		const className = `transposh-language-link ${isActive ? "tr_active" : ""}`;

		// Obtenir l'URL du drapeau selon la librairie sélectionnée
		const getFlagUrl = (lang, library) => {
			if (library === "emoji") {
				return null; // Pas d'image pour les emojis
			}
			return lang.flags[library] || lang.flags.flagcdn;
		};

		// Obtenir les dimensions selon la taille sélectionnée
		const getFlagDimensions = (size) => {
			return FLAG_SIZES[size] || FLAG_SIZES.small;
		};

		const flagUrl = getFlagUrl(language, flagLibrary);
		const flagDimensions = getFlagDimensions(flagSize);

		return (
			<Element
				key={language.code}
				href={!isSpan ? "#" : undefined}
				className={className}
				onClick={!isSpan ? (e) => e.preventDefault() : undefined}
			>
				{showFlags && (
					<>
						{flagLibrary === "emoji" ? (
							<span
								className="transposh-flag-emoji"
								style={{
									fontSize: `${flagDimensions.dimensions.width}px`,
									lineHeight: 1,
									verticalAlign: "middle",
								}}
							>
								{language.emoji}
							</span>
						) : (
							<img
								src={flagUrl}
								alt={language.name}
								className={`transposh-flag transposh-flag-${flagSize}`}
								style={{
									width: `${flagDimensions.dimensions.width}px`,
									height: `${flagDimensions.dimensions.height}px`,
									display: "inline-block",
									verticalAlign: "middle",
								}}
								onError={(e) => {
									// Fallback vers l'emoji si l'image ne charge pas
									e.target.style.display = "none";
									e.target.nextSibling.style.display = "inline";
								}}
							/>
						)}
						{flagLibrary !== "emoji" && (
							<span
								className="transposh-flag-fallback"
								style={{
									display: "none",
									fontSize: `${flagDimensions.dimensions.width}px`,
									lineHeight: 1,
									verticalAlign: "middle",
								}}
							>
								{language.emoji}
							</span>
						)}
					</>
				)}
				{showNames && (
					<span className="transposh-lang-name">{language.name}</span>
				)}
				{!showFlags && !showNames && language.code.toUpperCase()}
			</Element>
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__("Paramètres Transposh", "transposh")}
					initialOpen={true}
				>
					<TextControl
						label={__("Titre du widget", "transposh")}
						value={title}
						onChange={(value) => setAttributes({ title: value })}
						help={__(
							"Titre affiché au-dessus du sélecteur de langue",
							"transposh",
						)}
					/>

					<SelectControl
						label={__("Style d'affichage", "transposh")}
						value={style}
						options={[
							{ label: __("Horizontal", "transposh"), value: "horizontal" },
							{ label: __("Vertical", "transposh"), value: "vertical" },
							{ label: __("Menu déroulant", "transposh"), value: "dropdown" },
						]}
						onChange={(value) => setAttributes({ style: value })}
					/>

					<ToggleControl
						label={__("Afficher les drapeaux", "transposh")}
						checked={showFlags}
						onChange={(value) => setAttributes({ showFlags: value })}
						help={__(
							"Affiche les drapeaux des pays à côté des noms de langues",
							"transposh",
						)}
					/>

					{showFlags && (
						<>
							<SelectControl
								label={__("Librairie de drapeaux", "transposh")}
								value={flagLibrary}
								options={[
									{ label: FLAG_LIBRARIES.flagcdn.name, value: "flagcdn" },
									{ label: FLAG_LIBRARIES.flagicons.name, value: "flagicons" },
									{ label: FLAG_LIBRARIES.emoji.name, value: "emoji" },
									{ label: FLAG_LIBRARIES.twemoji.name, value: "twemoji" },
									{
										label: FLAG_LIBRARIES["circle-flags"].name,
										value: "circle-flags",
									},
									{
										label: FLAG_LIBRARIES["rounded-flags"].name,
										value: "rounded-flags",
									},
								]}
								onChange={(value) => setAttributes({ flagLibrary: value })}
								help={
									FLAG_LIBRARIES[flagLibrary]?.description ||
									__("Choisissez le style de drapeaux", "transposh")
								}
							/>

							{flagLibrary !== "emoji" && (
								<SelectControl
									label={__("Taille des drapeaux", "transposh")}
									value={flagSize}
									options={[
										{ label: FLAG_SIZES.tiny.name, value: "tiny" },
										{ label: FLAG_SIZES.small.name, value: "small" },
										{ label: FLAG_SIZES.medium.name, value: "medium" },
										{ label: FLAG_SIZES.large.name, value: "large" },
									]}
									onChange={(value) => setAttributes({ flagSize: value })}
									help={
										FLAG_SIZES[flagSize]?.description ||
										__("Choisissez la taille des drapeaux", "transposh")
									}
								/>
							)}
						</>
					)}

					<ToggleControl
						label={__("Afficher les noms de langues", "transposh")}
						checked={showNames}
						onChange={(value) => setAttributes({ showNames: value })}
						help={__("Affiche les noms des langues en texte", "transposh")}
					/>

					<ToggleControl
						label={__("Masquer la langue actuelle", "transposh")}
						checked={hideCurrentLanguage}
						onChange={(value) => setAttributes({ hideCurrentLanguage: value })}
						help={__("Cache la langue actuellement sélectionnée", "transposh")}
					/>

					<ToggleControl
						label={__("Ajouter rel='nofollow'", "transposh")}
						checked={nofollow}
						onChange={(value) => setAttributes({ nofollow: value })}
						help={__(
							"Ajoute l'attribut nofollow aux liens de langues",
							"transposh",
						)}
					/>

					<ToggleControl
						label={__("Afficher 'Edit Translation'", "transposh")}
						checked={showEditTranslation}
						onChange={(value) => setAttributes({ showEditTranslation: value })}
						help={__(
							"Affiche le toggle pour basculer en mode édition de traduction",
							"transposh",
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					className={getWidgetClasses()}
					data-flag-library={flagLibrary}
					data-flag-size={flagSize}
				>
					{/* Titre du widget */}
					{title && <div className="widgettitle">{title}</div>}

					{/* Sélecteur de langue selon le style */}
					{style === "dropdown" && (
						<form className="transposh-language-form">
							<select className="transposh-language-select" disabled>
								<option>{__("Choisir une langue", "transposh")}</option>
								{siteLanguages.map((language) => (
									<option key={language.code} value={language.code}>
										{showFlags &&
											flagLibrary === "emoji" &&
											`${language.emoji} `}
										{showNames && language.name}
										{!showFlags && !showNames && language.code.toUpperCase()}
									</option>
								))}
							</select>
						</form>
					)}

					{style === "horizontal" && (
						<div className="transposh-language-switcher">
							<div className="transposh-language-list">
								{siteLanguages.map((language, index) => (
									<span key={language.code}>
										{index === 0 && !hideCurrentLanguage
											? renderLanguageLink(language, true, true)
											: renderLanguageLink(language, false, false)}
										{index < siteLanguages.length - 1 && " | "}
									</span>
								))}
							</div>
						</div>
					)}

					{style === "vertical" && (
						<div className="transposh-language-switcher">
							<ul className="transposh-language-list">
								{siteLanguages.map((language, index) => (
									<li
										key={language.code}
										className={
											index === 0 && !hideCurrentLanguage ? "tr_active" : ""
										}
									>
										{index === 0 && !hideCurrentLanguage
											? renderLanguageLink(language, true, true)
											: renderLanguageLink(language, false, false)}
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Toggle Edit Translation */}
					{showEditTranslation && (
						<div className="transposh-edit-translation">
							<label className="transposh-toggle-control">
								<span className="transposh-toggle-track">
									<span className="transposh-toggle-thumb"></span>
								</span>
								<span className="transposh-toggle-label">
									{__("Edit Translation", "transposh")}
								</span>
							</label>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
