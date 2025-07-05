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
	const { showFlags, showNames, hideCurrentLanguage, style, nofollow, title } =
		attributes;

	const blockProps = useBlockProps();

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
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					style={{
						border: "2px dashed #ccc",
						padding: "20px",
						textAlign: "center",
						backgroundColor: "#f9f9f9",
						borderRadius: "4px",
					}}
				>
					<div style={{ fontSize: "24px", marginBottom: "10px" }}>🌐</div>
					<div style={{ fontWeight: "bold", marginBottom: "8px" }}>
						{title || __("Widget Transposh", "transposh")}
					</div>
					<div
						style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}
					>
						{__("Aperçu - Le rendu réel sera visible sur le site", "transposh")}
					</div>

					{/* Prévisualisation plus réaliste */}
					<div style={{ marginBottom: "10px" }}>
						{style === "dropdown" && (
							<select style={{ padding: "5px", borderRadius: "4px" }}>
								<option>🇫🇷 Français</option>
								<option>🇬🇧 English</option>
								<option>🇪🇸 Español</option>
							</select>
						)}

						{style === "horizontal" && (
							<div
								style={{
									display: "flex",
									gap: "10px",
									justifyContent: "center",
								}}
							>
								{showFlags && <span>🇫🇷</span>}
								{showNames && <span>Français</span>}
								{(showFlags || showNames) && <span>|</span>}
								{showFlags && <span>🇬🇧</span>}
								{showNames && <span>English</span>}
								{(showFlags || showNames) && <span>|</span>}
								{showFlags && <span>🇪🇸</span>}
								{showNames && <span>Español</span>}
							</div>
						)}

						{style === "vertical" && (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "5px",
									alignItems: "center",
								}}
							>
								<div>
									{showFlags && <span>🇫🇷</span>}{" "}
									{showNames && <span>Français</span>}
								</div>
								<div>
									{showFlags && <span>🇬🇧</span>}{" "}
									{showNames && <span>English</span>}
								</div>
								<div>
									{showFlags && <span>🇪🇸</span>}{" "}
									{showNames && <span>Español</span>}
								</div>
							</div>
						)}
					</div>

					<div style={{ fontSize: "11px", color: "#999" }}>
						{__("Style:", "transposh")} <strong>{style}</strong> |
						{__("Drapeaux:", "transposh")}{" "}
						<strong>
							{showFlags ? __("Oui", "transposh") : __("Non", "transposh")}
						</strong>{" "}
						|{__("Noms:", "transposh")}{" "}
						<strong>
							{showNames ? __("Oui", "transposh") : __("Non", "transposh")}
						</strong>
						{hideCurrentLanguage && (
							<span> | {__("Langue actuelle masquée", "transposh")}</span>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
