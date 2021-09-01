<script>
  import {
    Button,
    Icon
  } from 'carbon-components-svelte'


  import {
    onMount
  } from 'svelte'

  import {
    GET_SCHOOL_BY_ID,
    GET_SCHOOL_STAFF_PROFILES,
  } from '../../../../../actions/school/index.js'

  import {
    STORAGE_TOKEN,
    SET_ZONE
  } from "../../../../../store.js";

  import {
    goto,
    url
  } from '@roxi/routify'
  import numeral from 'numeral'

  import HandsonTable from '../../../../../components/HandsonTable.svelte'

  export let slug

  let isLoading = true
  let error = null
  let token = null
  let school = null
  let zones = []
  let profiles = null
  let columns = [{
      data: 'school_id',
      type: 'text',
      // renderer: 'html',
      width: 100,
    },
    {
      data: 'staff_id',
      type: 'text',
      width: 100,
    },
    {
      data: 'fullname',
      type: 'text',
      width: 200,
    },
    {
      data: 'age',
      type: 'numeric',

      width: 60,
    },
    {
      data: 'gender',
      type: 'text',
      width: 80,
    },
    {
      data: 'dob',
      type: 'text',
      width: 120,
    },
    {
      data: 'email',
      type: 'text',
      width: 120,
    },
    {
      data: 'phone',
      type: 'text',
      width: 120,
    },
    {
      data: 'designation',
      type: 'text',
      width: 120,
    },
    {
      data: 'marital_status',
      type: 'text',
      width: 120,
    },
    {
      data: 'qualification_with_date',
      type: 'text',
      width: 120,
    },
    {
      data: 'year_of_entry',
      type: 'text',
      width: 120,
    },
    {
      data: 'years_of_experience',
      type: 'text',
      width: 120,
    },
    {
      data: 'address',
      type: 'text',
      width: 120,
    },
    {
      data: 'gross_salary',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 120,
    },
    {
      data: 'resp_allowance',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 120,
    },
    {
      data: 'employment_type',
      type: 'text',
      width: 120,
    },
    {
      data: 'contract_type',
      type: 'text',
      width: 120,
    },
    {
      data: 'contract_duration',
      type: 'text',
      width: 120,
    },
    {
      data: 'church_membership',
      type: 'text',
      width: 120,
    },
    {
      data: 'wofbi_level',
      type: 'text',
      width: 120,
    },
    {
      data: 'cert_ver_status',
      type: 'text',
      width: 120,
    },
    {
      data: 'query_status',
      type: 'text',
      width: 120,
    },
    {
      data: 'disciplinary_cases',
      type: 'text',
      width: 120,
    },
    {
      data: 'transfer_history',
      type: 'text',
      width: 120,
    },
    {
      data: 'created_at',
      type: 'text',
      width: 120,
    }
  ];
  let colHeaders = [
    'School ID',
    'Staff ID',
    'Fullname',
    'Age',
    'Gender',
    'DOB',
    'Email',
    'Phone',
    'Designation',
    'Marital Status',
    'Qualification With Date',
    'Year Of Entry',
    'Years Of Experience',
    'Address',
    'Gross Salary',
    'RESP Allowance',
    'Employment Type',
    'Contract Type',
    'Contract Duration',
    'Church Membership',
    'WOFBI Level',
    'Cert Ver Status',
    'Query Status',
    'Disciplinary Cases',
    'Transfer History',
    'Date',
  ];
  onMount(() => {
    STORAGE_TOKEN.subscribe((value) => (token = value))
    SET_ZONE.subscribe((value) => (zones = value))
    getSchool()
    getProfiles()
  })

  function getSchool() {
    const callback = (res) => {
      school = res[0]
    }
    const onError = (err) => {
      console.log(err)
     $goto('/app/not-found')
    }
    GET_SCHOOL_BY_ID(slug.id, callback, onError)
  }

  function getProfiles() {
    const callback = (res) => {
      if (profiles === null) {
        profiles = res
        isLoading = false
        error = false
      }
    }
    const onError = (err) => {
      console.log(err)
      setTimeout(() => {
        isLoading = false
        error = 'No data found'
      }, 100)
    }
    GET_SCHOOL_STAFF_PROFILES(slug.id, callback, onError)
  }
  $: if (profiles) {
    error = false
  }
  console.log(profiles)
</script>

<svelte:head>
  <title>School</title>
</svelte:head>

<main>

  <style>
    #example {
      margin: 25px 0px;
    }

    .no-data-found {
      margin: 200px 250px;
    }

    #export-file {
      position: absolute;
      top: 0px;
      right: 5px;
      padding: 0.75rem;
      margin:10px;
    }

    .text-header {
      color: #fff;
      padding: 5px;
    }

    .card__table {
      background: #fff;
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: 65vh;
      border: 1px solid #000;
      overflow-y: scroll;
      width: 540px;
    }

    .card__header {
      width: 100% !important;
      background: rgb(25, 34, 47);
      padding: 5px;
      height: 80px;
      overflow-x: scroll;
    }
  </style>
  <div class="card__table" style="width:100%;">
    <Button type="button" id="export-file">
      Download
    </Button>

    <div class="card__header">

      <p class="text-header" style="margin-top:10px"> {school != null ? `${school.schoolname} - Profiles`
        : ''} </p>
    </div>
    <div class="card-body">
      {#if profiles}
      <HandsonTable  data={profiles} {columns} {colHeaders}/>
      {/if}
    </div>
  </div>



</main>