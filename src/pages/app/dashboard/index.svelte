<script>
  import {
    Row,
    Column,
    Loading,
    AspectRatio,
    Tile,
  } from 'carbon-components-svelte'

  import { getContext } from 'svelte'

  import { onMount } from 'svelte'

  import { DASHBOARD } from '../../../actions/others'

  import { ALL_STAT } from '../../../actions/all'

  import { SET_ZONE, STORAGE_TOKEN } from '../../../store.js'

  let selectedZone =  JSON.parse(window.localStorage.getItem('selectedZone')) ? JSON.parse(window.localStorage.getItem('selectedZone')).zone : 0;
  $: selectedZone
  $: if (selectedZone >= 0) {
    STORAGE_TOKEN.subscribe((value) => (token = value))
    isLoading = true
    getAllStat()
    getDashboard()
  }

  let dashboard = null
  let isLoading = true
  let token = null
  let zones = []
  let user = []
  let stat = null


  onMount(() => {
    const userData = JSON.parse(window.localStorage.getItem('currentUser'))
    user = userData
    STORAGE_TOKEN.subscribe((value) => (token = value))
    SET_ZONE.subscribe((value) => (zones = value))
  })

  function getDashboard() {
    dashboard = null
    const callback = (res) => {
      dashboard = res[0]
      setTimeout(() => {
        isLoading = false
      }, 100)
    }
    const onError = (err) => {
      console.error(err)
    }
    DASHBOARD(callback, onError)
  }

  function getAllStat() {
    let getZone = JSON.parse(window.localStorage.getItem('selectedZone'))
    stat = null
    const callback = (res) => {
      stat = res
      setTimeout(() => {
        isLoading = false
      }, 100)
    }
    const onError = (err) => {
      console.error(err)
    }
    ALL_STAT(getZone.zone, callback, onError)
  }

  const { carbon_theme } = getContext('Theme')
</script>

{#if isLoading && dashboard === null}
  <Loading style="height: 100vh;" />
{:else}

  <Row style="margin: 50px 0;">
    <Column>
      <AspectRatio ratio="16x9">
        <Tile style="height: 100%; border-bottom: 1px solid #242424;">
          <br />
          <p>Total Tenured Staff</p>
          <p style="font-size: 22px; margin-top: 10px;">{(stat !== null ? stat.tenured : 0)}</p>
        </Tile>
      </AspectRatio>
    </Column>
    <Column>
      <AspectRatio ratio="16x9">
        <Tile style="height: 100%; border-bottom: 1px solid #242424;">
          <br />
          <p>Total Non-Tenured Staff</p>
          <p style="font-size: 22px; margin-top: 10px;">{(stat !== null ? stat.non_tenured : 0)}</p>
        </Tile>
      </AspectRatio>
    </Column>
    <Column>
      <AspectRatio ratio="16x9">
        <Tile style="height: 100%; border-bottom: 1px solid #242424;">
          <br />
          <p>Total Permanent Staff</p>
          <p style="font-size: 22px; margin-top: 10px;">{(stat !== null ? stat.permanent : 0)}</p>
        </Tile>
      </AspectRatio>
    </Column>
    <Column>
      <AspectRatio ratio="16x9">
        <Tile style="height: 100%; border-bottom: 1px solid #242424;">
          <br />
          <p>Total Temporary Staff</p>
          <p style="font-size: 22px; margin-top: 10px;">{(stat !== null ? stat.temporary : 0)}</p>
        </Tile>
      </AspectRatio>
    </Column>

  </Row>
{/if}