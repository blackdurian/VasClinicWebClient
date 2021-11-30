import simpleRestProvider from 'ra-data-simple-rest';
import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    GET_MANY,
    GET_MANY_REFERENCE,
} from 'react-admin';

//https://stackoverflow.com/questions/50724915/is-it-possible-to-have-multiple-dataproviders-in-react-admin
const dataProviders = [
    {
        dataProvider: simpleRestProvider('http://localhost:3000'),
        resources: ['users'],
    },
    {
        dataProvider: simpleRestProvider('http://localhost:3002'),
        resources: ['roles'],
    }
];

export default (type, resource, params) => {
    const dataProviderMapping = dataProviders.find((dp) =>
        dp.resources.includes(resource));

    const mappingType = {
        [GET_LIST]: 'getList',
        [GET_ONE]: 'getOne',
        [GET_MANY]: 'getMany',
        [GET_MANY_REFERENCE]: 'getManyReference',
        [CREATE]: 'create',
        [UPDATE]: 'update',
        [UPDATE_MANY]: 'updateMany',
        [DELETE]: 'delete',
    };

    return dataProviderMapping.dataProvider[mappingType[type]](resource, params);
};