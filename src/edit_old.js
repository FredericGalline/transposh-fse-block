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
				{/* Titre du widget */}
				{title && (
					<h3 className="widget-title" style={{ marginBottom: "10px" }}>
						{title}
					</h3>
				)}

				{/* Aperçu du sélecteur de langue */}
				<div style={{ marginBottom: showEditTranslation ? "10px" : "0" }}>
					{style === "dropdown" && (
						<div className="transposh-dropdown-widget">
							<select
								className="transposh-language-select"
								style={{
									padding: "5px",
									border: "1px solid #ccc",
									borderRadius: "4px",
									cursor: "not-allowed",
								}}
								disabled
							>
								<option>Choisir une langue</option>
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
						</div>
					)}

					{style === "horizontal" && (
						<div className="transposh-horizontal-widget">
							<div
								className="transposh-language-list horizontal"
								style={{
									display: "flex",
									gap: "10px",
									flexWrap: "wrap",
								}}
							>
								<a
									href="#"
									className="transposh-language-link tr_active"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "5px",
										textDecoration: "none",
										pointerEvents: "none",
									}}
								>
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAyMzk1Ii8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRUQyOTM5Ii8+Cjwvc3ZnPg=="
											alt="Français"
											className="transposh-flag"
											style={{ width: "16px", height: "12px" }}
										/>
									)}
									{showNames && (
										<span className="transposh-lang-name">Français</span>
									)}
									{!showFlags && !showNames && "FR"}
								</a>
								<a
									href="#"
									className="transposh-language-link"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "5px",
										textDecoration: "none",
										pointerEvents: "none",
									}}
								>
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg=="
											alt="English"
											className="transposh-flag"
											style={{ width: "16px", height: "12px" }}
										/>
									)}
									{showNames && (
										<span className="transposh-lang-name">English</span>
									)}
									{!showFlags && !showNames && "EN"}
								</a>
								<a
									href="#"
									className="transposh-language-link"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: "5px",
										textDecoration: "none",
										pointerEvents: "none",
									}}
								>
									{showFlags && (
										<img
											src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjQUEyMjJBIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZDNDAwIi8+Cjwvc3ZnPg=="
											alt="Español"
											className="transposh-flag"
											style={{ width: "16px", height: "12px" }}
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
						<div className="transposh-vertical-widget">
							<ul
								className="transposh-language-list vertical"
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "5px",
									listStyle: "none",
									padding: "0",
									margin: "0",
								}}
							>
								<li className="tr_active">
									<a
										href="#"
										className="transposh-language-link"
										style={{
											display: "flex",
											alignItems: "center",
											gap: "5px",
											textDecoration: "none",
											pointerEvents: "none",
										}}
									>
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAyMzk1Ii8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRUQyOTM5Ii8+Cjwvc3ZnPg=="
												alt="Français"
												className="transposh-flag"
												style={{ width: "16px", height: "12px" }}
											/>
										)}
										{showNames && (
											<span className="transposh-lang-name">Français</span>
										)}
										{!showFlags && !showNames && "FR"}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="transposh-language-link"
										style={{
											display: "flex",
											alignItems: "center",
											gap: "5px",
											textDecoration: "none",
											pointerEvents: "none",
										}}
									>
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMDEyMTY5Ii8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZGIi8+Cjwvc3ZnPg=="
												alt="English"
												className="transposh-flag"
												style={{ width: "16px", height: "12px" }}
											/>
										)}
										{showNames && (
											<span className="transposh-lang-name">English</span>
										)}
										{!showFlags && !showNames && "EN"}
									</a>
								</li>
								<li>
									<a
										href="#"
										className="transposh-language-link"
										style={{
											display: "flex",
											alignItems: "center",
											gap: "5px",
											textDecoration: "none",
											pointerEvents: "none",
										}}
									>
										{showFlags && (
											<img
												src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNiAxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjRkZGIi8+CjxyZWN0IHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjQUEyMjJBIi8+CjxyZWN0IHk9IjgiIHdpZHRoPSIxNiIgaGVpZ2h0PSI0IiBmaWxsPSIjRkZDNDAwIi8+Cjwvc3ZnPg=="
												alt="Español"
												className="transposh-flag"
												style={{ width: "16px", height: "12px" }}
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
				</div>

				{/* Toggle Edit Translation */}
				{showEditTranslation && (
					<div className="transposh-edit-translation">
						<label
							className="transposh-toggle-control"
							style={{
								display: "flex",
								alignItems: "center",
								gap: "8px",
								cursor: "not-allowed",
								userSelect: "none",
							}}
						>
							<span
								className="transposh-toggle-track"
								style={{
									position: "relative",
									display: "inline-block",
									width: "36px",
									height: "18px",
									backgroundColor: "#ddd",
									borderRadius: "9px",
									transition: "background-color 0.2s",
								}}
							>
								<span
									className="transposh-toggle-thumb"
									style={{
										position: "absolute",
										top: "2px",
										left: "2px",
										width: "14px",
										height: "14px",
										backgroundColor: "white",
										borderRadius: "50%",
										transition: "left 0.2s",
										boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
									}}
								></span>
							</span>
							<span
								className="transposh-toggle-label"
								style={{ fontSize: "13px", color: "#555" }}
							>
								{__("Edit Translation", "transposh")}
							</span>
						</label>
					</div>
		</>
	);
}
