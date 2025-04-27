import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	ColorPalette,
	InnerBlocks,
} from "@wordpress/block-editor";
import { Button, PanelBody, FocalPointPicker } from "@wordpress/components";

export default function Edit({ attributes, setAttributes }) {
	const {
		imageUrl,
		focalPoint = { x: 0.5, y: 0.5 },
		bgColor = "#f5f5f5", // Couleur de fond par défaut
		textColor = "#333333", // Couleur de texte par défaut
	} = attributes;

	const blockProps = useBlockProps();

	// Fonction pour gérer le changement de l'image
	const handleImageSelect = (media) => {
		if (media && media.url) {
			setAttributes({ imageUrl: media.url });
		}
	};

	// Fonction pour gérer le changement du point focal
	const handleFocalPointChange = (newFocalPoint) => {
		setAttributes({ focalPoint: newFocalPoint });
	};

	// Fonction pour gérer le changement des couleurs
	const handleBgColorChange = (newColor) => {
		setAttributes({ bgColor: newColor || "#f5f5f5" });
	};

	const handleTextColorChange = (newColor) => {
		setAttributes({ textColor: newColor || "#333333" });
	};

	return (
		<div {...blockProps} style={{ maxWidth: "100%", margin: "0 auto" }}>
			{/* Image avec masque SVG */}
			{imageUrl && (
				<div
					style={{
						position: "relative",
						width: "100%",
						paddingTop: "70.69%", // Calcul basé sur le ratio 410/580
						overflow: "hidden",
					}}
				>
					<div
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							backgroundImage: `url(${imageUrl})`,
							backgroundPosition: `${focalPoint.x * 100}% ${
								focalPoint.y * 100
							}%`,
							backgroundSize: "cover",
							maskImage: `url('/wp-content/themes/lamaisonsurlasorgue/assets/img/picture-arche-mask.svg')`,
							WebkitMaskImage: `url('/wp-content/themes/lamaisonsurlasorgue/assets/img/picture-arche-mask.svg')`,
							maskSize: "100% 100%",
							WebkitMaskSize: "100% 100%",
							maskRepeat: "no-repeat",
							WebkitMaskRepeat: "no-repeat",
						}}
					></div>
				</div>
			)}

			{/* Contenu de la carte */}
			<div
				style={{
					backgroundColor: bgColor,
					color: textColor,
					padding: "18px 40px 40px",
					borderRadius: "0 0 30px 30px", // Coins arrondis en bas
					fontFamily: "var(--wp--preset--font-family--body)", // Utilisation de la variable globale de typographie
				}}
			> 
				<InnerBlocks
					allowedBlocks={["core/heading", "core/paragraph", "core/button"]}
					template={[
						[
							"core/heading",
							{ level: 3, placeholder: __("Card Title", "simple-card") },
						],
						[
							"core/paragraph",
							{ placeholder: __("Card content goes here", "simple-card") },
						],
						["core/button", { text: __("Learn More", "simple-card") }],
					]}
				/>
			</div>

			{/* InspectorControls avec MediaUpload, FocalPointPicker et ColorPalette */}
			<InspectorControls>
				<PanelBody title={__("Image Settings", "simple-card")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={handleImageSelect}
							allowedTypes={["image"]}
							render={({ open }) => (
								<Button onClick={open} variant="secondary">
									{imageUrl
										? __("Change Image", "simple-card")
										: __("Select Image", "simple-card")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{imageUrl && (
						<FocalPointPicker
							label={__("Adjust Focal Point", "simple-card")}
							url={imageUrl}
							value={focalPoint}
							onChange={handleFocalPointChange}
						/>
					)}
				</PanelBody>
				<PanelBody title={__("Color Settings", "simple-card")}>
					<p>{__("Background Color", "simple-card")}</p>
					<ColorPalette
						value={bgColor}
						onChange={handleBgColorChange}
						disableCustomColors={true}
					/>
					<p>{__("Text Color", "simple-card")}</p>
					<ColorPalette
						value={textColor}
						onChange={handleTextColorChange}
						disableCustomColors={true}
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
