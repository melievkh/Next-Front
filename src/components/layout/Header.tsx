import { useAppDispatch } from '@/common/store';
import { GiBrightExplosion } from 'react-icons/gi';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useGetMeQuery } from '@/services/user.service';
import { authActions } from '@/common/store/slices/auth.slice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery({});
  const user = data?.result;

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div className="w-[100%] h-16 fixed top-0 pl-8 pr-8 flex justify-between items-center shadow-sm bg-white">
      <div className="flex items-center gap-3">
        <GiBrightExplosion size={30} />
        <h1 className="font-bold text-[30px]">Next</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="text-md">{user?.email}</h1>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
