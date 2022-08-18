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
                startEmojiEffect();
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
import { getToken } from "firebase/messaging";
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
      currentUid: "",
      currentUsername: "",
      messageContent: "",
      headerHeight: 0,
      footerHeight: 0,
      messages: [],
    };
  },
  mounted() {
    this.updateHeaderHeight();
    this.updateFooterHeight();

    this.$nextTick(async () => {
      this.createNewUser();
      this.registerSnapshotListener();
      this.requestNotificationPermission();
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
    requestNotificationPermission() {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        this.registerFcm();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            this.registerFcm();
          }
        });
      }
    },
    registerFcm() {
      this.getFcmToken();
    },
    async getFcmToken() {
      await getToken(this.$messaging, {
        vapidKey: process.env.VUE_APP_FCM_VAPID,
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
        console.log(val || "new message");
      });

      // user-connect

      /* const q = query(
        collection(this.$firestoredb, "Messages"),
        orderBy("createdAt", "asc")
      );

      onSnapshot(q, (querySnapshot) => {
        this.messages = querySnapshot.docs.map((e) => e.data());

        this.$nextTick(() => {
          this.scrollBodyToBottom();
        });
      }); */
    },
    createNewUser() {
      const uuid = uuidv4();
      const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, names],
        length: 2,
      });

      this.currentUid = uuid;
      this.currentUsername = shortName;
    },
    async sendMessage(message) {
      const trimmedMessage = message.trim();

      socket.emit("create-new-message", {
        senderId: "123",
        messageContent: trimmedMessage,
      });
      /* const trimmedMessage = message.trim();

      if (trimmedMessage != "") {
        addDoc(collection(this.$firestoredb, "Messages"), {
          senderId: this.currentUid,
          senderName: this.currentUsername,
          messageContent: trimmedMessage,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        this.messageContent = "";
      } */
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

<style></style>
