<script>
  //import { FetchData } from "@edwinspire/fetch/FetchData.js";
  //import Table from "../../Table/Table";
  import EndpointForm from "./EndpointForm";
  import MethodForm from "./MethodForm";
  import { ColumnTypes, Table } from "@edwinspire/svelte-components/src";
  import MethodsColumn from "../Table/Cell/CellMethods.svelte";
  //import MethodsColumn from "../../pgAPI/Table/Cell/CellMethods.svelte";

  /////////////////////////////////
  //// ENDPOINT ////
  /////////////////////////////////
  let ColumnsEndPoints = {
    idendpoint: { hidden: true },
    ts: { hidden: true },
    rowkey: { hidden: true },
    enabled: { decorator: { component: ColumnTypes.Boolean } },
    endpoint: { hidden: true },
    system: { hidden: true },
    version: { hidden: true },
    endpoint_version: { label: "endpoint" },
    note: { decorator: {component: ColumnTypes.TextLimit} },
    methods: { decorator: { component: MethodsColumn} },
    description: { decorator: {component: ColumnTypes.TextLimit} },
  };

  let showEnpointForm = false;
  let EndPointSelected = {};

  function HandleSelectEndpoint(ev) {
    EndPointSelected = ev.detail.data;
    paramsMethods.idendpoint = EndPointSelected.idendpoint;
    paramsMethods.endpoint = EndPointSelected.endpoint;
  }

  function HandleOnNewEndpoint(e) {
    EndPointSelected = {};
    EndPointSelected.idendpoint = -1;
    EndPointSelected.endpoint = "";
    EndPointSelected.enabled = true;
    EndPointSelected.note = "";
    showEnpointForm = true;
    console.log(EndPointSelected, showEnpointForm);
  }

  function HandleSelectEditEndpoint(ev) {
    //console.log(ev.detail);
    EndPointSelected = ev.detail.data;
    showEnpointForm = true;
  }

  /////////////////////////////////
  //// METHOD ////
  /////////////////////////////////
  let paramsMethods = { idendpoint: -1 };
  let MethodSelected = {};
  let showMethodForm = false;
</script>

<Table
  ShowNewButton="true"
  ShowEditButton="true"
  on:clickrow={HandleSelectEndpoint}
  on:editrow={HandleSelectEditEndpoint}
  on:newrow={HandleOnNewEndpoint}
  url="/pgapi_v2/endpoint"
  columns={ColumnsEndPoints}
>
  <span slot="title">
    <b>ENDPOINTS</b>
  </span>
</Table>

<EndpointForm bind:Show={showEnpointForm} bind:EndPoint={EndPointSelected} />
<MethodForm bind:Show={showMethodForm} bind:Method={MethodSelected} />

<style>
</style>
