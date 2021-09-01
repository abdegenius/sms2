<script>
  import {
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    DataTable,
    Search,
    AspectRatio,
    Tile,
    TextInput,
    ClickableTile,
  } from 'carbon-components-svelte'

  import { onMount } from 'svelte'

  import numeral from 'numeral'

  import { STORAGE_TOKEN, SET_ZONE } from '../../../store.js'
  import { GET_SCHOOLS } from '../../../actions/school/index.js'
  import { goto, params, url } from '@roxi/routify'

  import { __serialize, __deserialize } from '../../../helpers/index.js'

  import { getContext } from 'svelte'

  const { carbon_theme } = getContext('Theme')

  let schools = []
  let copy = []
  let current = []
  let token = null
  let isLoading = true
  let miniLoader = false
  let error = null
  let zones = []
  let search = ''
  export let slug
  $: slug = $params

  onMount(() => {
    STORAGE_TOKEN.subscribe((value) => (token = value))
    SET_ZONE.subscribe((value) => (zones = value))
    getSchools()
  })

  function getSchools() {
    let getZone = JSON.parse(window.localStorage.getItem('selectedZone'))
    const callback = (res) => {
      if (schools === null) {
        schools = res
        copy = res
        isLoading = false
        error = false
      }
    }
    const onError = (err) => {
      console.error(err)

      setTimeout(() => {
        isLoading = false
        error = 'No data found'
      }, 100)
    }

    GET_SCHOOLS(getZone.zone, callback, onError)
  }

  $: if (zones) {
    isLoading = true
    schools = null
    let getZone = JSON.parse(window.localStorage.getItem('selectedZone'))
    setTimeout(() => {
      if (getZone.zone === zones) {
        getSchools()
      }
    }, 100)
  }
  $: if (zones.zone_id != 'undefined') {
    isLoading = true
    schools = null
    let getZone = JSON.parse(window.localStorage.getItem('selectedZone'))
    setTimeout(() => {
      if (getZone.zone === zones.zone_id) {
        getSchools()
      }
    }, 100)
  }

  $: if (schools) {
    error = false
  }

  function selectSchool(school) {
    current = school
    $goto(`/app/schools/${school.schoolid}`)
  }

  function handleSearch() {
    let data = copy.filter((el) => {
      return el.schoolname.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
    schools = [...data]
  }
</script>

<svelte:head>
  <title>Schools</title>
</svelte:head>
{#if isLoading}
  <p />
{:else}
  <Row style="margin: 50px 0;">

    <Column md={2.1}>
      <div class="schools">
        <style>
          .schools {
            border: 1px solid #000;
          }
          .school__display {
            position: relative;
            height: 60vh;
            overflow-y: scroll;
            width: 240px;
          }
          .search__input {
            border-top: 1px solid #e0e0e0;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
          }

          .bx--tile {
            padding: 0.5rem 1rem !important;
            border-top: 1px solid #e0e0e0;
            border-left: 1px solid #e0e0e0;
            border-right: 1px solid #e0e0e0;
            min-height: 0 !important;
          }
        </style>
        <TextInput
          class="search__input"
          placeholder="Quick search..."
          name="search-box"
          bind:value={search}
          on:input={handleSearch}
          autocomplete="off" />
        <div class="school__display">
          {#each schools as school, i}
            <ClickableTile
              href="/app/schools/{school.schoolid}"
              style="width:100%">
              {school.schoolname.replace('Kingdom Heritage Model School', 'KHMS')}
            </ClickableTile>
          {/each}
        </div>
      </div>
    </Column>

    <Column lg={11}>
      <slot />
    </Column>

  </Row>
{/if}
