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
							"Affiche la checkbox pour basculer en mode édition de traduction",
							"transposh",
						)}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div
					style={{
						padding: "10px",
						border: "1px solid #ddd",
						borderRadius: "4px",
						backgroundColor: "#fff",
					}}
				>
					{/* Titre du widget */}
					{title && (
						<div
							style={{
								marginBottom: "10px",
								fontWeight: "bold",
								fontSize: "14px",
							}}
						>
							{title}
						</div>
					)}

					{/* Aperçu du sélecteur de langue */}
					<div style={{ marginBottom: "10px" }}>
						{style === "dropdown" && (
							<select
								style={{
									padding: "5px 10px",
									borderRadius: "4px",
									border: "1px solid #ccc",
									backgroundColor: "#fff",
									cursor: "not-allowed",
								}}
								disabled
							>
								<option>
									{showFlags && "🇫🇷 "}
									{showNames && "Français"}
									{!showFlags && !showNames && "FR"}
								</option>
								<option>
									{showFlags && "🇬🇧 "}
									{showNames && "English"}
									{!showFlags && !showNames && "EN"}
								</option>
								<option>
									{showFlags && "🇪🇸 "}
									{showNames && "Español"}
									{!showFlags && !showNames && "ES"}
								</option>
							</select>
						)}

						{style === "horizontal" && (
							<div
								style={{
									display: "flex",
									gap: "10px",
									justifyContent: "flex-start",
									alignItems: "center",
								}}
							>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f0f0f0",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇫🇷"}
									{showFlags && showNames && " "}
									{showNames && "Français"}
									{!showFlags && !showNames && "FR"}
								</span>
								<span style={{ color: "#ccc" }}>|</span>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f9f9f9",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇬�"}
									{showFlags && showNames && " "}
									{showNames && "English"}
									{!showFlags && !showNames && "EN"}
								</span>
								<span style={{ color: "#ccc" }}>|</span>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f9f9f9",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇪🇸"}
									{showFlags && showNames && " "}
									{showNames && "Español"}
									{!showFlags && !showNames && "ES"}
								</span>
							</div>
						)}

						{style === "vertical" && (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "5px",
									alignItems: "flex-start",
								}}
							>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f0f0f0",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇫🇷"}
									{showFlags && showNames && " "}
									{showNames && "Français"}
									{!showFlags && !showNames && "FR"}
								</span>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f9f9f9",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇬🇧"}
									{showFlags && showNames && " "}
									{showNames && "English"}
									{!showFlags && !showNames && "EN"}
								</span>
								<span
									style={{
										padding: "5px 8px",
										backgroundColor: "#f9f9f9",
										borderRadius: "3px",
										cursor: "not-allowed",
										fontSize: "14px",
									}}
								>
									{showFlags && "🇪🇸"}
									{showFlags && showNames && " "}
									{showNames && "Español"}
									{!showFlags && !showNames && "ES"}
								</span>
							</div>
						)}
					</div>

					{/* Checkbox Edit Translation */}
					{showEditTranslation && (
						<div style={{ marginTop: "10px", fontSize: "12px", color: "#666" }}>
							<label
								style={{
									display: "flex",
									alignItems: "center",
									gap: "5px",
									cursor: "not-allowed",
								}}
							>
								<input
									type="checkbox"
									disabled
									style={{ cursor: "not-allowed" }}
								/>
								{__("Edit Translation", "transposh")}
							</label>
						</div>
					)}

					{/* Indication d'aperçu */}
					<div
						style={{
							marginTop: "15px",
							fontSize: "11px",
							color: "#999",
							fontStyle: "italic",
							textAlign: "center",
							borderTop: "1px solid #eee",
							paddingTop: "10px",
						}}
					>
						{__(
							"Aperçu non-cliquable - Le rendu réel sera fonctionnel sur le site",
							"transposh",
						)}
					</div>
				</div>
			</div>
		</>
	);
}
