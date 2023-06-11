import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {IBacklog, IQRCodeScanner} from '../features/backlog/Backlog';
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

  const [qrCodeScanner, setQRCodeScanner] = useState(false);

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

  const onQRCodeScanned = (qrCodeScanner: IQRCodeScanner) => {
    console.log(qrCodeScanner.name);
    setQRCodeScanner(false);

    // TODO: check here if backlog exist in db if not redirect to create new backlog and fill in inputs given by qr code.

    dispatch(resetStatus());
    navigation.navigate('Backlog', {name: qrCodeScanner.name, id: qrCodeScanner.id});
  };

  return {
    qrCodeScanner,
    setQRCodeScanner,
    status,
    backlogs,
    onPressBacklogItem,
    onPressCreate,
    onQRCodeScanned,
  };
};

export default useHomeBacklogViewController;
