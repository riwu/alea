import { Alert } from 'react-native';

const handleError = e => Alert.alert(e.message, (e.response || {}).data);

export default handleError;
