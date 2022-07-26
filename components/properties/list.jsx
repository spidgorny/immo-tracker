import {fetcher} from "../../lib/common/http.ts";
import useSWR from 'swr'


export function PropertiesList() {

	const {data} = useSWR('/api/properties/list', fetcher);

	return <div>
		<pre>{JSON.stringify(data, null, 2)}</pre>
	</div>

}
