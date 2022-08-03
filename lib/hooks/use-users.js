import useSWR from "swr";
import { fetcher } from "../../shared/helper/helpers";

export const useEmployees = () => {
	const employeesApi = `/api/human-resources/employees/all-employees`;
	let { data: employees } = useSWR(employeesApi, fetcher);
	employees = employees?.results ?? [];
	return employees;
};

export const useUsers = () => {
	const apiUrl = "/api/user/list";
	let { data: users } = useSWR(apiUrl, fetcher);
	users = users?.results ?? [];
	return users;
};

export function useRoles() {
	const { data: roles } = useSWR(`/api/user/role`, fetcher);
	return roles?.results ?? [];
}

export function useUser(email) {
	const { data: userInfo } = useSWR(`/api/user/${email}`, fetcher);
	let roleName = userInfo?.user.role_name;
	return { ...userInfo?.user, roleName };
}
