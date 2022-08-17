<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex justify-center align-center"
    >
      <div class="d-flex justify-center align-center">
        <v-img
          contain
          alt="Chat App Logo"
          class="shrink mr-2"
          :src="require('@/assets/logo-white.png')"
          transition="scale-transition"
          width="65"
        />
      </div>
    </v-app-bar>

    <v-main>
        <virtual-list
          style="width: 100%; height: 100%; overflow-y: auto"
          :data-sources="
            messages.map((e) => ({
              ...e,
              isSender: e.senderId === currentUid,
            }))
          "
          :data-component="chatBox"
          :data-key="'senderId'"
          ref="scrollable"
          class="px-2"
        />
      </div>
    </v-main>

    <v-footer
      color="white"
      class="py-2 px-2"
      style="box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1)"
    >
      <div style="width: 100%" class="d-flex align-center">
        <div class="d-flex mr-4" style="flex: 1">
          <v-text-field
            placeholder="Start typing..."
            v-model="replyMessage"
            hide-details
            filled
            rounded
            dense
          ></v-text-field>
        </div>
        <v-btn icon :color="replyMessage != '' ? 'primary' : ''">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import ChatBox from "@/components/ChatBox.vue";

export default {
  name: "IndexPage",
  components: {
    "chat-box": ChatBox,
  },
  data() {
    return {
      replyMessage: "",
    };
  },
};
</script>

<style>
</style>