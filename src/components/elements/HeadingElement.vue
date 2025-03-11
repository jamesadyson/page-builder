<template>
  <div class="p-4 relative group" @click="selectElement">
    <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
      <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded" @click.stop="$emit('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <!-- Drag handle - uses mousedown instead of dragstart -->
      <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded ml-1 cursor-move" @mousedown.stop="$emit('dragstart', $event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>
    </div>
    <component 
      :is="'h' + elementData.level" 
      contenteditable="true" 
      @input="updateContent"
      :class="[
        'focus:outline-none focus:ring-2 focus:ring-blue-200 px-2 py-1 rounded',
        elementData.fontSize || 'text-base',
        elementData.isBold ? 'font-bold' : '',
        elementData.isItalic ? 'italic' : '',
        elementData.isUnderline ? 'underline' : '',
        textAlignClass
      ]"
      :style="{ color: elementData.textColor }">
      {{ elementData.text }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'HeadingElement',
  props: {
    elementData: {
      type: Object,
      required: true
    }
  },
  computed: {
    textAlignClass() {
      switch (this.elementData.textAlign) {
        case 'center': return 'text-center';
        case 'right': return 'text-right';
        default: return 'text-left';
      }
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