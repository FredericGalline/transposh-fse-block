import { useBlockProps, RichText } from "@wordpress/block-editor";
import IconArt from "../../../assets/js/icons/iconArt";
import IconBag from "../../../assets/js/icons/iconBag";
import IconBed from "../../../assets/js/icons/iconBed";
import IconHost from "../../../assets/js/icons/iconHost";
import IconMug from "../../../assets/js/icons/iconMug";
import IconSnow from "../../../assets/js/icons/iconSnow";
import IconSwimmingPool from "../../../assets/js/icons/iconSwimmingPool";
import IconWifi from "../../../assets/js/icons/iconWifi";
import IconPark from "../../../assets/js/icons/iconPark";

// Dictionnaire des icônes
const iconOptions = {
	art: <IconArt />,
	bag: <IconBag />,
	bed: <IconBed />,
	host: <IconHost />,
	mug: <IconMug />,
	snow: <IconSnow />,
	pool: <IconSwimmingPool />,
	wifi: <IconWifi />,
	park: <IconPark />,
};

export default function save({ attributes }) {
	const { selectedIcon, serviceText, blockAlignment } = attributes;
	const blockProps = useBlockProps.save({
		className: blockAlignment ? `align-${blockAlignment}` : undefined,
	});

	return (
		<div {...blockProps} style={{ textAlign: blockAlignment || "center" }}>
			<div className="icon-container">{iconOptions[selectedIcon]}</div>
			<RichText.Content tagName="p" value={serviceText} />
		</div>
	);
}
