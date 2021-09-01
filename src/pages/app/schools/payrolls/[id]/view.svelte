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
    GET_SCHOOL_STAFF_PAYROLLS,
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
  let payrolls = null
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
      data: 'state',
      type: 'text',
      width: 60,
    },
    {
      data: 'yoe',
      type: 'text',
      width: 60,
    },
    {
      data: 'gross',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'basic_allow',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'house_allow',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'trans_allow',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'meal',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'book',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'dress',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'other_allow',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'total_pay',
      type: 'numeric',
      width: 60,
    },
    {
      data: 'housing_deduction',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'pension_deduction',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'tax_paye_deduction',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'vass_deduction',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'hmo',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'others',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'total_deduction',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'net_pay',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'account_number',
      type: 'text',
      width: 60,
    },
    {
      data: 'bank',
      type: 'text',
      width: 60,
    },
    {
      data: 'pension_contribution',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'total_pension_contribution',
      type: 'numeric',
      numericFormat: {
        pattern: '₦0,00',
        culture: 'ng-NGN',
      },
      width: 60,
    },
    {
      data: 'pension_fund_administrator',
      type: 'text',
      width: 60,
    },
    {
      data: 'pension_fund_number',
      type: 'text',
      width: 60,
    },
    {
      data: 'created_at',
      type: 'text',
      width: 200,
    },
  ];
  let colHeaders = [
    'School ID',
    'Staff ID',
    'State',
    'Years Of Experience',
    'Gross Salary',
    'Basic Allowance',
    'House Allowance',
    'Transport Allowance',
    'Meal Allowance',
    'Book Allowance',
    'Dress Allowance',
    'Other Allowance',
    'Total Pay',
    'Housing Deduction',
    'Pension Deduction',
    'Tax Pay Deduction',
    'VASS Deduction',
    'HMO Deduction',
    'Others Deduction',
    'Total Deduction',
    'Net Pay',
    'Account Number',
    'Bank',
    'Pension Contribution',
    'Total Pension Contribution',
    'Pension Fund Administrator',
    'Pension Fund Number',
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
      if (payrolls === null) {
        payrolls = res
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
    GET_SCHOOL_STAFF_PAYROLLS(slug.id, callback, onError)
  }
  $: if (payrolls) {
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

      <p class="text-header" style="margin-top:10px"> {school != null ? `${school.schoolname} - Payrolls`
        : ''} </p>
    </div>
    <div class="card-body">

      {#if payrolls}
      <HandsonTable  data={payrolls} {columns} {colHeaders}/>
      {/if}
    </div>
  </div>



</main>