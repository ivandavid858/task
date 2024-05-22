import { defineStore } from 'pinia'
import { supabase } from '../supabase'

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
    }
  }
})
