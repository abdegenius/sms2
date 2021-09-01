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
    GET_SCHOOL_STAFF_RECRUITMENTS,
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
  let recruitments = null
  let columns = [
    {
      data: 'school_id',
      type: 'text',
      // renderer: 'html',
      width: 100,
    },
    {
      data: 'name',
      type: 'text',
      width: 200,
    },
    {
      data: 'dob',
      type: 'numeric',

      width: 60,
    },
    {
      data: 'gender',
      type: 'text',
      width: 80,
    },
    {
      data: 'martal_status',
      type: 'text',
      width: 120,
    },
    {
      data: 'location',
      type: 'text',
      width: 120,
    },
    {
      data: 'qualification',
      type: 'text',
      width: 120,
    },
    {
      data: 'post_applied_for',
      type: 'text',
      width: 80,
    },
    {
      data: 'years_of_experience',
      type: 'text',
      width: 80,
    },
    {
      data: 'new_birth',
      type: 'text',
      width: 80,
    },
    {
      data: 'church_membership',
      type: 'text',
      width: 80,
    },
    {
      data: 'service_unit',
      type: 'text',
      width: 80,
    },
    {
      data: 'wofbi_level',
      type: 'text',
      width: 80,
    },
    {
      data: 'assesment_score',
      type: 'text',
      width: 80,
    },
    {
      data: 'recommended_salary',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 80,
    },
    {
      data: 'fagc_lsb_recommendation',
      type: 'text',
      width: 80,
    },
    {
      data: 'zes_recommendation',
      type: 'text',
      width: 80,
    },
    {
      data: 'certification',
      type: 'text',
      width: 80,
    },
    {
      data: 'nysc',
      type: 'text',
      width: 80,
    },
    {
      data: 'ec_remark',
      type: 'text',
      width: 80,
    },
    {
      data: 'vpe_approval',
      type: 'text',
      width: 80,
    },
    {
      data: 'created_at',
      type: 'text',
      width: 200,
    },
    {
      data: 'action',
      type: 'html',
      width: 200,
    },
  ];
  let colHeaders = [
    'School ID',
    'Fullname',
    'DOB',
    'Gender',
    'Marital Status',
    'Location',
    'Qualification',
    'Post Applied For',
    'Years Of Experience',
    'New Birth',
    'Church Membership',
    'Service Unit',
    'WOFBI Level',
    'Assessment Score',
    'Recommended Salary',
    'FAGC LSB Recommendation',
    'ZES Recommendation',
    'Certification',
    'NYSC',
    'EC Remark',
    'VPE Approval',
    'Date',
    'Action'
  ];

  onMount(() => {
    STORAGE_TOKEN.subscribe((value) => (token = value))
    SET_ZONE.subscribe((value) => (zones = value))
    getSchool()
    getRecruitments()
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

  function getRecruitments() {
    const callback = (res) => {
      if (recruitments === null) {
        recruitments = res
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
    GET_SCHOOL_STAFF_RECRUITMENTS(slug.id, callback, onError)
  }
  $: if (recruitments) {
    error = false
  }
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

      <p class="text-header" style="margin-top:10px"> {school != null ? `${school.schoolname} - Recruitments`
        : ''} </p>
    </div>
    <div class="card-body">

      {#if recruitments}
      <HandsonTable  data={recruitments} {columns} {colHeaders}/>
      {/if}
    </div>
  </div>



</main>