const VueQuickAcl = {
  install(Vue) {
    const bus = new Vue()
    let userPermissions = []
    let userIsAdmin = false

    Vue.prototype.$setUserPermissions = function (permissions, isAdmin = false) {
      userIsAdmin = isAdmin
      userPermissions = permissions
      bus.$emit('quick-acl:update')
    }

    Vue.mixin({
      methods: {
        $can(permission) {
          if (userIsAdmin) {
            return true
          }

          if (userPermissions.indexOf(permission) !== -1) {
            return true
          }
        }
      },
      beforeCreate() {
        this.$forceUpdate = this.$forceUpdate.bind(this)
        bus.$on('quick-acl:update', () => {
          this.$forceUpdate
        })
      },
      beforeDestroy() {
        bus.$off('quick-acl:update', this.$forceUpdate)
      }
    })
  }
}

export { VueQuickAcl }
