<template>
  <v-app>
    <v-app-bar
      dark
      ref="header"
      color="primary"
      style="z-index: 1"
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
      <div
        class="d-flex align-end"
        :style="`height: calc(100vh - ${headerHeight + footerHeight}px)`"
      >
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
      ref="footer"
      color="white"
      class="py-2 px-2"
      style="box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1)"
    >
      <div style="width: 100%">
        <form
          class="d-flex align-center"
        >
          <div class="d-flex mr-4" style="flex: 1">
            <v-text-field
              placeholder="Start typing..."
              v-model="messageContent"
              hide-details
              filled
              rounded
              dense
            ></v-text-field>
          </div>
          <v-btn
            v-if="messageContent.trim() != ''"
            color="primary"
            type="submit"
            icon
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
          <a
            v-else
            class="px-2"
            style="font-size: 24px"
          >
            {{ joypixels.shortnameToUnicode(":heart_eyes:") }}
          </a>
        </form>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import ChatBox from "@/components/ChatBox.vue";
import VirtualList from "vue-virtual-scroll-list";
import joypixels from "emoji-toolkit";
import floating from "@/plugins/floating";

export default {
  name: "IndexPage",
  components: {
    VirtualList,
  },
  data() {
    return {
      chatBox: ChatBox,
      joypixels: joypixels,
      headerHeight: 0,
      footerHeight: 0,
    };
  },
  mounted() {
    this.updateHeaderHeight();
    this.updateFooterHeight();

  },
  methods: {
    startEmojiEffect() {
      floating({
        content: joypixels.shortnameToUnicode(":heart_eyes:"),
        duration: 3,
        number: 20,
        repeat: 1,
        size: 3,
      });
    },
    scrollBodyToBottom() {
      const scrollBody = this.$refs.scrollable;

      scrollBody.scrollToBottom();
    },
    updateHeaderHeight() {
      const targetElement = this.$refs.header.$el;
      const elementHeight = targetElement.getBoundingClientRect().height;

      this.headerHeight = elementHeight;
    },
    updateFooterHeight() {
      const targetElement = this.$refs.footer.$el;
      const elementHeight = targetElement.getBoundingClientRect().height;

      this.footerHeight = elementHeight;
    },
  },
};
</script>

<style>
</style>