const validatePermission = (userPermission, requiredPermission) =>
  userPermission & requiredPermission

export {
  validatePermission,
}
