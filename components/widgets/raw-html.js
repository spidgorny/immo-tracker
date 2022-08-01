export function RawHtml({ children }) {
	return <div dangerouslySetInnerHTML={{ __html: children }} />;
}
