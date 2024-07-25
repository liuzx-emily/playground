<style lang="scss" scoped>
.flex-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  & > * {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
<template>
  <section class="flex-box">
    <Bouncing3dText />
    <ChargingEffect />
    <GlareButton />
    <GlareButton2 />
    <NeonText />
    <PlaidPatternBySingleElement />
    <PrettyCheckbox />
    <PulseHalo />
    <SnowyNight />
    <SuperCoolWhirl />
    <TextEffectExpandFromTheMiddle />
    <WaveInBall />
  </section>
</template>
<script setup>
import Bouncing3dText from "./Bouncing3dText.vue";
import ChargingEffect from "./ChargingEffect.vue";
import GlareButton from "./GlareButton.vue";
import GlareButton2 from "./GlareButton2.vue";
import NeonText from "./NeonText.vue";
import PlaidPatternBySingleElement from "./PlaidPatternBySingleElement.vue";
import PrettyCheckbox from "./PrettyCheckbox.vue";
import PulseHalo from "./PulseHalo.vue";
import SnowyNight from "./SnowyNight.vue";
import SuperCoolWhirl from "./SuperCoolWhirl.vue";
import TextEffectExpandFromTheMiddle from "./TextEffectExpandFromTheMiddle.vue";
import WaveInBall from "./WaveInBall.vue";
</script>
