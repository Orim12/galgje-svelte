import { FieldHook } from 'payload/types';

const isValidUrl = (): FieldHook => ({ value, originalDoc, data }) => {
    if (!value) return false;
    const url = value
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    return urlRegex.test(url);
};

export default isValidUrl