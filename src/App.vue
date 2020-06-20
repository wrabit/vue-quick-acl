<script>
  import Vue from 'vue'
  import { VueQuickAcl } from './VueQuickAcl'

  Vue.use(VueQuickAcl)

  export default {
    name: 'Demo',
    data() {
      return {
        activeUser: 0,
        permissions: [
          'post.view',
          'post.create',
          'post.update',
          'post.delete',
          'post.comment'
        ],
        users: [
          {
            first_name: 'Bill',
            isAdmin: false,
            permissions: [
              'post.view',
              'post.comment'
            ]
          },
          {
            first_name: 'Jane',
            isAdmin: false,
            permissions: [
              'post.view',
              'post.comment',
              'post.update',
              'post.delete'
            ]
          }
        ]
      }
    },
    watch: {
      activeUser: {
        immediate: true,
        handler(val) {
          this.$setUserPermissions(this.users[val].permissions, this.users[val].isAdmin)
        }
      },
      users: {
        deep: true,
        handler() {
          this.$setUserPermissions(this.users[this.activeUser].permissions, this.users[this.activeUser].isAdmin)
        }
      }
    },
    methods: {
      userHasPermission(index, permission) {
        return this.users[index].permissions.indexOf(permission) !== -1
      },
      updateUserPermission(index, permission) {
        if (this.userHasPermission(index, permission)) {
          let newPermissions = this.users[index].permissions.filter(perm => perm !== permission)
          this.$set(this.users[index], 'permissions', newPermissions)
        } else {
          this.users[index].permissions.push(permission)
        }
      }
    }
  }
</script>

<template>
  <div id="app">
    <h1>Vue Quick Acl</h1>

    <h3>Users:</h3>

    <template v-for="(user, index) in users">
      <div :key="user.first_name" class="user-list">
        <p>
          <label>
            <strong>{{ user.first_name }}</strong>
            <input type="radio" name="activeUser" v-model="activeUser" :value="index" />
            <small v-if="activeUser === index">active</small>
          </label>
        </p>

        <label>
          <p>
            <input type="checkbox"
                   v-model="users[index].isAdmin"
                   :checked="userHasPermission(index, permission)"
                   :disabled="activeUser !== index"
            />
            Admin
          </p>
        </label>

        <div v-for="permission in permissions" :key="permission">
          <label>
            <input type="checkbox"
                   :checked="userHasPermission(index, permission)"
                   :disabled="activeUser !== index || user.isAdmin"
                   @click="updateUserPermission(index, permission)" />
            {{ permission }}
          </label>
        </div>
      </div>
    </template>

    <div class="post">
      <button type="button" v-if="$can('post.create')">Create New</button>

      <small class="entity">POST:</small>

      <template v-if="$can('post.view')">
        <h2>Lorem ipsum dolor sit amet</h2>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.</p>

        <a href="#" class="delete" v-if="$can('post.delete')">Delete Post</a>
        <div><a href="#" v-if="$can('post.comment')">Comment</a></div>
        <div><a href="#" v-if="$can('post.update')">Edit Post</a></div>
      </template>
    </div>

  </div>
</template>

<style>
  #app {
    max-width: 600px;
    margin: 0 auto;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin-top: 60px;
  }

  table {
    width: 100%;
    text-align: left;
  }

  .post {
    margin-top: 40px;
    border: 2px solid #ccc;
    border-radius: 5px;
    padding: 2rem;
    text-align: left;
  }

  .post .entity {
    color: #aaa;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

  .post button {
    float: right
  }

  .post a.delete {
    float: right;
    color: red;
  }

  .user-list {
    display: inline-block;
    width: 50%;
  }
</style>