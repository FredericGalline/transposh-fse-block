import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save({ attributes }) {
	const { title, content, imageUrl, bgColor, textColor, focalPoint } =
		attributes;

	return (
		<div
			{...useBlockProps.save()}
			style={{
				backgroundColor: bgColor,
				color: textColor,
				borderRadius: "8px",
				overflow: "hidden",
				maxWidth: "300px",
				border: "1px solid #ddd",
			}}
		>
			{/* Image */}
			{imageUrl && (
				<div
					style={{
						width: "100%",
						height: "200px",
						backgroundImage: `url(${imageUrl})`,
						backgroundSize: "cover",
						backgroundPosition: `${focalPoint?.x * 100}% ${
							focalPoint?.y * 100
						}%`,
					}}
				></div>
			)}

			{/* Titre */}
			<RichText.Content
				tagName="h3"
				value={title}
				className="has-large-font-size"
				style={{
					margin: "10px 15px",
					color: textColor,
					textAlign: "left",
				}}
			/>

			{/* Contenu */}
			<RichText.Content
				tagName="p"
				value={content}
				style={{
					margin: "0 15px 15px",
					color: textColor,
					textAlign: "left",
				}}
			/>
		</div>
	);
}
