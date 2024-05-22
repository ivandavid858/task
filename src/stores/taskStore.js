import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useUserStore } from './userStore'

//const userStore = useUserStore()

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: null //tasks -> es el listado de las tareas
  }),

  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase //Mas adelante, donde esté task cambiar por profile si se quiere obtener los perfiles de usuario (esto en otra store)
        .from('tasks')
        .select('*')
        .order('id', { ascending: false })
      this.tasks = tasks
    },

    async addtask(title, description) {
      //console.log('UserId: ', await useUserStore().user.id)
      const { data, error } = await supabase.from('tasks').insert([
        {
          user_id: useUserStore().user?.id,
          title: title,
          is_complete: false,
          description: description
        }
      ])
      //console.log('My data tasks: ', useTaskStore().tasks)
      if (error) throw error
    }
  }
})
