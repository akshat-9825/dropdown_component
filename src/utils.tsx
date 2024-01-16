import classNames from "classnames";

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
  className?: string;
  imageClassName?: string;
  strikeThrough?: boolean;
}

/**
 * Renders an avatar component.
 *
 * @param {string} name - The name of the user.
 * @return {JSX.Element} - The rendered avatar component.
 */
export const Avatar = ({
  name,
  onRemove,
  className,
  imageClassName,
  strikeThrough = false,
}: AvatarProps) => (
  <div
    className={classNames("flex items-center space-x-2 relative", className)}>
    <div
      className={classNames(
        "w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center",
        imageClassName
      )}>
      {name[0].toUpperCase()}
    </div>
    <span className={classNames({ "line-through": strikeThrough })}>
      {name}
    </span>
    {onRemove && (
      <span
        className="absolute top-1/2 right-2 -translate-y-2/4 cursor-pointer p-1 rounded-full"
        onClick={onRemove}>
        x
      </span>
    )}
  </div>
);
