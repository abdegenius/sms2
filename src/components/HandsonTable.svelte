<script>
  import {
    onMount
  } from 'svelte'

  export let data = null
  export let columns
  export let colHeaders

  let gridElement

  let gridStatus = {
    isScriptLoaded: false,
    isStyleLoaded: false,
    isMounted: false,
    isInited: false,
  }

  onMount(() => {
    gridStatus.isMounted = true
    if (gridStatus.isScriptLoaded && gridStatus.isStyleLoaded) gridInit()
  })

  function scriptLoaded() {
    gridStatus.isScriptLoaded = true
    if (gridStatus.isMounted && gridStatus.isStyleLoaded) gridInit()
  }

  function styleLoaded() {
    gridStatus.isStyleLoaded = true
    if (gridStatus.isScriptLoaded && gridStatus.isMounted) gridInit()
  }

  function gridInit() {
    if (!gridStatus.isInited) {
      gridStatus.isInited = true
      data
      .push({}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, )
      var hot = new Handsontable(gridElement, {
        data: data,
        columns: columns,
        rowHeaders: true,
        colHeaders: colHeaders,
        width: 'auto',
        autoWrapRow: true,
        height: 600,
        // rowHeaders: true,
        // colHeaders: JSON.parse(data.subjects),
        columnSorting: true,
        sortIndicator: true,
        autoColumnSize: {
          samplingRatio: 23,
        },
        comments: true,
        fixedColumnsLeft: 3,
        dropdownMenu: ['filter_by_condition', 'filter_action_bar'],
        filters: true,
      })
    }

    var buttonExport = document.getElementById('export-file')
    var exportPlugin1 = hot.getPlugin('exportFile')

    buttonExport.addEventListener('click', function () {
      exportPlugin1.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'data_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true,
      })
    })
  }
</script>

<svelte:head>
  <script src="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.js" on:load={scriptLoaded}>

  </script>
  <link href="https://cdn.jsdelivr.net/npm/handsontable/dist/handsontable.full.min.css" rel="stylesheet"
    on:load={styleLoaded} />
</svelte:head>
<div bind:this={gridElement} />