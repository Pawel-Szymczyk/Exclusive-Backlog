import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useNavigation, useRoute} from '@react-navigation/native';
import useCategoryViewModel from '../viewmodels/useCategoryViewModel';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import {useEffect} from 'react';

const useBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'Backlog', undefined> =
    useNavigation();
  const route = useRoute();

  // const [backlogFormState, setBacklogFormState] = useState(initialBacklogFormState);
  const {
    backlogById,
    fetchBacklogById,
    fetchingBacklogByIdSuccess,
    fetchingBacklogByIdBacklogError,
    fetchingBacklogs,
  } = useBacklogViewModel();

  useEffect(() => {
    const {id, name} = route.params as RootStackParamList['Backlog'];

    fetchBacklogById(id);
  }, []);

  return {
    backlogById,
    fetchBacklogById,
  };
};

export default useBacklogViewController;
