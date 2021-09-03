interface PermissionsProps {
  manageUsers: number;
  getExams: number;
  getPersonalInfo: number;
  getMedicines: number;
}

const permissions: PermissionsProps = {
  manageUsers: 1, // 1
  getExams: 1 << 1, // 10 2
  getPersonalInfo: 1 << 2, // 100 4
  getMedicines: 1 << 3, // 1000 8
}

export {
  permissions
}
