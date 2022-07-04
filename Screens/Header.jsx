import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({title , navigation , func , icon}) => {
  const _goBack = () => navigation.navigate("DrawerContainer");

  const _handleSearch = () => console.log('Searching');


return (
    <Appbar.Header >
      {/* <Appbar.BackAction onPress={_goBack} /> */}
      <Appbar.Action onPress={()=>navigation.openDrawer()} icon="view-list" />
      <Appbar.Content title={title}  />
      <Appbar.Action icon={icon} onPress={func} />
    </Appbar.Header>
  );
};

export default Header;