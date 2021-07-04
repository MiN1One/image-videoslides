import { memo } from 'react';

import DropInput from '../../components/DropInput/DropInput';
import Logo from '../../components/UI/Logo';
import './MainView.scss';

const MainView = () => (
  <main className="mainview">
    <Logo />
    <DropInput />
  </main>
);

export default memo(MainView);
