import { defineStore } from 'pinia'
import { supabase } from '../supabase'
import { useUserStore } from './userStore'

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
      debugger
      console.log('UserId: ', await useUserStore().user?.id)
      const { data, error } = await supabase.from('tasks').insert([
        {
          user_id: useUserStore().user?.id,
          title: title,
          is_complete: false,
          description: description
        }
      ])
      if (error) {
        console.log('Error inserting task: ', error)
        throw error
      }
    },

    async updateTaskEdit(id, title, description) {
      console.log(id, ' ', title, ' ', description)
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: title,
          description: description
        })
        .match({ id: id })
    },

    async deleteTask(taskId) {
      const { data, error } = await supabase.from('tasks').delete().match({ id: taskId })
    }
  }
})
