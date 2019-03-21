import storage from '@/utils/storage';
import { LOGIN_URL } from '@/utils/constants';

function getAuthData(data1) {
    const newArr = filterMenu(data1).sort((a, b) => a.sortFlag - b.sortFlag);
    return formatter(newArr, 0);
}
function filterMenu(data) {
    // 将首页过滤掉
    return data.filter(
        item => item.level <= 2 && item.resourceUrl !== '/' && item.resourceUrl !== '/indexPage'
    );
}
function removeInspector(itemPath) {
    const isInspector = /^\/inspector\/(\w+\/?)+$/.test(itemPath);
    if (isInspector) {
        return itemPath.replace('/inspector', '')
    } else {
        return `${LOGIN_URL}${itemPath}`;
    }

};

function formatter(data, parentId) {
    const itemArr = [];
    for (let i = 0; i < data.length; i += 1) {
        const node = data[i];
        // 如果level是3的话,是功能页面,并不展示
        if (Number(node.parentId) === Number(parentId) || Number(node.pid) === Number(parentId)) {
            // if (!isInspector) {
            const newNode = {
                icon: node.iconUrl,
                id: node.id,
                name: node.name,
                path: removeInspector(node.resourceUrl),
                authority: true,
                hideInMenu: false, // level的等级大于2的话为功能权限
                children: formatter(data, node.id),
            };
            itemArr.push(newNode);
            // }
        }
    }
    return itemArr;
}
export default {
    namespace: 'menu',

    state: {
        menuData: [],
    },

    effects: {
        *getMenu(_, { put }) {
            const routeData = storage.getUserAuth() || [];
            const menuData = getAuthData(routeData) || [];
            yield put({
                type: 'saveMenu',
                payload: { menuData },
            });
        },
    },

    reducers: {
        saveMenu(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
