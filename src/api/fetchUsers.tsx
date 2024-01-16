import { FetchUsersProps, fetchedUsersType } from "../utils";

/**
 * Fetches users from the API.
 *
 * @param {FetchUsersProps} [options] - Optional parameters for fetching users.
 * @param {number} [options.limit=10] - The maximum number of users to fetch.
 * @return {Promise<User[]>} - A promise that resolves to an array of user objects.
 */
const fetchUsers = async ({
  limit = 10,
}: FetchUsersProps = {}): Promise<fetchedUsersType> => {
  try {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data as fetchedUsersType;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};

export default fetchUsers;
