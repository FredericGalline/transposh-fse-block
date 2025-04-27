import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	RichText,
	BlockControls,
	BlockAlignmentToolbar,
} from "@wordpress/block-editor";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import "./editor.scss";

import IconArt from "../../../assets/js/icons/iconArt";
import IconBag from "../../../assets/js/icons/iconBag";
import IconBed from "../../../assets/js/icons/iconBed";
import IconHost from "../../../assets/js/icons/iconHost";
import IconMug from "../../../assets/js/icons/iconMug";
import IconSnow from "../../../assets/js/icons/iconSnow";
import IconSwimmingPool from "../../../assets/js/icons/iconSwimmingPool";
import IconWifi from "../../../assets/js/icons/iconWifi";
import IconPark from "../../../assets/js/icons/iconPark";

// Liste des icônes disponibles
const iconOptions = [
	{ value: "art", svg: <IconArt /> },
	{ value: "bag", svg: <IconBag /> },
	{ value: "bed", svg: <IconBed /> },
	{ value: "host", svg: <IconHost /> },
	{ value: "mug", svg: <IconMug /> },
	{ value: "snow", svg: <IconSnow /> },
	{ value: "pool", svg: <IconSwimmingPool /> },
	{ value: "wifi", svg: <IconWifi /> },
	{ value: "park", svg: <IconPark /> },
];

export default function Edit({ attributes, setAttributes }) {
	const { selectedIcon, serviceText, blockAlignment } = attributes;
	const blockProps = useBlockProps({
		className: blockAlignment ? `align-${blockAlignment}` : undefined,
	});

	const handleIconClick = (iconValue) => {
		setAttributes({ selectedIcon: iconValue });
	};

	return (
		<>
			<BlockControls>
				<BlockAlignmentToolbar
					value={blockAlignment}
					onChange={(newAlign) => setAttributes({ blockAlignment: newAlign })}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("Icon Settings", "service-card")}>
					<div className="icon-grid">
						{iconOptions.map((option) => (
							<div
								key={option.value}
								className={`icon-item ${
									selectedIcon === option.value ? "selected" : ""
								}`}
								onClick={() => handleIconClick(option.value)}
							>
								{option.svg}
							</div>
						))}
					</div>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps} style={{ textAlign: blockAlignment || "center" }}>
				<div className="icon-container">
					{iconOptions.find((option) => option.value === selectedIcon)?.svg}
				</div>
				<RichText
					tagName="p"
					value={serviceText}
					placeholder={__("Enter text here", "service-card")}
					onChange={(newText) => setAttributes({ serviceText: newText })}
				/>
			</div>
		</>
	);
}
