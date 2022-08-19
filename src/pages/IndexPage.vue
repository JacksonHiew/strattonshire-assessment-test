<template>
  <v-app>
    <v-app-bar
      dark
      ref="header"
      color="primary"
      style="z-index: 1; height: unset"
      class="d-flex justify-center align-center top-notch-padding"
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
              isSender: e.username === currentUsername,
            }))
          "
          :data-component="chatBox"
          :data-key="'id'"
          ref="scrollable"
          class="px-2"
        />
      </div>
    </v-main>

    <v-footer
      ref="footer"
      color="white"
      class="pt-2 px-2 bottom-notch-padding"
      style="box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1)"
    >
      <div class="pb-2" style="width: 100%">
        <form
          class="d-flex align-center"
          @submit.prevent="
            () => {
              sendMessage(messageContent);
            }
          "
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
            @click="
              () => {
                sendEmoji();
              }
            "
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
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {
  uniqueNamesGenerator,
  adjectives,
  names,
} from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";
import VirtualList from "vue-virtual-scroll-list";
import joypixels from "emoji-toolkit";
import floating from "@/plugins/floating";
import socket from "@/plugins/socket.io-config";

export default {
  name: "IndexPage",
  components: {
    VirtualList,
  },
  data() {
    return {
      chatBox: ChatBox,
      joypixels: joypixels,
      currentUsername: "",
      messageContent: "",
      headerHeight: 0,
      footerHeight: 0,
      messages: [],
      notch: 0,
    };
  },
  mounted() {
    this.updateHeaderHeight();
    this.updateFooterHeight();
    this.updateNotchPadding();

    this.$nextTick(async () => {
      this.createNewUser();
      this.getInitialMessage();
      this.registerSnapshotListener();
    });
  },
  methods: {
    generateMessages() {
      for (let x = 0; x < 1000; x++) {
        const uuid = uuidv4();
        const shortName = uniqueNamesGenerator({
          dictionaries: [adjectives, names],
          length: 2,
        });
        const content = uniqueNamesGenerator({
          dictionaries: [adjectives, adjectives],
          length: 2,
        });

        addDoc(collection(this.$firestoredb, "Messages"), {
          senderId: uuid,
          senderName: shortName,
          messageContent: content,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    },
    getInitialMessage() {
      socket.on("initialized", (val) => {
        this.handleChatData(val, false);
      });
    },
    sendEmoji() {
      this.sendMessage(joypixels.shortnameToUnicode(":heart_eyes:"));
    },
    startEmojiEffect() {
      floating({
        content: joypixels.shortnameToUnicode(":heart_eyes:"),
        duration: 3,
        number: 20,
        repeat: 1,
        size: 3,
      });
    },
    registerSnapshotListener() {
      socket.on("new-message-created", (val) => {
        this.handleChatData(val);
      });
    },
    handleChatData(val, emojiEffect = true) {
      this.messages = val;

      if (
        joypixels.toShort(
          this.messages[this.messages.length - 1].messageContent
        ) == ":heart_eyes:" &&
        emojiEffect == true
      ) {
        this.startEmojiEffect();
      }

      this.$nextTick(() => {
        this.scrollBodyToBottom();
      });
    },
    createNewUser() {
      const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, names],
        length: 2,
      });

      this.currentUsername = shortName;
    },
    async sendMessage(message) {
      const trimmedMessage = message.trim();

      if (trimmedMessage != "") {
        socket.emit("create-new-message", {
          username: this.currentUsername,
          messageContent: trimmedMessage,
        });
        this.messageContent = "";
      }
    },
    scrollBodyToBottom() {
      const scrollBody = this.$refs.scrollable;

      scrollBody.scrollToBottom();
    },
    updateNotchPadding() {
      this.notch = window.innerHeight - window.screen.availHeight;
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
.top-notch-padding {
  padding-top: env(safe-area-inset-top, 20px);
}

.bottom-notch-padding {
  padding-bottom: env(safe-area-inset-bottom, 20px);
}
</style>
