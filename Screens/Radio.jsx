import * as React from 'react';
import { View  , Text} from 'react-native';
import { RadioButton } from 'react-native-paper';

const MyComponent = () => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      /> 
      <RadioButton
        value="second"
        status={ checked === 'second' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('second')}
      />
      <RadioButton
        value="third"
        status={ checked === 'third' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('third')}
      />
      <RadioButton
        value="forth"
        status={ checked === 'forth' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('forth')}
      />
      <RadioButton
        value="fifth"
        status={ checked === 'fifth' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('fifth')}
      />
    </View>
  );
};

export default MyComponent;