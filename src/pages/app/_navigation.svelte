<script>
  import {
    Header,
    HeaderUtilities,
    HeaderAction,
    HeaderPanelLinks,
    HeaderPanelDivider,
    HeaderPanelLink,
    SideNav,
    SideNavItems,
    SideNavMenu,
    SideNavMenuItem,
    SideNavLink,
    SkipToContent,
    Content,
    Grid,
    Row,
    Column,
    TileGroup,
    RadioTile,
    Select,
    SelectItem,
  } from 'carbon-components-svelte'
  import { expoIn } from 'svelte/easing'
  import { url, goto, isActive } from '@roxi/routify'

  import { getContext } from 'svelte'

  const { carbon_theme } = getContext('Theme')

  let isSideNavOpen = false
  let isOpen = false
  let selected = '0'
  let transitions = {
    '0': {
      text: 'Default (duration: 200ms)',
      value: {
        duration: 200,
      },
    },
    '1': {
      text: 'Custom (duration: 600ms, delay: 50ms, easing: expoIn)',
      value: {
        duration: 600,
        delay: 50,
        easing: expoIn,
      },
    },
    '2': {
      text: 'Disabled',
      value: false,
    },
  }

  function signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    return $goto('/')
  }
</script>

<style lang="scss" global>
  .bx--side-nav {
    top: 3rem;
    height: calc(100% - 48px);
    background: #262626 !important;
  }
</style>

<Header company="ECSMS" platformName="ECSMS" bind:isSideNavOpen>
  <div slot="skip-to-content">
    <SkipToContent />
  </div>
  <HeaderUtilities>
    <HeaderAction bind:isOpen transition={transitions[selected].value}>
      <HeaderPanelLinks>

        <HeaderPanelLink>
          <Select
            labelText="Carbon theme"
            bind:selected={$carbon_theme}
            style="margin-bottom: 1rem">
            <SelectItem value="white" text="White" />
            <SelectItem value="g10" text="Gray 10" />
            <SelectItem value="g90" text="Gray 90" />
            <SelectItem value="g100" text="Gray 100" />
          </Select>
        </HeaderPanelLink>
      </HeaderPanelLinks>
    </HeaderAction>

  </HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/app/dashboard" text="Dashboard" />
    <SideNavLink href="/app/schools" text="Schools" />
    <SideNavLink href="#" on:click={signOut} text="LogOut" />
  </SideNavItems>
</SideNav>
