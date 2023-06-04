import {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import {Dialog, Text, Button} from 'react-native-paper';

interface DialogComponentProps {
  visible: boolean;
  title: string;
  message: string;
  onAcceptTitle: string;
  onDismissTitle: string;
  onAccept: () => void;
  onDismiss: () => void;
}

const DialogComponent = (props: DialogComponentProps) => {
  const {visible, title, message, onAcceptTitle, onAccept, onDismissTitle, onDismiss} = props;

  return (
    <Dialog visible={visible} onDismiss={onDismiss}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyMedium">{message}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onAccept}>{onAcceptTitle}</Button>
        <Button onPress={onDismiss}>{onDismissTitle}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const style = StyleSheet.create({});

export default forwardRef(DialogComponent);
