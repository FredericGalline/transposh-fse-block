import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	ColorPalette,
	FocalPointPicker,
} from "@wordpress/block-editor";
import { PanelBody, Button } from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const {
		title,
		content,
		imageUrl,
		bgColor = "#ffffff",
		textColor = "#000000",
		focalPoint = { x: 0.5, y: 0.5 },
	} = attributes;

	// Gestion des changements
	const handleImageSelect = (media) => {
		if (media && media.url) {
			setAttributes({ imageUrl: media.url });
		}
	};

	const handleBgColorChange = (color) => {
		setAttributes({ bgColor: color || "#ffffff" });
	};

	const handleTextColorChange = (color) => {
		setAttributes({ textColor: color || "#000000" });
	};

	const handleFocalPointChange = (newFocalPoint) => {
		setAttributes({ focalPoint: newFocalPoint });
	};

	return (
		<div
			{...useBlockProps()}
			style={{
				backgroundColor: bgColor,
				color: textColor,
				borderRadius: "20px",
				overflow: "hidden",
				maxWidth: "300px",
				border: "0px solid #ddd",
				padding: 0,
			}}
		>
			{/* Image */}
			{imageUrl && (
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "300px",
						paddingTop: "56.25%", // Aspect ratio 16:9
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
							backgroundSize: "cover",
							backgroundPosition: `${focalPoint.x * 100}% ${
								focalPoint.y * 100
							}%`, // Utilisation de focalPoint
						}}
					></div>
				</div>
			)}

			{/* Titre */}
			<RichText
				tagName="h3"
				placeholder={__("Card Title", "card-vertical")}
				value={title}
				onChange={(newTitle) => setAttributes({ title: newTitle })}
				className="has-large-font-size"
				style={{
					margin: "10px 20px",
					color: textColor,
					textAlign: "left",
				}}
			/>

			{/* Contenu */}
			<RichText
				tagName="p"
				placeholder={__("Card content goes here.", "card-vertical")}
				value={content}
				onChange={(newContent) => setAttributes({ content: newContent })}
				style={{
					margin: "0 20px 20px",
					color: textColor,
					textAlign: "left",
				}}
			/>

			{/* Panneaux d'inspection */}
			<InspectorControls>
				<PanelBody title={__("Card Settings", "card-vertical")}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={handleImageSelect}
							allowedTypes={["image"]}
							render={({ open }) => (
								<Button onClick={open} isPrimary>
									{__("Choose Image", "card-vertical")}
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{imageUrl && (
						<FocalPointPicker
							label={__("Focal Point", "card-vertical")}
							value={focalPoint}
							onChange={handleFocalPointChange}
						/>
					)}
					<p>{__("Background Color", "card-vertical")}</p>
					<ColorPalette
						value={bgColor}
						onChange={handleBgColorChange}
						enableAlpha
					/>
					<p>{__("Text Color", "card-vertical")}</p>
					<ColorPalette
						value={textColor}
						onChange={handleTextColorChange}
						enableAlpha
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
