<script>
  import View from "./view.svelte";
  import {
    params
  } from '@roxi/routify'

  export let slug;
  $: slug = $params;

</script>


  <View {slug} />
