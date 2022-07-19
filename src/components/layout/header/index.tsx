import { memo, FC } from 'react';

import Select, { SelectItem } from '@/components/library/select';
import Button from '@/components/library/button';
import { Link } from '@/components/library/link';
import { LogoutIcon } from '@/components/icons';
import { appStore } from '@/store/app';
import { userStore, userSelectors } from '@/store/user';
import { useTranslation } from '@/hooks';

import { HeaderStyled, HeaderLeftMenu, UserIconStyled } from './header-styled';

const UserIcon = () => (
	<UserIconStyled>
		<img src="https://freesvg.org/img/abstract-user-flat-1.png" alt="user" width="50px" />
	</UserIconStyled>
);

export const Header: FC = () => {
	const { t, i18n, lang } = useTranslation();
	const isLoggedIn = userStore(userSelectors.isLoggedIn);
	const logout = userStore(store => store.logout);
	const themeSwitch = appStore(store => store.themeSwitch);

	return (
		<HeaderStyled>
			<HeaderLeftMenu>
				<Button buttonType="text" inline onClick={themeSwitch}>
					{t('DARK')}
				</Button>
				<Button inline buttonType="text" active={lang === 'en-US'} onClick={() => i18n.changeLanguage('en-US')}>
					EN
				</Button>
				<Button inline buttonType="text" active={lang === 'ka'} onClick={() => i18n.changeLanguage('ka')}>
					KA
				</Button>
				<Link to="/posts">
					<Button inline buttonType="text" text="POSTS" padding="0 20px 0 0" />
				</Link>
			</HeaderLeftMenu>

			<div>
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
			</div>
		</HeaderStyled>
	);
};

export default memo(Header);
