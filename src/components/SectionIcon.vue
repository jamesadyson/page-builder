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
  iconComponent() {
  // Map section type to the appropriate icon component
  switch(this.type) {
    case 'HeadingElement':
      return 'HeadingIcon';
    case 'TextElement':
      return 'TextIcon';
    case 'BulletElement':
      return 'BulletIcon';
    case 'FeatureElement':
      return 'FeatureIcon';
    case 'FeaturesSection':
      return 'FeaturesIcon';
    case 'TestimonialSection':
      return 'TestimonialsIcon';
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
    default:
      return 'FeatureIcon'; // Default icon
  
}
  }
};
</script>