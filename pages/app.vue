<template>
  <div class="xl:max-w-xl lg:mx-auto w-screen h-screen flex flex-col bg-white dark:bg-gray-900">
    <div class="flex flex-col flex-grow">
      <div class="flex-grow overflow-y-scroll scroll-smooth">
        <NuxtPage />
      </div>
      <div class="h-14"></div>
    </div>
    <div class="xl:max-w-xl lg:mx-auto bottom-navigation safe-bottom">
      <Navigation />
    </div>
  </div>
</template>
<style scoped>
.bottom-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
