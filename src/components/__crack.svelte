<script>
  import { url, goto, isActive, metatags, page } from '@roxi/routify'
  import {
    Content,
    Grid,
    Row,
    Column,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
  } from 'carbon-components-svelte'
  import Navigation from './_navigation.svelte'
  import Theme from '../../components/Theme.svelte'

  import { onMount } from 'svelte'
  import {
    SET_TERM,
    SET_ZONE,
    STORAGE_TOKEN,
    SET_USER_TYPE,
  } from '../../store.js'

  import { TERMS, ZONES } from '../../actions/others/index.js'
  import { __serialize, __deserialize } from '../../helpers/index.js'

  let token = null
  let terms = []
  let term = []
  let zone = []
  let zones = []
  let userType = null
  let all_zones = {
    zone_id: 'all',
    name: 'All Zones',
  }
  let selectedTerm = 1;
  let selectedZone = 0;

  $: selectedZone
  $: if (selectedZone >= 0) {
    
    changeZone(selectedZone)
  }
  $: if (selectedTerm >= 0) {
    changeTerm(selectedTerm)
  }

  onMount(() => {
    const __tokenLocalStorage = __deserialize('token')
    const __userType = __deserialize('currentUser')

    //checkuser type
    userType = __userType ? __userType.user.zone : null
    if (!__tokenLocalStorage) {
      return window.location.replace('/')
    }
    token = __tokenLocalStorage.token
    STORAGE_TOKEN.set(token)
    SET_USER_TYPE.set(__userType.user.zone)
    getTerms()
    getZones()
    __loadCheckers()
  })

  const getTerms = () => {
    const callback = (res) => {
      var __filter = [
        {
          id: 0,
          text: 'Select Term',
        },
      ]
      res.map((_term) => {
        __filter.push({
          id: _term.id,
          text: `Term ${_term.name} of ${_term.session}`,
        })
      })

      terms = __filter
    }

    const onError = (err) => {
      console.error(err)
    }
    TERMS(callback, onError)
  }

  const getZones = () => {
    const callback = (res) => {
      console.log(res);
      var __filter = [
        {
          id: 0,
          text: 'All Zones',
        },
      ]
      res.map((_zone) => {
        __filter.push({
          id: _zone.zone_id,
          text: _zone.name,
        })
      })
      // __filter.push( {
      //     id: 100,
      //     text: 'All Zone',
      //   },)
      zones = __filter
    }

    const onError = (err) => {
      console.error(err)
    }

    ZONES(callback, onError)
  }

  function __loadCheckers() {
    let checkTerm = __deserialize('selectedTerm')
    let checkZone = __deserialize('selectedZone')

    if (checkTerm) {
      let term_id = checkTerm.term_id
      selectedTerm = term_id
      // console.log('term_id:', selectedTerm);
      SET_TERM.set(selectedTerm)
    }

    if (checkZone) {
      let zone_id = checkZone.zone
      selectedZone = zone_id
      SET_ZONE.set(selectedZone)
    }
  }

  function changeTerm(term) {
   // Pace.restart()
    let checkTerm = __deserialize('selectedTerm')

    console.log('Change Term :', term)
    SET_TERM.set(term)
    if (checkTerm) {
      selectedTerm = term
      localStorage.removeItem('selectedTerm')
      localStorage.selectedTerm = __serialize({
        term_id: selectedTerm,
      })
    } else {
      selectedTerm = term
      localStorage.selectedTerm = __serialize({
        term_id: selectedTerm,
      })
    }
  }

  function changeZone(zone) {
   // Pace.restart()
    let checkZone = __deserialize('selectedZone')
    SET_ZONE.set(selectedZone)
    if (checkZone) {
      // selectedZone = checkZone.zone;
      localStorage.removeItem('selectedZone')
      localStorage.selectedZone = __serialize({
        zone,
      })
    } else {
      // selectedZone = zone;
      localStorage.selectedZone = __serialize({
        zone,
      })
    }
  }
</script>

<Theme persist theme="g10">
  <Navigation />
  <Content style="background: none;">
    <Grid>
      <Row>
        <Column lg={8}>
          <Breadcrumb noTrailingSlash aria-label="Page navigation">
            <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
          </Breadcrumb>
          <h3 style="margin-bottom: 1.5rem">
            Welcome back,
            <span style="font-size: 16px;">Super User</span>
          </h3>
        </Column>
        <Column lg={8}>
          <Row>
            {#if userType === 'Central User'}
            <Column>
              <Dropdown
                titleText="Select Zone"
                bind:selectedIndex={selectedZone}
                items={zones}
                label="Select Zone" />
            </Column>
            {/if}
            <Column>
              <Dropdown
                titleText="Select Term"
                bind:selectedIndex={selectedTerm}
                items={terms}
                label="Select Term" />
            </Column>
          </Row>
        </Column>

      </Row>
      {#if selectedTerm}
        <slot />
      {:else}
        <style>
          .select {
            margin: 100px 400px;
          }

          .select h4 {
            font-weight: light;
          }
        </style>
        <div class="select">
          <h4>Please Select a Term  To Contiune</h4>
          <br />
          <img
            class="img-responsive"
            src="/img/select.png"
            alt="select"
            style="height: 40vh;" />
        </div>
      {/if}
    </Grid>
  </Content>
</Theme>





