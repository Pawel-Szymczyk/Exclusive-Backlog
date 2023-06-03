import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {AppDispatch} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, StoreType} from '../features/backlog/BacklogStateType';
import {BacklogAction} from '../features/backlog/backlogSlice';
import {Status} from '../types/Status';

const useBacklogViewController = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList, 'Backlog', undefined> =
    useNavigation();
  const route = useRoute();

  const dispatch = useDispatch<AppDispatch>();
  const {status, backlog}: BacklogStateType = useSelector((state: StoreType) => state.backlog);
  const {fetchBacklogById} = BacklogAction;

  useEffect(() => {
    const {id, name} = route.params as RootStackParamList['Backlog'];
    if (id !== undefined) {
      if (status === Status.IDLE) {
        dispatch(fetchBacklogById(id));
      }
    }
  }, [status, dispatch]);

  return {
    status,
    backlog,
  };
};

export default useBacklogViewController;
