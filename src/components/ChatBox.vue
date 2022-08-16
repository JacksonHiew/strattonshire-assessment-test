<template>
  <div
    :class="`custom-chatbox d-flex ${
      isSender ? 'isSender justify-end' : 'justify-start'
    }`"
  >
    <div
      style="max-width: 300px"
      :class="`chatbox-wrapper rounded px-2 py-2 ${
        isSender ? 'blue darken-1' : 'blue-grey lighten-5'
      }`"
    >
      <div v-if="!isSender" class="user-info">
        <h4
          :class="`text-subtitle-1 font-weight-bold my-0 ${
            isSender ? 'white--text' : ''
          }`"
        >
          User Name
        </h4>
      </div>
      <div class="chat-content pb-1">
        <p
          :class="`text-subtitle-2 font-weight-regular my-0 ${
            isSender ? 'white--text' : ''
          }`"
        >
          Lorem Ipsum Sit Amet
        </p>
      </div>
      <div class="chat-info d-flex justify-end">
        <p
          :class="`text-caption font-weight-light my-0 ${
            isSender ? 'white--text' : ''
          }`"
        >
          11.31PM
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isSender: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
</style>