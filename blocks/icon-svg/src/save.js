import { useBlockProps } from "@wordpress/block-editor";
import { Icon } from "@wordpress/icons";

export default function save({ attributes }) {
	const {
		svgContent,
		width,
		svgColor,
		align,
		margin,
		padding,
		useBackground,
		backgroundColor,
		useCurrentColor,
	} = attributes;

	return (
		<div
			{...useBlockProps.save()}
			style={{
				width: `${width}px`,
				margin: `${margin}px`,
				padding: `${padding}px`,
				textAlign: align,
				backgroundColor: useBackground ? backgroundColor : "transparent",
			}}
		>
			{svgContent ? (
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
			) : (
				<Icon icon="star" />
			)}
		</div>
	);
}
