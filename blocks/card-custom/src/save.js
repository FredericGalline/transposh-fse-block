import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
	const {
		imageUrl,
		focalPoint = { x: 0.5, y: 0.5 },
		bgColor = "#f5f5f5", // Couleur de fond par défaut
		textColor = "#333333", // Couleur de texte par défaut
	} = attributes;

	const blockProps = useBlockProps.save({
		style: { maxWidth: "100%", margin: "0 auto" },
	});

	return (
		<div {...blockProps}>
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
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
