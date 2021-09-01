<script>
  import {
    Button,
    Grid,
    Row,
    Column,
    FluidForm,
    TextInput,
    ToastNotification,
  } from 'carbon-components-svelte'

  import { goto } from '@roxi/routify'

  import { onMount } from 'svelte'
  
  import { LOG_USER_IN } from '../actions/authentication'

  import { __serialize, __deserialize } from '../helpers/index.js'

  let email = ''
  let password = ''
  let errors, success

  onMount(() => {
    const isLoggedIn = __deserialize('currentUser')
    if (isLoggedIn) {
      return $goto('/app/dashboard')
    }
  })

  const login = (e) => {
    e.preventDefault()

    const callback = (user) => {
      window.localStorage.currentUser = __serialize({
        user: user.user,
      })
      window.localStorage.token = __serialize({
        token: user.token,
      })

      if (window.localStorage.currentUser) {
       return $goto('/app/dashboard')
      }
    }

    const onError = (error) => {
      errors = error.message
      if (error.response) {
        console.log(error.response)
      }
    }

    LOG_USER_IN(email, password, callback, onError)
  }
</script>

<Grid>
  <style>
    .overlay{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 2rem;
      background: #091632;
      z-index: -1;
    }


    .authentication {
      position: relative;
      width: 70%;
      height: auto ;
      padding: 3rem 2rem;
      margin: 20% 15%;
      background: #fff !important;
      border-radius: 5px;
      box-shadow: 4px 4px 72px rgba(45, 43, 126, 0.1);
      z-index: 1000;
    }

    .move {
      color: #000;
      margin-top: 50px;
      margin: 2rem 0;
      float: right;
    }

    .header-text {
      font-size: 24px;
      color: #242424;
      margin: 0.5rem 0;
    }

    span {
      margin: 2rem 0;
    }

    h2{
      margin: 2rem 8rem;
      font-weight: bold;
    }
    h2>span{
      color: #0F62FE;
    }
  </style>
  <div class="overlay"></div>
  <Row>
    <Column md={2} />
    <Column md={4}>
      <div class="authentication">

        <br />


        <h2>EC<span>SMS</span> </h2>
       
        <p class="header-text">Log in to your account</p>
        <span>Please enter your credentials</span>
        <br />
        <br />
        {#if errors}
          <ToastNotification
            lowContrast={true}
            kind="error"
            title="Error"
            caption={errors}
            style="width: 100%;" />
        {/if}
     
        <FluidForm>
          <form on:submit={login}>
            <TextInput
              type="email"
              labelText="Email"
              placeholder="Email"
              bind:value={email}
              required />
            <TextInput
              type="password"
              labelText="Password"
              placeholder="Password"
              bind:value={password}
              required />              
            <a href={'#'} class="move">Forget Password?</a>
            <br />
            <br />
            <br />

            <Button type="submit">Login</Button>

          </form>

        </FluidForm>
        <br />
        <br />
        <br />

      </div>
    </Column>
    <Column md={2} />
  </Row>
</Grid>
