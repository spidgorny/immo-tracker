import Link from "next/link";
import { useRouter } from "next/router.js";
import PropTypes from "prop-types";
import cn from "classnames";

export function ShowTabs(props) {
	const router = useRouter();
	const current = props.current ?? router.query[props.name] ?? Object.keys(props.options)[0];
	let [referer, qs] = router.asPath.split("?");
	qs = new URLSearchParams(qs);
	const navTypeClass = props.navType ?? 'nav-tabs';

	return (
		<ul className={cn("nav", navTypeClass)}>
			{Object.entries(props.options).map(([key, val]) => {
				qs.set(props.name, key);
				return (
					<li className={cn("nav-item",
						props.liClassName,
						{ "active": current === key })} key={key}>
						<Link href={`${referer}?${qs}`}>
							<a
								className={`nav-link ${current === key ? "active" : ""} ${
									(props?.disabled ? props?.disabled(key) : false) ? "disabled" : ""
								} ${props.linkClassName}`}
								aria-current="page"
								onContextMenu={(e) => {
									if (!props.onRightClick) {
										return;
									}
									e.preventDefault();
									props.onRightClick(key);
								}}
							>
								{val}
							</a>
						</Link>
					</li>
				);
			})}
			{props.children}
		</ul>
	);
}

ShowTabs.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.object.isRequired,
	current: PropTypes.string,
	children: PropTypes.element,
	liClassName: PropTypes.string,
	linkClassName: PropTypes.string,
	navType: PropTypes.string,
};
