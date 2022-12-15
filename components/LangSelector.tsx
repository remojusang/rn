import SelectDropdown from 'react-native-select-dropdown';
import { COUNTRIES, countryToLocale } from '../utils/constants';
import { useUserState, useUserDispatch } from './UserContext';
function LangSelector() {
  const state = useUserState();
  const dispatch = useUserDispatch();
  return (
    <SelectDropdown
      data={COUNTRIES}
      defaultButtonText="language"
      buttonStyle={{
        maxHeight: 30,
        maxWidth: 100,
        borderRadius: 10,
      }}
      buttonTextStyle={{
        fontSize: 16,
      }}
      onSelect={(selectedItem, index) => {
        dispatch({
          type: 'SET_LOCALE',
          locale: countryToLocale[selectedItem],
        });
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        return item;
      }}
    />
  );
}

export default LangSelector;
