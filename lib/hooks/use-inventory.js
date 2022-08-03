import useSWR from "swr";
import { fetcher } from "../../shared/helper/helpers";

export const useInventory = () => {
	const inventoryApi = `/api/inventory/normal`;
	let { data: inventory } = useSWR(inventoryApi, fetcher);
	inventory = inventory?.results ?? [];
	return inventory;
};
