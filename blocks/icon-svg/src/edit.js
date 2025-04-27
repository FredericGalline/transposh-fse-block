import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {
	TextareaControl,
	PanelBody,
	RangeControl,
	ToggleControl,
	ColorPicker,
	ExternalLink,
} from "@wordpress/components";
import { Icon } from "@wordpress/icons";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const {
		svgContent = '<svg><rect width="100%" height="100%" fill="blue" /></svg>', // Contenu SVG par défaut pour tester
		width,
		svgColor,
		useCurrentColor,
		align,
		margin,
		padding,
		useBackground,
		backgroundColor,
		link, // Ajout du lien
	} = attributes;

	// Nettoyage du SVG
	const cleanSVG = (value) => {
		if (!value || value.trim() === "") {
			console.log("SVG content is empty or undefined.");
			return ""; // Fallback si aucune valeur n'est fournie
		}
		console.log("Raw SVG content before cleaning:", value);
		const cleaned = value
			.replace(/<\?xml[^>]*\?>/g, "") // Supprime la déclaration XML
			.replace(/<!--[^>]*-->/g, "") // Supprime les commentaires
			.replace(/width="[^"]*"/g, `width="100%"`) // Remplace la largeur par 100%
			.replace(/height="[^"]*"/g, `height="auto"`) // Hauteur auto
			.replace(
				/fill="[^"]*"/g,
				`fill="${useCurrentColor ? "currentColor" : svgColor}"`,
			); // Gestion de la couleur
		console.log("Cleaned SVG content:", cleaned);
		return cleaned;
	};

	// Validation stricte de svgContent
	const isValidSVG = svgContent && svgContent.trim().length > 0;
	console.log("isValidSVG:", isValidSVG);
	console.log("SVG content (after clean):", svgContent); // Debugging pour s'assurer que svgContent est bien défini

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={align}
					onChange={(newAlign) => setAttributes({ align: newAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("SVG Settings", "icon-svg")}>
					<TextareaControl
						label={__("Paste your SVG code", "icon-svg")}
						value={svgContent}
						onChange={(value) => {
							console.log("Raw SVG content before cleaning:", value);
							const cleanedSVG = cleanSVG(value);
							setAttributes({ svgContent: cleanedSVG });
						}}
					/>
					<RangeControl
						label={__("Width", "icon-svg")}
						value={width}
						onChange={(value) => setAttributes({ width: value })}
						min={50}
						max={800}
					/>
					<ToggleControl
						label={__("Use currentColor?", "icon-svg")}
						checked={useCurrentColor}
						onChange={(value) => setAttributes({ useCurrentColor: value })}
					/>
					{!useCurrentColor && (
						<ColorPicker
							label={__("SVG Color", "icon-svg")}
							color={svgColor}
							onChangeComplete={(value) =>
								setAttributes({ svgColor: value.hex })
							}
							disableAlpha
						/>
					)}
				</PanelBody>

				<PanelBody title={__("Link Settings", "icon-svg")} initialOpen={false}>
					<LinkControl
						value={link}
						onChange={(newLink) => setAttributes({ link: newLink })}
					/>
					{link && (
						<ExternalLink href={link.url}>
							{__("Preview Link", "icon-svg")}
						</ExternalLink>
					)}
				</PanelBody>

				{/* Panel for margin, padding, and background options */}
				<PanelBody
					title={__("Layout Settings", "icon-svg")}
					initialOpen={false}
				>
					<RangeControl
						label={__("Margin", "icon-svg")}
						value={margin}
						onChange={(value) => setAttributes({ margin: value })}
						min={0}
						max={100}
					/>
					<RangeControl
						label={__("Padding", "icon-svg")}
						value={padding}
						onChange={(value) => setAttributes({ padding: value })}
						min={0}
						max={100}
					/>
					<ToggleControl
						label={__("Add Background?", "icon-svg")}
						checked={useBackground}
						onChange={(value) => setAttributes({ useBackground: value })}
					/>
					{useBackground && (
						<ColorPicker
							label={__("Background Color", "icon-svg")}
							color={backgroundColor}
							onChangeComplete={(value) =>
								setAttributes({ backgroundColor: value.hex })
							}
							disableAlpha
						/>
					)}
				</PanelBody>
			</InspectorControls>

			<div
				{...blockProps}
				style={{
					width: "100%",
					margin: `${margin}px`,
					padding: `${padding}px`,
					textAlign: align,
					backgroundColor: useBackground ? backgroundColor : "transparent",
				}}
			>
				{/* Si un lien est défini, enveloppe le SVG dans une balise <a> */}
				{isValidSVG ? (
					link ? (
						<a
							href={link.url}
							target={link.opensInNewTab ? "_blank" : undefined}
						>
							<Icon
								icon={
									<div
										style={{
											width: "100%",
											height: "auto",
											color: useCurrentColor ? "currentColor" : svgColor,
											backgroundColor: "transparent",
										}}
										dangerouslySetInnerHTML={{ __html: svgContent }}
									/>
								}
							/>
						</a>
					) : (
						<Icon
							icon={
								<div
									style={{
										width: "100%",
										height: "auto",
										color: useCurrentColor ? "currentColor" : svgColor,
										backgroundColor: "transparent",
									}}
									dangerouslySetInnerHTML={{ __html: svgContent }}
								/>
							}
						/>
					)
				) : (
					<Icon icon="star" />
				)}
			</div>
		</>
	);
}
