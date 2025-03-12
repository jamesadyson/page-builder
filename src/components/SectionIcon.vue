<!-- src/components/SectionIcon.vue -->
<template>
  <component :is="iconComponent" />
</template>

<script>
export default {
  name: 'SectionIcon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    iconComponent() {
      // Map section type to the appropriate icon component
      switch(this.type) {
        case 'AttentionBarSection':
          return 'AttentionIcon';
        case 'TestimonialSection':
          return 'TestimonialsIcon';
        case 'HeroSection':
          return 'HeroIcon';
        case 'FeaturesSection':
          return 'FeaturesIcon';
        case 'hero':
          return 'HeroIcon';
        case 'features':
          return 'FeaturesIcon';
        case 'product':
          return 'ProductIcon';
        case 'callToAction':
          return 'CtaIcon';
        case 'aboutUs':
          return 'AboutIcon';
        case 'quiz':
          return 'QuizIcon';
        case 'team':
          return 'TeamIcon';
        case 'testimonials':
          return 'TestimonialsIcon';
        case 'trust':
          return 'TrustIcon';
        case 'attentionBars':
          return 'AttentionIcon';
        default:
          return 'FeaturesIcon'; // Default icon
      }
    }
  }
};
</script>