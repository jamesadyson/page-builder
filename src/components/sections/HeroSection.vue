<!-- src/components/sections/HeroSection.vue -->
<template>
  <div class="section-wrapper relative">
    <div class="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity flex">
      <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded" @click.stop="$emit('delete')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      <button class="p-1 bg-gray-100 hover:bg-gray-200 rounded ml-1 cursor-move" @mousedown.stop="$emit('dragstart', $event)">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>
    </div>
    
    <section class="bg-white overflow-hidden pb-10 group" @click="selectSection">
      <div class="container px-4 mx-auto">
        <p 
          class="text-center mb-2 text-lg md:text-xl font-semibold max-w-2xl mx-auto"
          contenteditable="true"
          @blur="updateSubheading">
          {{ sectionData.subheading }}
        </p>
        <div class="text-center max-w-6xl mx-auto">
          <h2 
            class="text-center font-bold w-full md:max-w-2xl lg:max-w-6xl leading-[1.2] md:leading-[1.1] lg:leading-[1.1] text-4xl md:text-5xl lg:text-5xl xl:text-6xl tracking-[-0.7px] md:tracking-[-1px] lg:tracking-[-1.3px] text-gray-950 mx-auto break-words mb-4"
            contenteditable="true"
            @blur="updateHeading">
            {{ sectionData.heading }}
          </h2>
          <p 
            class="mb-6 text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto"
            contenteditable="true"
            @blur="updateDescription">
            {{ sectionData.description }}
          </p>
          
          <div class="wistia-video rounded-lg overflow-hidden mb-10 mt-8 max-w-4xl mx-auto">
            <!-- Video placeholder in the editor, actual embed in published version -->
            <div class="relative" style="padding-top: 56.25%;">
              <div class="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="mb-2 inline-block w-96">
            <button 
              class="text-xl py-4 px-6 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-indigo-600 hover:bg-indigo-700 transition ease-in-out duration-200"
              type="button">
              <span contenteditable="true" @blur="updateButtonText">{{ sectionData.buttonText }}</span>
            </button>
          </div>
          
          <p 
            class="text-gray-500 text-sm mt-1 mb-3 w-96 mx-auto"
            contenteditable="true"
            @blur="updateDisclaimerText">
            {{ sectionData.disclaimerText }}
          </p>
          
          <div class="">
            <button class="py-4 px-6 w-full text-gray-500 transition ease-in-out duration-200 underline" type="button">
              <span contenteditable="true" @blur="updateNoThanksText">{{ sectionData.noThanksText }}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    sectionData: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectSection() {
      this.$emit('select', this.sectionData);
    },
    updateSubheading(event) {
      this.sectionData.subheading = event.target.textContent;
    },
    updateHeading(event) {
      this.sectionData.heading = event.target.textContent;
    },
    updateDescription(event) {
      this.sectionData.description = event.target.textContent;
    },
    updateButtonText(event) {
      this.sectionData.buttonText = event.target.textContent;
    },
    updateDisclaimerText(event) {
      this.sectionData.disclaimerText = event.target.textContent;
    },
    updateNoThanksText(event) {
      this.sectionData.noThanksText = event.target.textContent;
    }
  }
};
</script>

<style scoped>
.section-wrapper {
  position: relative;
}

[contenteditable] {
  outline: none;
}

[contenteditable]:hover {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  border-radius: 4px;
}

[contenteditable]:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.4);
  border-radius: 4px;
}
</style>