import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IBacklog} from '../features/backlog/Backlog';
import {AppDispatch} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, StoreType} from '../features/backlog/BacklogStateType';
import {BacklogAction} from '../features/backlog/backlogSlice';
import {Status} from '../types/Status';

const useHomeBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'HomeBacklogs', undefined> =
    useNavigation();

  const dispatch = useDispatch<AppDispatch>();

  const {status, backlogs}: BacklogStateType = useSelector((state: StoreType) => state.backlog);

  const {resetStatus, fetchBacklogs} = BacklogAction;

  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(fetchBacklogs());
    }
  }, [status, dispatch]);

  const onPressBacklogItem = (backlog: IBacklog) => {
    dispatch(resetStatus());

    navigation.navigate('Backlog', {name: backlog.name, id: backlog.id});
  };

  const onPressCreate = (): void => {
    navigation.navigate('NewBacklog');
  };

  return {
    status,
    backlogs,
    onPressBacklogItem,
    onPressCreate,
  };
};

export default useHomeBacklogViewController;
