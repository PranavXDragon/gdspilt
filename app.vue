<script setup>
import "~/assets/main.css";
useSeoMeta({
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover",
  title: "PeerSplit | Track and split group expenses. 100% free, 100% private.",
  description: "Track and split group expenses. 100% free, 100% private. Peer-to-peer expense tracking that works offline.",
  ogTitle: "PeerSplit - Free & Private Expense Splitting",
  ogDescription: "Track and split group expenses with friends. 100% free, peer-to-peer, and completely private.",
  ogImage: "/pwa-512x512.png",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "PeerSplit - Free & Private Expense Splitting",
  twitterDescription: "Track and split group expenses with friends. 100% free, peer-to-peer, and completely private.",
  twitterImage: "/pwa-512x512.png",
  themeColor: "#89a1f0",
});
</script>
<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
