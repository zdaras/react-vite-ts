import { memo, FC } from 'react';
import { useSelector } from 'react-redux';

import Select, { SelectItem } from '@/components/library/select';
import Button from '@/components/library/button';
import { Link } from '@/components/library/link';
import { LogoutIcon } from '@/components/icons';
import { appActions } from '@/store/ducks/app';
import { userActions, userSelectors } from '@/store/ducks/user';
import { useActions, useTranslation } from '@/hooks';

import { HeaderStyled, HeaderLeftMenu, UserIconStyled } from './header-styled';

const UserIcon = () => (
	<UserIconStyled>
		<img src="https://freesvg.org/img/abstract-user-flat-1.png" alt="user" width="50px" />
	</UserIconStyled>
);

export const Header: FC = () => {
	const { t, i18n, lang } = useTranslation();
	const isLoggedIn = useSelector(userSelectors.isLoggedIn);
	const [themeSwitchAction, logout] = useActions([appActions.themeSwitchAction, userActions.logout]);

	return (
		<HeaderStyled>
			<HeaderLeftMenu>
				<Button buttonType="text" inline onClick={themeSwitchAction}>
					{t('DARK')}
				</Button>
				<Button inline buttonType="text" active={lang === 'en-US'} onClick={() => i18n.changeLanguage('en-US')}>
					EN
				</Button>
				<Button inline buttonType="text" active={lang === 'ka'} onClick={() => i18n.changeLanguage('ka')}>
					KA
				</Button>
			</HeaderLeftMenu>

			{isLoggedIn ? (
				<Select borderless padding="0" dropdownType="dropdown" Trigger={UserIcon}>
					<SelectItem active onClick={logout}>
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<span style={{ marginRight: '12px' }}>{t('Logout')}</span>
							<LogoutIcon />
						</span>
					</SelectItem>
				</Select>
			) : (
				<Link to="/login">
					<Button inline buttonType="text" text="Login" />
				</Link>
			)}
		</HeaderStyled>
	);
};

export default memo(Header);
