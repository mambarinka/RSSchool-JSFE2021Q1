import React, { FunctionComponent } from 'react';

import { AppHeaderView } from './AppHeaderView';

export interface IAppHeaderViewProps {
  active: any;
  setActive?: any;
}
export const AppHeader: FunctionComponent<IAppHeaderViewProps> = ({ active, setActive }) => (
  <AppHeaderView active={active} setActive={setActive} />
);
