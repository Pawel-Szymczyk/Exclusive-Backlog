import {useEffect} from 'react';
// import {BacklogType} from '../types/BacklogType';
import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IBacklog} from '../models/Backlog';

const useHomeBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<
    RootStackParamList,
    'HomeBacklogs',
    undefined
  > = useNavigation();

  const {backlogs, fetchingBacklogs, fetchBacklogs} = useBacklogViewModel();

  useEffect(() => {
    fetchBacklogs();
  }, []);

  // const onPressBacklogItem = (backlog: BacklogType) => {
  const onPressBacklogItem = (backlog: IBacklog) => {
    navigation.navigate('Backlog', {backlog});
  };

  const onPressCreate = (): void => {
    navigation.navigate('NewBacklog');
  };

  return {
    backlogs,
    fetchingBacklogs,
    onPressBacklogItem,
    onPressCreate,
  };
};

export default useHomeBacklogViewController;
