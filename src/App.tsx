import { useEffect, useState } from "react";
import { User } from "./utils";
import fetchUsers from "./api/fetchUsers";
import useDropdown from "./hooks/useDropdown";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const { inputProps, Dropdown } = useDropdown({
    inputProps: {
      className:
        "w-full text-3xl py-4 px-2 focus-visible:outline-none focus-visible:transition-colors focus-visible:border-b-4 focus-visible:border-blue-700",
      type: "text",
      placeholder: "Add New User...",
    },
    dropdownProps: {
      data: ["Apples", "Bananas", "Avocados", "Pears", "Mangoes"],
    },
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers({ limit: 10 });
        setUsers(fetchedUsers);
      } catch (error) {
        // Handle error appropriately
      }
    };

    getUsers();
  }, []);

  console.log("Users:", users);

  return (
    <div className="flex flex-col p-4 w-full gap-8 items-center">
      <h1 className="text-5xl font-bold text-blue-700">Pick Users</h1>
      <div className="relative w-3/4">
        <input {...inputProps} />
        <Dropdown />
      </div>
    </div>
  );
}

export default App;
