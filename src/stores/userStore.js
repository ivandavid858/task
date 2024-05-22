// /store/user.js

import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.getUser()
      this.user = user
    },
    async signInWithEmail(email, password) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      //console.log('User de useStore: ', data.user.value)
      if (data?.user) {
        this.user = data.user
        return { success: true }
      } else {
        return { success: false, error }
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
    },
    async signUp(email, password) {
      const { data, error } = await supabase.auth.signUp({
        //usamos supabase version 2
        email: email,
        password: password
      })
      // if (error) throw error
      // if (user) this.user = user
      if (data?.user) {
        this.user = data.user
        return { success: true }
      } else {
        return { success: false, error }
      }
    },
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'user',
          storage: localStorage
        }
      ]
    }
  }
})
