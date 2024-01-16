import { useEffect, useState } from "react";
import { User } from "./utils";
import fetchUsers from "./api/fetchUsers";
import useDropdown from "./hooks/useDropdown";

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [users, setUsers] = useState<User[]>([]);

  const { inputProps, Dropdown, SelectedAvatars } = useDropdown({
    inputProps: {
      placeholder: "Add new user...",
      className:
        "flex-1 min-w-40 text-3xl h-16 py-4 px-2 focus-visible:outline-none transition-colors",
    },
    dropdownProps: {
      data: users.length > 0 ? users : [],
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { users } = await fetchUsers({
          limit: 10,
        });
        const propData = users.map((user) => ({
          name: `${user.firstName} ${user.lastName}`,
          image: user.image,
        }));
        setUsers(propData ? propData : []);
      } catch (error) {
        // Handle error appropriately
      }
    };

    getUsers();
  }, []);

  return (
    <div className="flex flex-col p-4 w-full gap-8 items-center">
      <h1 className="text-5xl font-bold text-blue-700">Pick Users</h1>
      <div className="relative w-3/4">
        <div className="flex-row inline-flex items-center w-full border-b-4 border-blue-700 flex-wrap">
          <SelectedAvatars />
          <div {...inputProps}></div>
        </div>
        <Dropdown />
      </div>
    </div>
  );
}

export default App;
