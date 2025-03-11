<template>
  <div class="p-4 relative group" @click="selectElement">
    <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded" @click.stop="$emit('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    <p 
      contenteditable="true" 
      @input="updateContent"
      class="focus:outline-none focus:ring-2 focus:ring-blue-200 px-2 py-1 rounded">
      {{ elementData.text }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextElement',
  props: {
    elementData: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectElement() {
      this.$emit('select', this.elementData);
    },
    updateContent(event) {
      this.elementData.text = event.target.textContent;
    }
  }
};
</script>