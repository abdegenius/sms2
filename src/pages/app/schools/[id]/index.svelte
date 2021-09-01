<script>
  import {
    Button,
    Breadcrumb,
    BreadcrumbItem,
    Grid,
    Row,
    Column,
    Loading,
    Tabs,
    TabContent,
    Tab,
    Select,
    SelectItem,
    AspectRatio,
    Tile,
  } from 'carbon-components-svelte'

  import { onMount, afterUpdate } from 'svelte'
  import { GET_SCHOOL_BY_ID, GET_SCHOOL_DASHBOARD} from '../../../../actions/school/index.js'
  import { STORAGE_TOKEN } from '../../../../store.js'
  import { goto, url } from '@roxi/routify'
  import numeral from 'numeral'

  import { __serialize, __deserialize } from '../../../../helpers/index.js'

  export let slug

  $: if (slug) {
    STORAGE_TOKEN.subscribe((value) => (token = value))
    isLoading = true
    getDashboard()
    getSchool()
  }

  let isLoading = true
  let token = null
  let school = null
  let dashboard = null
  onMount(() => {
    dashboard = null
    school = null
  })

  function getDashboard() {
    dashboard = null
    const callback = (res) => {
      dashboard = res
      setTimeout(() => {
        isLoading = false
      }, 100)
    }
    const onError = (err) => {
      isLoading = false
      console.log(err)
    }
    GET_SCHOOL_DASHBOARD(slug.id, callback, onError)
  }

  function getSchool() {
    school = null
    const callback = (res) => {
      school = res[0]
      setTimeout(() => {
        isLoading = false
      }, 100)
    }
    const onError = (err) => {
      isLoading = false
      console.log(err)
    }
    GET_SCHOOL_BY_ID(slug.id, callback, onError)
  }
        
</script>

{#if school}
  <div class="wrapper">

    {#if isLoading}
      <Loading style="height: 100vh;" />
    {:else}
      <style>
        .school-name {
          font-size: 16px;
          color: #000;
          margin-left: 65px;
        }

        .school__display__info {
          height: 70vh;
          overflow-y: scroll;
        }
        .button-group {
          margin: 20px;
          margin-left: 85px;
        }

        .row {
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          padding: 0rem 2rem;
        }
        .card-box {
          background: white;
          min-width: 40%;
          height: 10px auto;
          margin: 0.5rem;
          padding: 2rem;
          border-bottom: 1px solid #000;
        }
      </style>
      <p class="school-name">{school === null ? '' : school.schoolname}</p>
      <br />
      <br />
      {#if dashboard}
        <div class="row">
          <div class="card-box">
            <h6>Total Tenured Staffs</h6>
            <p>{dashboard === null ? 0 : dashboard.tenured}</p>
          </div>
          <div class="card-box">
            <h6>Total Non-Tenured Staffs</h6>
            <p>{dashboard === null ? 0 : dashboard.non_tenured}</p>
          </div>
        </div>
        <div class="row">
          <div class="card-box">
            <h6>Total Permanent Staffs</h6>
            <p>{dashboard === null ? 0 : dashboard.permanent}</p>
          </div>
          <div class="card-box">
            <h6>Total Temporary Staffs</h6>
            <p>{dashboard === null ? 0 : dashboard.temporary}</p>
          </div>
        </div>
      {/if}

      <div class="button-group">
        <a href={$url(`/app/schools/profiles/${school.schoolid}`)}>
          <Button>Staff Profiles</Button>
        </a>
        <a href={$url(`/app/schools/payrolls/${school.schoolid}`)}>
          <Button>Staff Payroll</Button>
        </a>
        <a href={$url(`/app/schools/recruitments/${school.schoolid}`)}>
          <Button>Staff Recruitments</Button>
        </a>
      </div>
    {/if}
  </div>
{:else}
  <h2 class="no-data-found">No data found</h2>
{/if}
<!-- {/if} -->
