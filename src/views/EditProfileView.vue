<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { supabase } from '../supabase'
import { useUserStore } from '../stores/userStore.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const userProfile = userStore.profile
const src = ref(null)
const loading = ref(false)
const name = ref(userStore.profile ? userStore.profile.name : '')
const username = ref(userStore.profile ? userStore.profile.username : '')
const website = ref(userStore.profile ? userStore.profile.website : '')
const avatar_url = ref(userStore.profile ? userStore.profile.avatar_url : '')

const editProfile = async () => {
  console.log('name ', name.value)
  console.log('username ', username.value)
  console.log('website ', website.value)
  console.log('avatar_url ', avatar_url.value)
  await userStore.updateProfile({
    ...userStore.profile,
    name: name.value,
    username: username.value,
    website: website.value,
    avatar_url: avatar_url.value
  })
  await userStore.fetchUser()
  router.push({ path: '/profile' })
}

function randomChain() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * chars.length)
    result += chars.charAt(index)
  }
  return result
}

const uploadImage = async (e) => {
  const files = e.target.files
  try {
    loading.value = true
    if (!files || files.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files[0]
    const fileExt = file.name.split('.').pop()
    const randomName = randomChain()
    const filePath = `${randomName}.${fileExt}`

    let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError
    avatar_url.value = filePath
    await downloadImage(filePath)
  } catch (error) {
    alert('Edit Profile about 52: ' + error.message)
  } finally {
    loading.value = false
  }
}

const downloadImage = async (imgURL) => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(imgURL)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

onMounted(async () => {
  await userStore.fetchUser()
  await downloadImage(userStore.profile.avatar_url)
})
</script>

<template>
  <Header />
  <form
    @submit.prevent="editProfile"
    class="container my-5 mx-auto p-4 gap-4 border border-amber-400 rounded-xl"
  >
    <div class="mb-3">
      <label for="name" class="form-label text-amber-400 font-bold">Name:</label>
      <input type="text" id="name" v-model="name" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="username" class="form-label text-amber-400 font-bold">Username:</label>
      <input type="text" id="username" v-model="username" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="website" class="form-label text-amber-400 font-bold">Website:</label>
      <input type="text" id="website" v-model="website" class="form-control" />
    </div>
    <div class="mb-3">
      <label for="avatar" class="form-label text-amber-400 font-bold">Avatar:</label>
      <input type="file" id="avatar" @change="uploadImage" class="form-control" />
    </div>
    <img v-if="avatar_url" :src="src" class="w-100 mx-auto my-3" />
    <p v-if="loading" class="mb-3">Uploading image...</p>
    <button v-else type="submit" class="btn btn-primary">Save changes</button>
  </form>
  <Footer></Footer>
</template>

<style></style>
