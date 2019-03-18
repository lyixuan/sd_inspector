/** ***
 * name:菜单栏显示名字,pathname:对应url路径
 * 用于维护非route的权限，仅用于查看都维护了那些非route权限，这些权限会添加在在系统的用户权限里。
 * 建议path路径结构与route相同
 */
const urlPathMap = {
  '/skillCertification/certificationClose': {
    name: '认证关闭报名',
  },
  '/appeal/scoreAdjustDel': {
    name: '删除学分调整',
  },
  '/otherConfig/officialSet': {
    name: '文案编辑',
  },
};
export { urlPathMap };
