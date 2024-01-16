import { FetchUsersProps, User } from "../utils";

const fetchUsers = async ({ limit = 10 }: FetchUsersProps = {}): Promise<
  User[]
> => {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data as User[];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};

export default fetchUsers;
