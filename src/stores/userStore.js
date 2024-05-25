import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    profile: null
  }),

  actions: {
    async fetchUser() {
      const result = await supabase.auth.getUser()
      console.log(result)
      this.user = result.data.user
      if (this.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .match({ user_id: this.user.id })

        if (profile) this.profile = profile[0]
        console.log('User in store: ' + this.user)
        console.log('Profile in store: ' + this.profile)
      }
    },

    async signInWithEmail(email, password) {
      //Inicia la sesión
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      console.log('Data:  ', data)
      if (data.user) {
        this.user = data.user
        //console.log(this.user)
        //Obtiene el perfil del usuario logueado
        const { data: profile } = await supabase
          .from('profiles')
          .select()
          .match({ user_id: this.user.id })
        if (profile) this.profile = profile[0]
        console.log('profile in store: ', profile)
      }
      if (data?.user) {
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
