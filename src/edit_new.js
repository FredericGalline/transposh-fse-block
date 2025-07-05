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
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

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
	} = attributes;

	const blockProps = useBlockProps();

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
				<div className={getWidgetClasses()}>
					{/* Titre du widget */}
					{title && <div className="widgettitle">{title}</div>}

					{/* Sélecteur de langue selon le style */}
					{style === "dropdown" && (
						<form className="transposh-language-form">
							<select className="transposh-language-select" disabled>
								<option>{__("Choisir une langue", "transposh")}</option>
								<option>
									{showFlags && "🇫🇷 "}
									{showNames && __("Français", "transposh")}
									{!showFlags && !showNames && "FR"}
								</option>
								<option>
									{showFlags && "🇬🇧 "}
									{showNames && __("English", "transposh")}
									{!showFlags && !showNames && "EN"}
								</option>
								<option>
									{showFlags && "🇪🇸 "}
									{showNames && __("Español", "transposh")}
									{!showFlags && !showNames && "ES"}
								</option>
							</select>
						</form>
					)}

					{style === "horizontal" && (
						<div className="transposh-language-switcher">
							<div className="transposh-language-list">
								<span className="transposh-language-link tr_active">
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAyMzk1Ii8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRUQyOTM5Ii8+Cjwvc3ZnPg=="
											alt="Français"
											className="transposh-flag"
										/>
									)}
									{showNames && (
										<span className="transposh-lang-name">Français</span>
									)}
									{!showFlags && !showNames && "FR"}
								</span>
								{" | "}
								<a href="#" className="transposh-language-link">
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg=="
											alt="English"
											className="transposh-flag"
										/>
									)}
									{showNames && (
										<span className="transposh-lang-name">English</span>
									)}
									{!showFlags && !showNames && "EN"}
								</a>
								{" | "}
								<a href="#" className="transposh-language-link">
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjQUEyMjJBIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZDNDAwIi8+Cjwvc3ZnPg=="
											alt="Español"
											className="transposh-flag"
										/>
									)}
									{showNames && (
										<span className="transposh-lang-name">Español</span>
									)}
									{!showFlags && !showNames && "ES"}
								</a>
							</div>
						</div>
					)}

					{style === "vertical" && (
						<div className="transposh-language-switcher">
							<ul className="transposh-language-list">
								<li className="tr_active">
									<span className="transposh-language-link">
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAyMzk1Ii8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRUQyOTM5Ii8+Cjwvc3ZnPg=="
												alt="Français"
												className="transposh-flag"
											/>
										)}
										{showNames && (
											<span className="transposh-lang-name">Français</span>
										)}
										{!showFlags && !showNames && "FR"}
									</span>
								</li>
								<li>
									<a href="#" className="transposh-language-link">
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg=="
												alt="English"
												className="transposh-flag"
											/>
										)}
										{showNames && (
											<span className="transposh-lang-name">English</span>
										)}
										{!showFlags && !showNames && "EN"}
									</a>
								</li>
								<li>
									<a href="#" className="transposh-language-link">
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjQUEyMjJBIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZDNDAwIi8+Cjwvc3ZnPg=="
												alt="Español"
												className="transposh-flag"
											/>
										)}
										{showNames && (
											<span className="transposh-lang-name">Español</span>
										)}
										{!showFlags && !showNames && "ES"}
									</a>
								</li>
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
