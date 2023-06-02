import {useEffect} from 'react';
// import {BacklogType} from '../types/BacklogType';
// import useBacklogViewModel from '../viewmodels/useBacklogViewModel';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IBacklog} from '../models/Backlog';
import {AppDispatch} from '../store/store';
import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, Status, StoreType} from '../types/BacklogStateType';
import {BacklogAction} from '../store/backlogSlice';

const useHomeBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'HomeBacklogs', undefined> =
    useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  const {status, backlogs}: BacklogStateType = useSelector((state: StoreType) => state.backlog);

  const {fetchBacklogs} = BacklogAction;

  // const {backlogs, fetchingBacklogs, fetchBacklogs} = useBacklogViewModel();

  useEffect(() => {
    // fetchBacklogs();
    if (status === Status.IDLE) {
      dispatch(fetchBacklogs());
    }
  }, [status, dispatch]);

  // const onPressBacklogItem = (backlog: BacklogType) => {
  const onPressBacklogItem = (backlog: IBacklog) => {
    navigation.navigate('Backlog', {name: backlog.name, id: backlog.id});
  };

  const onPressCreate = (): void => {
    navigation.navigate('NewBacklog');
  };

  return {
    backlogs,
    // fetchingBacklogs,
    onPressBacklogItem,
    onPressCreate,
  };
};

export default useHomeBacklogViewController;
