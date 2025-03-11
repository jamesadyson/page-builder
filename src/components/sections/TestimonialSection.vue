<!-- src/components/sections/TestimonialSection.vue -->
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
    
    <section class="relative pt-24 pb-32 bg-white overflow-hidden group" @click="selectSection">
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 opacity-50 w-[500px] h-[500px] rounded-full"></div>
      <div class="relative z-10 container px-4 mx-auto">
        <p 
          class="mb-4 text-lg text-gray-900 font-medium text-center"
          contenteditable="true"
          @input="updateSubheading">
          {{ sectionData.subheading }}
        </p>
        <h2 
          class="mb-24 text-4xl md:text-5xl font-bold text-center tracking-tight leading-tight"
          contenteditable="true"
          @input="updateHeading">
          {{ sectionData.heading }}
        </h2>
        <div class="flex flex-wrap -m-8">
          <div class="w-full md:flex-1 p-8">
            <div class="flex flex-col items-center max-w-lg mx-auto">
              <div class="flex flex-wrap -m-1.5 mb-7">
                <div class="w-auto p-1.5">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div class="w-auto p-1.5">
                  <h3 
                    class="font-semibold"
                    contenteditable="true"
                    @input="updateTestimonial(0, 'author')">
                    {{ sectionData.testimonials[0].author }}
                  </h3>
                  <p 
                    class="text-gray-500"
                    contenteditable="true"
                    @input="updateTestimonial(0, 'handle')">
                    {{ sectionData.testimonials[0].handle }}
                  </p>
                </div>
              </div>
              <p 
                class="mb-8 text-xl font-medium text-center"
                contenteditable="true"
                @input="updateTestimonial(0, 'quote')">
                {{ sectionData.testimonials[0].quote }}
              </p>
              <div class="h-8 flex items-center justify-center">
                <span class="text-sm text-gray-500">{{ sectionData.testimonials[0].company }}</span>
              </div>
            </div>
          </div>
          <div class="hidden md:flex md:items-center md:w-auto">
            <div class="w-px h-28 bg-gray-200"></div>
          </div>
          <div class="w-full md:flex-1 p-8">
            <div class="flex flex-col items-center max-w-lg mx-auto">
              <div class="flex flex-wrap -m-1.5 mb-7">
                <div class="w-auto p-1.5">
                  <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <div class="w-auto p-1.5">
                  <h3 
                    class="font-semibold"
                    contenteditable="true"
                    @input="updateTestimonial(1, 'author')">
                    {{ sectionData.testimonials[1].author }}
                  </h3>
                  <p 
                    class="text-gray-500"
                    contenteditable="true"
                    @input="updateTestimonial(1, 'handle')">
                    {{ sectionData.testimonials[1].handle }}
                  </p>
                </div>
              </div>
              <p 
                class="mb-8 text-xl font-medium text-center"
                contenteditable="true"
                @input="updateTestimonial(1, 'quote')">
                {{ sectionData.testimonials[1].quote }}
              </p>
              <div class="h-8 flex items-center justify-center">
                <span class="text-sm text-gray-500">{{ sectionData.testimonials[1].company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TestimonialSection',
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
    updateTestimonial(index, field) {
      return function(event) {
        this.sectionData.testimonials[index][field] = event.target.textContent;
      }.bind(this);
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