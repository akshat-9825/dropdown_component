export interface User {
  id: number;
  name: string;
  email: string;
}

export interface FetchUsersProps {
  limit?: number;
}

export const Avatar = ({ name }: { name: string }) => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
      {name[0].toUpperCase()}
    </div>
    <span>{name}</span>
  </div>
);
