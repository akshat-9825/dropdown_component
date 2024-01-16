export interface User {
  id: number;
  name: string;
  email: string;
}

export interface FetchUsersProps {
  limit?: number;
}

interface AvatarProps {
  name: string;
  onRemove?: () => void;
}

/**
 * Renders an avatar component.
 *
 * @param {string} name - The name of the user.
 * @return {JSX.Element} - The rendered avatar component.
 */
export const Avatar = ({ name, onRemove }: AvatarProps) => (
  <div className="flex items-center space-x-2 relative">
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
      {name[0].toUpperCase()}
    </div>
    <span>{name}</span>
    {onRemove && (
      <span
        className="absolute top-0 right-0 cursor-pointer p-1 rounded-full"
        onClick={onRemove}>
        x
      </span>
    )}
  </div>
);
