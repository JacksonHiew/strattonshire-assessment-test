<template>
  <div
    :class="`custom-chatbox my-3 d-flex ${
      source.isSender ? 'justify-end' : 'justify-start'
    }`"
  >
    <div
      style="max-width: 300px; min-width: 100px"
      :class="`chatbox-wrapper rounded px-2 py-2 ${
        source.isSender ? 'blue darken-1' : 'blue-grey lighten-5'
      }`"
    >
      <div v-if="!source.isSender" class="user-info">
        <h4
          :class="`text-subtitle-2 font-weight-bold my-0 ${
            source.isSender ? 'white--text' : ''
          }`"
        >
          {{ source.senderName }}
        </h4>
      </div>
      <div class="chat-content pb-1">
        <p
          :class="`text-subtitle-2 font-weight-regular my-0 ${
            source.isSender ? 'white--text' : ''
          }`"
        >
          {{ source.messageContent }}
        </p>
      </div>
      <div class="chat-info d-flex justify-end">
        <p
          :class="`text-caption font-weight-light my-0 ${
            source.isSender ? 'white--text' : ''
          }`"
        >
          {{
            moment(
              source.createdAt != null
                ? source.createdAt.toDate()
                : new Date(Date.now())
            ).format("LT")
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    index: {
      type: Number,
    },
    source: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      moment: moment,
    };
  },
};
</script>

<style lang="scss">
</style>