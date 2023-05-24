import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useNavigation} from '@react-navigation/native';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';

const useBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'Backlog', undefined> =
    useNavigation();

  // const [backlogFormState, setBacklogFormState] = useState(initialBacklogFormState);
  const {} = useCategoryViewModel();

  return {};
};

export default useBacklogViewController;
