import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {AppDispatch} from '../app/store';
import {useDispatch, useSelector} from 'react-redux';
import {BacklogStateType, StoreType} from '../features/backlog/BacklogStateType';
import {BacklogAction} from '../features/backlog/backlogSlice';
import {Status} from '../types/Status';

const useBacklogViewController = () => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const navigation: NativeStackNavigationProp<RootStackParamList, 'Backlog', undefined> =
    useNavigation();
  const route = useRoute();

  const dispatch = useDispatch<AppDispatch>();
  const {status, backlog}: BacklogStateType = useSelector((state: StoreType) => state.backlog);
  const {fetchBacklogById, deleteBacklogById, resetStatus} = BacklogAction;

  useEffect(() => {
    const {id, name} = route.params as RootStackParamList['Backlog'];
    if (id !== undefined) {
      if (status === Status.IDLE) {
        dispatch(fetchBacklogById(id));
      }
    }
  }, [status, dispatch]);

  // confirmed block deletion
  const onAcceptDeleteClick = () => {
    setDeleteDialogVisible(false);

    const {id, name} = route.params as RootStackParamList['Backlog'];
    if (id !== undefined) {
      dispatch(deleteBacklogById(id));
      dispatch(resetStatus());
      navigation.goBack();
    }
  };

  const onUpdateBacklogClick = (backlogId: string | undefined) => {
    if (backlogId !== undefined) {
      // redirect
      dispatch(resetStatus());

      navigation.navigate('UpdateBacklog', {id: backlogId});
    } else {
      // TODO: return message that sth went wrong ?
    }
  };

  return {
    status,
    backlog,
    deleteDialogVisible,
    setDeleteDialogVisible,
    onAcceptDeleteClick,
    onUpdateBacklogClick,
  };
};

export default useBacklogViewController;
