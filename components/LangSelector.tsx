import SelectDropdown from 'react-native-select-dropdown';
import { COUNTRIES, countryToLocale } from '../utils/constants';
import { useSetRecoilState } from 'recoil';
import { localeState } from './Atoms';

function LangSelector() {
  const setLocaleState = useSetRecoilState(localeState);
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
      onSelect={selectedItem => {
        setLocaleState(countryToLocale[selectedItem]);
      }}
      buttonTextAfterSelection={selectedItem => {
        return selectedItem;
      }}
      rowTextForSelection={item => {
        return item;
      }}
    />
  );
}

export default LangSelector;
