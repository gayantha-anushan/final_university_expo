import * as React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({title , navigation}) => {
  const _goBack = () => navigation.navigate("DrawerContainer");

  const _handleSearch = () => console.log('Searching');


return (
    <Appbar.Header >
      {/* <Appbar.BackAction onPress={_goBack} /> */}
      <Appbar.Action onPress={()=>navigation.openDrawer()} icon="view-list" />
      <Appbar.Content title={title}  />
      <Appbar.Action icon="magnify" onPress={_handleSearch} />
    </Appbar.Header>
  );
};

export default Header;