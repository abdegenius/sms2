<script>
  import SingleSchool from './index.svelte'
  import { params } from '@roxi/routify'

  export let slug
  $: slug = $params
</script>

<SingleSchool {slug} />
