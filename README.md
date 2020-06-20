# Vue Quick ACL

A simple vue plugin to check and permissions to the frontend for ACL (Access-Control List) / RBAC (Role Based Access Control) systems.

## Features

- Global $can function
- Reactive changes of permissions
- Ability to define an 'admin' which will allow any call to $can

## Project setup

```
npm install vue-quick-acl
```

## Usage

```javascript
// main.js or component
import Vue from 'vue'
import VueQuickAcl from 'vue-quick-acl'

Vue.use(VueQuickAcl)
```

```html
<script>
  // Login.vue

  export default {
    methods: {
      login() {
        myApi.login()
          .then(({user}) => {
            this.$setUserPermissions(user.permissions)

            // check and set admin
            // if(user.isAdmin) this.$setUserPermissions([], true) 
          })  
      }
    } 
  }
</script>
```

```html
// Component.vue
<template>
  <div>
    <button v-if="$can('post.delete')">Delete</button
  </div>
</template>
```

## Api

#### $setUserPermissions(permissions [array], isAdmin [boolean])

Set's the permissions and whether the user is admin.

- `permissions` - Array, array of permission strings i.e. `['task.delete', 'task.complete']`
- `isAdmin` - Boolean, if the user is admin all calls to $can() will return true. default `false`

#### $can(permission [string])

Returns true / false if the current user has given permission.

- `permission` - permission that we are checking i.e. `'order.view'` or `'list comments'`

<a href="https://wrabit.github.io/vue-quick-acl" target="_blank">Demo</a>

