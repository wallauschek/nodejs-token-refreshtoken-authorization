const validatePermission = (userPermission, requiredPermission) =>
  userPermission & requiredPermission

module.exports = {
  validatePermission,
}
