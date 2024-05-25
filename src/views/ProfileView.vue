<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { supabase } from '../supabase'
import { onMounted, ref, reactive, toRefs, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const userProfile = userStore.profile

const src = ref(null)

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(userProfile.avatar_url)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}

onMounted(() => {
  if (userProfile) downloadImage()
})
</script>

<template>
  <Header />
  <div
    v-if="userProfile"
    class="container my-5 mx-auto p-4 gap-4 border border-amber-400 rounded-xl sm:flex-row"
  >
    <div class="rounded-circle h-5 w-5 overflow-hidden">
      <img
        width="90"
        height="90"
        :src="
          userProfile.avatar_url
            ? src
            : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        "
        alt=""
        class="object-cover object-center"
      />
    </div>
    <div class="flex flex-col">
      <h1 class="text-3xl font-bold">{{ userProfile.name }}</h1>
      <h2 class="text-2xl font-medium text-gray-400">@{{ userProfile.username }}</h2>
      <div class="flex flex-row items-center gap-1">
        <img
          width="80"
          height="80"
          src="https://img.freepik.com/free-icon/envelope_318-408141.jpg"
          alt=""
          class="w-4 h-4"
        />
        <p>{{ userProfile.email }}</p>
      </div>
      <div class="flex flex-row items-center gap-1">
        <img
          width="80"
          height="80"
          src="https://cdn-icons-png.flaticon.com/512/3119/3119186.png"
          alt=""
          class="w-4 h-4"
        />
        <a
          v-if="userProfile.website"
          target="_blank"
          :href="userProfile.website"
          class="text-amber-400"
          >{{ userProfile.website }}</a
        >
      </div>
      <RouterLink to="/edit" class="btn btn-primary mt-4">Edit</RouterLink>
    </div>
  </div>
  <Footer />
</template>

<style lang="css" scoped></style>
